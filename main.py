from fastapi import FastAPI
from datetime import datetime
from ml import predict_drift

app = FastAPI()

@app.get("/live")
def live_data():
    sos=[{"name":"FV Maria","severity":"Critical","location":[120.9,14.7],
          "predicted":predict_drift([120.9,14.7])}]
    units=[{"id":"CG-01"},{"id":"CG-02"}]
    return {
        "time": datetime.utcnow().strftime("%H:%M:%S UTC"),
        "coverage": 42,
        "sos": sos,
        "units": units
    }