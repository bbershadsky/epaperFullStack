#!/usr/bin/python
# -*- coding:utf-8 -*-
import sys
import os
picdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'pic')
libdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

import logging
from waveshare_epd import epd2in7
import time
from PIL import Image, ImageOps, ImageDraw,ImageFont
import traceback

logging.basicConfig(level=logging.DEBUG)

try:
    epd = epd2in7.EPD()
    '''2Gray(Black and white) display'''
    logging.info("init and Clear")
    epd.init()
    epd.Clear(0xFF)

    Himage = Image.new('1', (epd.height, epd.width), 255)  # 255: clear the frame
    draw = ImageDraw.Draw(Himage)
    img = Image.open('2in7.png')
    img.save('2in7.bmp') # Display driver requires BMP
    Himage = Image.open('2in7.bmp')
    epd.display(epd.getbuffer(Himage))
    epd.sleep()


except IOError as e:
    logging.info(e)

except KeyboardInterrupt:
    logging.info("ctrl + c:")
    epd2in7.epdconfig.module_exit()
    exit()
