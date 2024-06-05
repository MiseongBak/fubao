# 어류 길이 모듈 관련
from card_detection import *
from fish_detection import *

# 어종 판별 모듈 관련
from keras.models import load_model  # TensorFlow is required for Keras to work
from PIL import Image, ImageOps  # Install pillow instead of PIL
import numpy as np
from fish_species_classification import *

# 이미지 크롭 관련
import os
from PIL import Image
import glob


 # <어류 길이 측정 모듈>

# 1. 어류 길이 측정부
MODEL_PATH = 'fish_ssd_fpn_graph/frozen_inference_graph.pb'
# MODEL_PATH = 'fish_inception_v2_graph/frozen_inference_graph.pb'

object_detector = Object_Detector(MODEL_PATH)

# -----------------------------------

fish_name = "horse_mackerel"

path = "./origin_fish_imgs/" + fish_name + "/"
# path = "C:\crop_crawling_image\origin_fish_imgs\sea_bass"

           #"/home/image_dir/"


files = glob.glob(path + '/*')

make_path = "./cropped_imgs/cropped_" + fish_name #원본 폴더에 덮어쓰기 방지로 만들어 준다.
# make_path = "C:\crop_crawling_image\cropped_imgs\cropped_sea_bass"

                        #"/home/new_dir" 

if not os.path.isdir(make_path):
    os.mkdir(make_path)
    
save_path = "./cropped_imgs/cropped_" + fish_name + "/cropped_" + fish_name + "_"

                        #"/home/new_dir/"

##이미지 크롭 시작
# def img_crop(i):
for idx, file in enumerate(files):
    fname, ext = os.path.splitext(file)
    if ext in ['.jpg', '.png', '.gif']:#뒷 이미지 파일 명
        if os.path.getsize(file) != 0:
            im = Image.open(file)
            # print(files)
            # print(f)
            # print(file)
            width, height = im.size

            box_top_left = (0, 0)
            box_bottom_right = (0, 0)

            # 어류 객체 탐지 및 박스 좌표 반환
            img = cv2.imread(file)
            if img is None:
                ("opencv file empty error")
            else:
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
                box_top_left, box_bottom_right = object_detector.detect_fish_length(img, score_thr=0.2)

                # height, width, channel = im.shape
                # matrix = cv2.getRotationMatrix2D((width / 2, height / 2), 90, 1)
                # dst = cv2.warpAffine(im, matrix, (width, height))
                if box_top_left == (0, 0) and box_bottom_right == (0, 0):
                    print("No fish detected : " + str(idx) + " 번")
                else:
                    crop_image = im.crop((box_top_left[0],box_top_left[1],box_bottom_right[0],box_bottom_right[1]))
                    # crop_image = im.crop((100,50,240,170))
                    crop_image.convert("RGB").save(save_path + str(idx) + '.png')
                    # crop_image.save(save_path + str(idx) + '.png')
        else:
            print("file empty error")

#                               저장폴더
