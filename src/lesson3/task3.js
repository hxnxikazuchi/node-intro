import csv from "csvtojson";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const csvFilePath = path.join(__dirname, "./csv", "read.csv");
const txtFilePath = path.join(__dirname, "output.txt");

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

readStream
  .pipe(csv())
  .on("data", (jsonObj) => {
    const formattedStr = JSON.stringify(JSON.parse(jsonObj)) + "\n";
    writeStream.write(formattedStr);
  })
  .on("error", (error) => {
    console.error("Read stream error:", error);
  });

writeStream.on("error", (error) => {
  console.error("Write stream error:", error);
});

writeStream.on("ready", () => {
  console.log(`Conversion completed. Check ${txtFilePath} for the output.`);
});
