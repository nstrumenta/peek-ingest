#!/bin/bash
gcloud auth activate-service-account --key-file=$1
gcloud config set project nstrumenta-dev
gcsfuse --implicit-dirs --key-file=$1 nstrumenta-dev.appspot.com data
