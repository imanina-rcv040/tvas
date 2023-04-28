from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

history_list = [
    {"id": "1", "time": "2023-04-18T17:28:47.204951+08:00", "event": "Illegal U-turn", "plate_number": "VFL5566", "image_savename": "2023-04-18T172847.2049510800_VFL5566_illegal_uturn.jpg"},
    {"id": "2", "time": "2023-04-18T17:35:57.210939+08:00", "event": "Illegal Parking", "plate_number": "JHK16", "image_savename": "2023-04-18T173557.2109390800_JHK16_illegal_uturn.jpg"},
    {"id": "3", "time": "2023-04-18T17:37:17.531941+08:00", "event": "Speeding", "plate_number": "VJE4781", "image_savename": "2023-04-18T173717.5319410800_S59_illegal_uturn.jpg"},
    {"id": "4", "time": "2023-04-18T17:37:17.531941+08:00", "event": "Illegal U-turn", "plate_number": "VJE4781", "image_savename": "2023-04-18T173717.5319410800_S59_illegal_uturn.jpg"},
    {"id": "5", "time": "2023-04-18T17:37:17.531941+08:00", "event": "Illegal Parking", "plate_number": "VJE4781", "image_savename": "2023-04-18T173717.5319410800_S59_illegal_uturn.jpg"},
    {"id": "6", "time": "2023-04-18T17:37:17.531941+08:00", "event": "Speeding", "plate_number": "WKY6730", "image_savename": "2023-04-18T173717.5319410800_S59_illegal_uturn.jpg"}
]

@app.route("/history", methods=["GET"])
def get_history_list():
    return jsonify({"code": 200, "ctx": {"history": history_list}})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
