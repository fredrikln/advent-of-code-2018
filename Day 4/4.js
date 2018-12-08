const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();

const input2 = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;

const getGuard = line => {
  const [_, after] = line.split("#");
  if (!after) return undefined;

  const [guard] = after.split(" ");

  return guard;
};

const getMinute = line => {
  const [_, after] = line.split(":");

  if (!after) return undefined;

  const [minute] = after.split("]");

  return parseInt(minute);
};

const getAction = line => {
  if (line.indexOf("falls asleep") !== -1) return "sleep";
  if (line.indexOf("wakes up") !== -1) return "wake";

  return undefined;
};

const sorted = input.split("\n").sort();

let currGuard = null;
let currSleep = null;
const count = sorted.reduce((acc, line) => {
  const guard = getGuard(line);
  const minute = getMinute(line);
  const action = getAction(line);

  if (guard) currGuard = guard;

  if (action === "sleep") {
    currSleep = minute;
  }
  if (action === "wake") {
    if (!acc[currGuard]) acc[currGuard] = { totalMinutes: 0, minutes: {} };

    acc[currGuard]["totalMinutes"] += minute - currSleep;

    for (var i = currSleep; i < minute; i++) {
      if (!acc[currGuard]["minutes"][i]) acc[currGuard]["minutes"][i] = 0;

      acc[currGuard]["minutes"][i]++;
    }
  }

  return acc;
}, {});

const keys = Object.keys(count);

// Problem 1
keys.sort((a, b) => (count[a].totalMinutes > count[b].totalMinutes ? -1 : 1));
console.log(keys[0], count[keys[0]]);

const guard = count[keys[0]];
const guardId = parseInt(keys[0]);

const sleepyMinute = parseInt(
  Object.keys(guard.minutes).sort((a, b) =>
    guard.minutes[a] > guard.minutes[b] ? -1 : 1
  )[0]
);

console.log("1", {
  id: guardId,
  minute: sleepyMinute,
  val: sleepyMinute * guardId
});

// Problem 2

let maxGuard = null;
let maxMinute = 0;
let maxValue = 0;
for (var i = 0; i < keys.length; i++) {
  const key = keys[i];
  const guard = count[key];

  for (var j = 0; j < 60; j++) {
    if (guard["minutes"][j]) {
      if (guard["minutes"][j] > maxValue) {
        maxMinute = j;
        maxValue = guard["minutes"][j];
        maxGuard = key;
      }
    }
  }
}

console.log("2", {
  id: parseInt(maxGuard),
  minute: maxMinute,
  val: maxGuard * maxMinute
});

// console.log(sorted)
