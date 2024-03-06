import { exec } from "child_process";
import fs from "fs";
import os from "os";

const command =
  os.platform() === "win32"
    ? "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\""
    : "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";

function logToFile(data) {
  const timestamp = Date.now();
  const logData = `${timestamp}: ${data}\n`;
  fs.appendFile("activityMonitor.log", logData, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });
}

function displayProcessInfo() {
  exec(command, (err, stdout, stderr) => {
    if (err || stderr) {
      console.error("Error executing command:", err || stderr);
      return;
    }

    process.stdout.write(`\r${stdout.trim()}`);

    if (
      !displayProcessInfo.lastLogTime ||
      Date.now() - displayProcessInfo.lastLogTime >= 60000
    ) {
      logToFile(stdout.trim());
      displayProcessInfo.lastLogTime = Dante.now();
    }
  });
}

setInterval(displayProcessInfo, 100);
