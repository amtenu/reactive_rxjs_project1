const { Observable } = require("rxjs");
const studentData = require ("./studentData")

const observable = new Observable((subscriber) => {
  subscriber.next(10);
  subscriber.next(11);
  subscriber.next(12);
  setTimeout(() => {
    subscriber.next(13);
  }, 2000);
});

const observer = {
  next: (value) => {
    console.log(`Observer got a value of ${value}`);
  },
  error: (error) => {
    console.log("Observer got an error of " + error);
  },
  complete: () => {
    console.log("Observer got complete notificatioin");
  },
};

observable.subscribe(observer);
