// Starmernomics Game Events
// You can add more events to this list!

const events = [
  {
    id: 1,
    type: "political",
    title: "Unexpected Election Announcement",
    description:
      "The Prime Minister calls a surprise general election. Parties scramble to adjust strategies and voters are uncertain.",
    effects: {
      popularity: +5,
      treasury: -10,
      publicOpinion: -5
    }
  },
  {
    id: 2,
    type: "economic",
    title: "Global Market Crash",
    description:
      "A sudden global downturn hits stock markets, impacting national finances and employment rates.",
    effects: {
      treasury: -20,
      jobs: -15,
      publicOpinion: -10
    }
  },
  {
    id: 3,
    type: "random",
    title: "Royal Baby Born",
    description:
      "A new royal baby is born, lifting national spirits and distracting from political woes.",
    effects: {
      popularity: +10,
      publicOpinion: +7
    }
  }
];

module.exports = events;
