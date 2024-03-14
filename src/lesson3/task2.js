import EventEmitter from "./task1.js";

class WithTime extends EventEmitter {
  execute = async (asyncFunc, ...args) => {
    this.emit("start");
    const startTime = Date.now();
    try {
      const result = await asyncFunc(...args);
      const endTime = Date.now();
      this.emit("data", result);
      this.emit("end", endTime - startTime);
    } catch (error) {
      this.emit("error", error);
    }
  };
}

const fetchFromUrl = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const withTime = new WithTime();
withTime.on("start", () => console.log("About to execute"));
withTime.on("data", (data) => console.log("Data received:", data));
withTime.on("end", (time) => console.log(`Done with execute in ${time}ms`));

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");
