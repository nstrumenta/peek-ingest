#!/bin/bash
gcloud ml video detect-labels gs://nstrumenta-dev.appspot.com/projects/nst-t-peek/data/da3273d5-7fc9-443f-adef-a21f7b97df93/Sensor_Log_2023-04-11_11_56_33_gopro/sd.mp4 --output-uri=gs://nstrumenta-dev.appspot.com/projects/nst-t-peek/data/da3273d5-7fc9-443f-adef-a21f7b97df93/detections.json