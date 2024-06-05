# 플라스크 rest-api 생성
from flask import Flask, request
from flask_cors import CORS

# 어류 길이 모듈 관련
from card_detection import *
from fish_detection import *

# 입력 이미지 저장 관련
from werkzeug.utils import secure_filename

# 어종 판별 모듈 관련
import sys, os, glob
from keras.models import Sequential
from keras.layers import Convolution2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
# from keras.utils import np_utils
from keras import utils
from keras.models import load_model  # TensorFlow is required for Keras to work
from PIL import Image, ImageOps  # Install pillow instead of PIL
import numpy as np
from fish_species_classification import *

# db 저장 모듈 관련
from db_connection import *

import base64
import json

## 서버 띄우고 접속 허용
app = Flask(__name__)
# 보안관련
CORS(app)


# rest 요청 처리부
@app.route("/predict" , methods=["POST"])
def predict():
    if request.method == 'POST':
            
            uid = request.form['uid'] # 변경하기
            print(uid)
            obj = request.form['object'] # 입력 비교 물체
            # print(obj)
            f = request.files['file'] # 입력 이미지 파일
            # print(f)

            if obj == "cigarette":
                obj_len = 88.00
            elif obj == "credit_card":
                obj_len = 85.60

            f.save("./"+ secure_filename("image")+".jpg")

            image_path = "./"+ secure_filename("image")+".jpg"


            # <어류 길이 측정 모듈>

            # 1. 어류 길이 측정부
            MODEL_PATH = 'fish_ssd_fpn_graph/frozen_inference_graph.pb'
            # MODEL_PATH = 'fish_inception_v2_graph/frozen_inference_graph.pb'

            object_detector = Object_Detector(MODEL_PATH)

            ori_img = cv2.imread(image_path)
            ori_img = cv2.cvtColor(ori_img, cv2.COLOR_BGR2RGB)
                
            top_left, bottom_right = object_detector.detect_fish_length(ori_img, score_thr=0.2)

            # print(top_left)
            # print(bottom_right)
            
            if obj != "none":
                
                # 2. 카드 길이 측정부
                # ori_img = cv2.imread(image_path)
                ori_img2 = cv2.imread(image_path)

                height, width, channel = ori_img2.shape

                # card_area_image_path = "card_area_image.jpg"
                # start_y_point = int(bottom_right[1] - (bottom_right[1] - top_left[1]) * 0.3)
                # card_area_image = ori_img2[start_y_point:, :]

                # card_area_height, card_area_width, card_area_channel = card_area_image.shape
                # cv2.imwrite(card_area_image_path, card_area_image)
                # resize_img = cv2.resize(card_area_image, dsize=(640, 480), interpolation=cv2.INTER_AREA)
                resize_img = cv2.resize(ori_img2, dsize=(640, 480), interpolation=cv2.INTER_AREA)
                
                global checkpnt
                global new_contour
                global vertex
                checkpnt = 0
                vertex = np.zeros((4,2), dtype= "uint32")
                src = []  # 명함 영역 꼭지점의 좌표

                # cv2.imshow('original_img', resize_img)
                edged = edge_detection(resize_img)
                vertex = contours(edged, resize_img, src, checkpnt, vertex)

                # 어류와 카드의 가로, 세로 길이 중 가로 길이로 길이 설정
                if bottom_right[0] - top_left[0] > bottom_right[1] - top_left[1]:
                    fish_len = bottom_right[0] - top_left[0]
                else:
                    fish_len = bottom_right[1] - top_left[1]

                if int(vertex[2, 0] * width / 640) - int(vertex[0, 0] * width / 640) > int(vertex[1, 1] * height / 480) - int(vertex[0, 1] * height / 480):
                    card_len = int(vertex[2, 0] * width / 640) - int(vertex[0, 0] * width / 640)
                else:
                    card_len = int(vertex[1, 1] * height / 480) - int(vertex[0, 1] * height / 480)

                # 두 좌표 간의 비율 조절
                # card_len = card_len * 0.4

                # print(fish_len)
                # print(card_len)
                    
                if card_len != 0: # 카드 인식 성공 시
                    fish_act_len = (fish_len * obj_len) / card_len
                    card_image_path = "card_image.jpg"
                    card_image = ori_img2[int(vertex[0, 1] * height / 480):int(vertex[1, 1] * height / 480), int(vertex[0, 0] * width / 640):int(vertex[2, 0] * width / 640)]
                    # cv2.imshow('original_img', card_image)
                    cv2.imwrite(card_image_path, card_image)
                else:
                    fish_act_len = 0
                    print("카드 인식 실패")

                # print(vertex[0, 1] * int(height / 480))
                # print(vertex[1, 1] * int(height / 480))
                # print(vertex[0, 0] * int(width / 640))
                # print(vertex[2, 0] * int(width / 640))


            # 어종 분류 모듈
            ori_img3 = cv2.imread(image_path)

            fish_image_path = "fish_image.jpg"
            fish_image = ori_img3[top_left[1]:bottom_right[1], top_left[0]:bottom_right[0]]
            cv2.imwrite(fish_image_path, fish_image)

            class_name, class_idx = classify_species(fish_image_path)
            # print("종: " + class_name)


            # 결과값 json 전달

            # img_flag_result = False
            # with open(image_path, "rb") as image_file:
            #     image_binary = image_file.read()

            # encoded_string = base64.b64encode(image_binary)
            # decoded_string = encoded_string.decode('UTF-8')

            if obj != "none":
                message = {
                    "species": class_name, 
                    "length" : fish_act_len
                }
                db_processing(uid, class_idx, fish_act_len, image_path)

            else:
                message = {
                    "species": class_name
                }
                db_processing_no_obj(uid, class_idx)


            return message


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)  # debug=True causes Restarting with stat
