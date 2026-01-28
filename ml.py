import numpy as np
def predict_drift(location):
    lat, lon = location
    drift = np.random.uniform(-0.05,0.05,2)
    return [lat+drift[0], lon+drift[1]]