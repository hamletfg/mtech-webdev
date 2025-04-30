const EventEmitter = required("events");

class Robot extends EventEmitter {
  construtor(name) {
    super();
    this.name = name;
    this.isActive = false;
  }
}

const robot = new Robot("herbert");
const
myRobot.once("activate", function () {
  this.activate = true;
  console.log("robot has been activated");
});
myRobot.on("speak", function (quote) {
  if (this.isActive) {
    console.log(`${this.name}: ${quote}`);
  }
});

myRobot.emit("speak", "I am a wobot");
myRobot.emit("activate");
myRobot.emit("speak", "some quote");
myRobot.emit("activate");
