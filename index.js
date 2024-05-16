const { Observable } = require("rxjs");
const studentData = require("./studentData");
const { map } = require("rxjs/operators");

const observable = new Observable((subscriber) => {
  subscriber.next(studentData);
}).pipe(
  map((value) => {
    return value.data;
  }),
  map((value) => {
    return value.filter(
      (studentData) => studentData.CGPA >= 3.5 && studentData.gender == "Female"
    );
  }),
  map((value) => {
    console.log("3rd average age of the female high scoreres", value);
    return value.reduce((sum, studentData) => sum + studentData.age, 0);
  }),
  map((value) => {
    return value;
  })
);

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
