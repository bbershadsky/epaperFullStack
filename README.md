# Full Stack Self Hosted ePaper Dashboard

Features:

* Grab the latest weather data from WeatherAPI
* Get the latest BTCUSD price
* Latest awesome quotes from Adafruit!

Explanation: https://dev.to/bopr/custom-e-paper-dashboard-eo9-temp-slug-8551984?preview=5052d08daa62358137f0c0cbedc8376558668546735d2536bc235a8cfa24f92e5e3b9ce8d917ae1f452abe5a3b22ddc17192d86b4a5dc83b06619af8

![2.7 inch ePaper display](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xedinpkevhw5xivjedkr.jpg)

Software Stack:

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Shell](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)


Parts Required:
* Waveshare 2.7in e-Paper hat or similar
* Raspberry pi Zero W or 3B/4

Hardware dependencies:
* https://github.com/waveshareteam/e-Paper
* Pillow for Python

Software dependencies:
* `@napi-rs/canvas` This fixes the vercel "serverless function is too large" error;
* `fs` and `os` to write to temporary filesystem
* `axios` for remote data fetching 3rd party APIs

Optional Parts: 
* 3D printed case https://www.thingiverse.com/thing:4169928/files
* BMS hat https://thepihut.com/products/lipo-battery-hat-for-raspberry-pi

## Putting it all together:

* Change your display resolution in `serverGenerate.js` if you are using a different display
* Check that all your file names match expected formats
* Make sure the display is working correctly with the demo script that matches your model version. The directory will be similar to this: `~/e-Paper/RaspberryPi_JetsonNano/python/examples`
* Deploy `serverGenerate.js` to your favourite cloud hosting provider like Vercel or Netlify (Or run on your own network)
* Test that the image you get back from your API is what you expect
* Copy over the python and bash scripts to the pi
* Setup a cron job to schedule the bash script or run it manually as you please!

```bash
chmod +x getImg.sh
./getImg.sh
```

Author: Boris Bershadsky

License: MIT
