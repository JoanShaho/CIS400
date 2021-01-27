const generalResponses = [
  { value: 1, text: "Not interested at all" },
  { value: 2, text: "" },
  { value: 3, text: "" },
  { value: 4, text: "" },
  { value: 5, text: "Main goal" }
];

const grade = {
  question: "Getting a good grade",
  responses: [
    { value: 0, text: "N/A" },
    { value: 1, text: "Not interested at all" },
    { value: 2, text: "" },
    { value: 3, text: "" },
    { value: 4, text: "" },
    { value: 5, text: "Main goal" }
  ],
  picked: val => {
    console.log(val);
  }
};

const learningNewSkills = {
  question: "Learning new skills",
  responses : generalResponses,
  picked: val => {
    console.log(val);
  }
};

const impact = {
  question: "Making an impact",
  responses : generalResponses,
  picked: val => {
    console.log(val);
  }
};

const meetMorePeople = {
  question: "Meeting more people",
  responses : generalResponses,
  picked: val => {
    console.log(val);
  }
};

const quitenessLevel = {
  question: "What type of environment do you work the best in?",
  responses : [
    { value: 1, text: "Completely quiet" },
    { value: 2, text: "" },
    { value: 3, text: "" },
    { value: 4, text: "" },
    { value: 5, text: "Lots of music" }
  ],
  picked: val => {
    console.log(val);
  }
};

const expectedContribution = {
  question: "How much do you want to contribute on a project?",
  responses : [
    { value: 1, text: "10%" },
    { value: 2, text: "" },
    { value: 3, text: "" },
    { value: 4, text: "" },
    { value: 5, text: "100%" }
  ],
  picked: val => {
    console.log(val);
  }
};

const leader = {
  question: "How much do you want to be a leader in a project?",
  responses : [
    { value: 1, text: "Not at all" },
    { value: 2, text: "" },
    { value: 3, text: "" },
    { value: 4, text: "" },
    { value: 5, text: "Main leader" }
  ],
  picked: val => {
    console.log(val);
  }
};

const communication = {
  question: "How frequently do you want to communicate in a project?",
  responses : [
    { value: 1, text: "Once a week" },
    { value: 2, text: "" },
    { value: 3, text: "" },
    { value: 4, text: "" },
    { value: 5, text: "Every day" }
  ],
  picked: val => {
    console.log(val);
  }
};

const proactivity = {
  question: "How early do you want to start working on a project?",
  responses : [
    { value: 1, text: "A couple of days before the deadline" },
    { value: 2, text: "" },
    { value: 3, text: "" },
    { value: 4, text: "" },
    { value: 5, text: "A couple of weeks before the deadline" }
  ],
  picked: val => {
    console.log(val);
  }
};