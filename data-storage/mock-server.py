import cv2
import numpy as np
from flask import Flask, request, redirect, url_for
from flask_cors import CORS
import os
import random


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


def generate_history_return(time, event, plate_number, image_savename):
    return {
        "time": time,
        "event": event,
        "plate_number": plate_number,
        "image_savename": image_savename,
    }


@app.route("/history", methods=["GET"])
def get_history_list():
    history1_return = generate_history_return(
        time="2023-04-18T17:28:47.204951+08:00",
        event="illegal_uturn",
        plate_number="VFL5566",
        image_savename="2023-04-18T172847.2049510800_VFL5566_illegal_uturn.jpg",
    )
    history2_return = generate_history_return(
        time="2023-04-18T17:35:57.210939+08:00",
        event="illegal_uturn",
        plate_number="JHK16",
        image_savename="2023-04-18T173557.2109390800_JHK16_illegal_uturn.jpg",
    )
    history3_return = generate_history_return(
        time="2023-04-18T17:37:17.531941+08:00",
        event="illegal_uturn",
        plate_number="VJE4781",
        image_savename="2023-04-18T173717.5319410800_S59_illegal_uturn.jpg",
    )
    history_list = []
    history_list.append(history1_return)
    history_list.append(history2_return)
    history_list.append(history3_return)
    return {
        "code": 200,
        "ctx": {"history": history_list},
    }


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
