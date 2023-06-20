#!/bin/bash

URL="https://example.com/api/image2in7"
IMAGE_PATH="2in7.png"
PYTHON_SCRIPT="_2in7.py"

# Download the image
wget -O $IMAGE_PATH $URL

# Check if the download was successful
if [ $? -eq 0 ]; then
    # Run the Python script
    python3 $PYTHON_SCRIPT
else
    echo "Image download failed."
fi