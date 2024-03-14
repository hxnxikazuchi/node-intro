export default class EventEmitter {
  #listeners = {};
  #createEvent = (eventName, fn, isOnce) => {
    if (this.#listeners[eventName]) {
      this.#listeners[eventName].funcList.push(fn);
    } else {
      this.#listeners = {
        ...this.#listeners,
        [eventName]: { funcList: [fn], once: isOnce },
      };
    }
  };

  on = (eventName, fn) => {
    this.#createEvent(eventName, fn, false);
  };

  addListener = (eventName, fn) => {
    this.#createEvent(eventName, fn, false);
  };

  removeListener = (eventName, fn) => {
    if (!this.#listeners[eventName]) {
      return;
    }

    const funcIndex = this.#listeners[eventName].funcList.findIndex(
      (func) => fn === func
    );

    if (funcIndex !== -1) {
      this.#listeners[eventName].funcList.splice(funcIndex, 1);
    }
  };

  off = (eventName, fn) => {
    this.removeListener(eventName, fn);
  };

  emit = (eventName, ...args) => {
    if (!this.#listeners[eventName]) {
      return;
    }

    this.#listeners[eventName].funcList.forEach((func) => {
      func.apply(null, args);
    });

    if (this.#listeners[eventName].once) {
      delete this.#listeners[eventName];
    }
  };

  once = (eventName, fn) => {
    this.#createEvent(eventName, fn, true);
  };

  listenerCount = (eventName) => {
    if (!this.#listeners[eventName]) {
      return;
    }

    return this.#listeners[eventName].funcList.length;
  };

  rawListeners = (eventName) => {
    if (!this.#listeners[eventName]) {
      return;
    }

    return this.#listeners[eventName].funcList;
  };
}

const myEmitter = new EventEmitter();

function c1() {
  console.log("an event occurred!");
}

function c2() {
  console.log("yet another event occurred!");
}

// PLEASE UNCOMMENT THESE WHEN YOU START CHECKING. I COMMENT THEM TO NOT BOTHER WITH IT IN NEXT TASKS

// myEmitter.on("eventOne", c1); // Register for eventOne
// myEmitter.on("eventOne", c2); // Register for eventOne

// // Register eventOnce for one time execution
// myEmitter.once("eventOnce", () => console.log("eventOnce once fired"));
// myEmitter.once("init", () => console.log("init once fired"));

// // Register for 'status' event with parameters
// myEmitter.on("status", (code, msg) => console.log(`Got ${code} and ${msg}`));

// myEmitter.emit("eventOne");

// // Emit 'eventOnce' -> After this the eventOnce will be
// // removed/unregistered automatically
// myEmitter.emit("eventOnce");

// myEmitter.emit("eventOne");
// myEmitter.emit("init");
// myEmitter.emit("init"); // Will not be fired
// myEmitter.emit("eventOne");
// myEmitter.emit("status", 200, "ok");

// // Get listener's count
// console.log(myEmitter.listenerCount("eventOne"));

// // Get array of rawListeners//
// // Event registered with 'once()' will not be available here after the
// // emit has been called
// console.log(myEmitter.rawListeners("eventOne"));

// // Get listener's count after remove one or all listeners of 'eventOne'
// myEmitter.off("eventOne", c1);
// console.log(myEmitter.listenerCount("eventOne"));
// myEmitter.off("eventOne", c2);
// console.log(myEmitter.listenerCount("eventOne"));
