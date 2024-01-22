import numpy as np
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense, Dropout
from ast import literal_eval

model_filename='saved_model3.h5'
loaded_model = load_model(model_filename)

def __load_and_predict_probabilities_single_sample(sample):

    # Reshape the single sample to match the expected input shape
    sample = np.asarray(sample)
    sample = sample.reshape(1, -1)

    probabilities = loaded_model.predict(sample)
    print("NV: "+str(probabilities[0][0] ))
    print("V: "+str( probabilities[0][1]) )
    probability_of_class_1 = probabilities[0][1]  # Probability of class 1 (positive class)
    return probability_of_class_1


def get_prediction(embedding):
    return __load_and_predict_probabilities_single_sample(embedding)