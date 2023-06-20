import { createCanvas, loadImage } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import os from "os";
const tmpdir = os.tmpdir();
import axios from "axios";

export default async (req, res) => {
  const { text } = req.body;
  const width = 264; // specify the width
  const height = 176; // specify the height

  // Create canvas and context
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Add white background for the text
  // const textWidth = context.measureText(text).width;
  const textHeight = parseInt(context.font, 10); // extract font size from font string
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height); //BG

  // Fetch weather data
  const weatherResponse = await axios.get(
    "http://api.weatherapi.com/v1/forecast.json",
    {
      params: {
        key: process.env.WEATHERAPI_KEY,
        q: "Toronto",
      },
    }
  );

  const weatherData = weatherResponse.data;

  // Get weather icon URL
  const iconUrl = "https:" + weatherData.current.condition.icon;

  // Load icon image
  const iconImage = await loadImage(iconUrl);

  // Draw weather icon onto canvas
  context.drawImage(iconImage, width / 2 - 50, 60, 100, 100); // Change position and size as needed

  // const dt = new Date().toLocaleString();
  var dateWithoutSecond = new Date();
  dateWithoutSecond.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Add your text here
  context.fillStyle = "black";
  context.font = "22px Arial";
  context.fillText(dateWithoutSecond, 0, 18);
  context.fillText(
    "DAY " +
      weatherData.forecast.forecastday[0].day.maxtemp_c +
      "→" +
      weatherData.forecast.forecastday[0].day.mintemp_c +
      "°C " +
      weatherData.forecast.forecastday[0].day.avghumidity +
      "%",
    0,
    54 + textHeight
  );

  // Fetch weather data
  const btcresponse = await axios.get(
    "http://api.coindesk.com/v1/bpi/currentprice/USD.json",
    {
    }
  );
  const btcprice = btcresponse.data.bpi.USD.rate;
  context.fillText("₿" + btcprice, 0, 75 + textHeight);

  const quote = await axios.get("https://www.adafruit.com/api/quotes.php", {
  });
  const quoteData = quote.data;
  // console.log(quoteData);
  const maxWidth = width - 4;
  const lineHeight = 14;

  // Define your text parameters
  context.font = "14px Arial"; // change as necessary
  // context.textBaseline = "middle";
  context.textAlign = "center";
  // Calculate the position
  const posX = canvas.width / 2;
  // const posY = canvas.height / 2;
  const posY = 110;
  wrapText(
    context,
    quoteData[0].text + " - " + quoteData[0].author,
    posX,
    posY,
    maxWidth,
    lineHeight
  );

  const leftX = 0; // Starting position for left column
  const rightX = canvas.width; // Starting position for right column
  const y = 40; // Same starting height for both columns

  context.font = "20px Arial"; // change as necessary

  // Draw left column text
  context.textAlign = "left";
  const leftY = wrapText(
    context,
    "NOW " +
      weatherData.current.temp_c +
      "°C / " +
      weatherData.current.temp_f +
      "°F ",
    leftX,
    y,
    maxWidth,
    lineHeight
  );

  // Draw right column text
  context.textAlign = "right";
  const rightY = wrapText(
    context,
    weatherData.current.humidity + "%",
    rightX,
    y,
    maxWidth,
    lineHeight
  );

  const buffer = canvas.toBuffer("image/png");

  const tempFilePath = path.join(tmpdir, "2in7.png");
  fs.writeFile(tempFilePath, buffer, (err) => {
    if (err) throw err;
    console.log("The image has been saved!");
  });

  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
};

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}
