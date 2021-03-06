import numpy as np 
import sys 
import json
from tensorflow import keras
from keras.preprocessing import image

# Loading Model from existing binary file
model = keras.models.load_model('./Model/model')
# model = keras.models.load_model('./model')

def process_classes_from_json(filepath):
    dog_classes_dict = {}

    with open(filepath, 'r') as file:
        json_str = file.read()
        dog_classes_dict = json.loads(json_str)

    dog_classes_list = [0] * len(dog_classes_dict)
    for i in dog_classes_dict:
        dog_classes_list[dog_classes_dict[i]] = i

    return dog_classes_list

def predict_image(image_path, dog_classes_list):
    # Loads image in PIL format
    # test_image = image.load_img('./backup/data/single_prediction/4.jpg', target_size = (64, 64))
    test_image = image.load_img(image_path, target_size = (64, 64))
    test_image = image.img_to_array(test_image) / 255.      
    test_image = np.expand_dims(test_image, axis = 0)        
    result = model.predict_proba(test_image)

    # print(result[0])

    maxIndex = -1
    maxProb = 0
    for i in range(len(result[0])):
        if result[0][i] > maxProb:
            maxIndex = i 
            maxProb = result[0][i]

    print(maxProb, dog_classes_list[maxIndex])


dogs_classes_list = process_classes_from_json('./Model/dog_classes.json')
# dogs_classes_list = process_classes_from_json('./dog_classes.json')

image_path = sys.argv[1]

if image_path != "":
    predict_image(image_path, dogs_classes_list)
else:
    print('[+] File not found.')