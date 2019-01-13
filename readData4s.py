import json, librosa
import numpy as np
from scipy.io import wavfile
def getData():
	with open('nsynth-valid/examples.json') as file:
	    data = json.load(file)
	rate = 16000
	xVal, yVal = [], []
	count = 0
	for k in data.keys():
	  count += 1
	  if count > 2000:
	  	break
	  y = wavfile.read('nsynth-valid/'+k+'.wav')[1]
	  S_full, phase = librosa.magphase(librosa.stft(y.astype(float)))
	  xVal.append(librosa.amplitude_to_db(S_full, ref=np.max))
	  yVal.append(data[k]['pitch'])
	print('val count:', count)
	print('val shape:', len(xVal[0]), len(xVal))
	with open('nsynth-test/examples.json') as file:
	    data = json.load(file)
	xTest, yTest = [], []
	count = 0
	for k in data.keys():
	  count += 1
	  if count > 200:
	  	break
	  y = wavfile.read('nsynth-test/'+k+'.wav')[1]
	  S_full, phase = librosa.magphase(librosa.stft(y.astype(float)))
	  xTest.append(librosa.amplitude_to_db(S_full, ref=np.max))
	  yTest.append(data[k]['pitch'])
	print('test count:', count)
	print('test shape:', len(xTest[0]), len(xTest))
	return np.array(xVal), np.array(yVal), np.array(xTest), np.array(yTest)










