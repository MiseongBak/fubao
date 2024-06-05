import sys, os, glob
from keras.models import Sequential
from keras.layers import Convolution2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
# from keras.utils import np_utils
from keras import utils
from keras.models import load_model  # TensorFlow is required for Keras to work
from PIL import Image, ImageOps  # Install pillow instead of PIL
import numpy as np

def classify_species(image_path):

    root_dir = "./"

    image_size = 224
    # nb_classes = len(image_files)

    categories = ["red_sea_bream", # 참돔
              "sea_bass", # 농어
              "horse_mackerel", # 전갱이
              "mugil_cephalus", # 숭어
              "scomber_japonicus", # 고등어
              "flatfish", # 광어
              "korean_rockfish", # 우럭
              "black_sea_bream", # 감성돔
              "rock_bream", # 돌돔
              "greenling"] # 쥐노래미
    
    X = []
    files = []

    fname = image_path

    img = Image.open(fname)
    img = img.convert("RGB")
    img = img.resize((image_size, image_size))
    in_data = np.asarray(img)
    in_data = in_data.astype("float") / 256
    X.append(in_data)

    X = np.array(X)

    model = load_model('./fubao_fish_classification_model.h5', compile=False)

    class_names = open("labels.txt", "r", encoding='UTF8').readlines()

    # 예측 실행
    pre = model.predict(X)
    # i, p = enumerate(pre)

    y = pre.argmax()

    class_name = class_names[y]
    species_class_name = class_name[2:-1]

    print("입력:", fname)
    print("인덱스: ", y)
    print("예측:", "[", y,"]", species_class_name)


    return species_class_name, y
