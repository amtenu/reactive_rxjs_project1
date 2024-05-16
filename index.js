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
    const totalAge = value.reduce(
      (sum, studentData) => sum + studentData.age,
      0
    );
    return { totalAge, femaleHighScorersCount: value.length };
  }),
  map(({ totalAge, femaleHighScorersCount }) => {
    const averageAge = totalAge / femaleHighScorersCount;
    return Math.floor(averageAge);
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
