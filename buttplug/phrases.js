module.exports = {
  phrases: [
    {
      name: "Biting",
      regex: /userdanger'>(.*bites you!?)/gi,
      type: "constant",
      intensity: 0.8,
      duration: 300,
    },
    {
      name: "Punching",
      regex:
        /('userdanger'>(?:.*?punch(es)?.*you)|(?:you.*punched by)|(?:punch strikes))/gi,
      type: "linearDropoff",
      intensity: 0.8,
      duration: 400,
    },
    {
      name: "Kicking",
      regex: /(userdanger'>.*(kicked by|kicks you))/gi,
      type: "linearDropoff",
      intensity: 1.0,
      duration: 200,
    },
    {
      name: "Stabbing",
      regex: /(userdanger'>(?:.*you.*in the.*with the))/gi,
      type: "linearDropoff",
      intensity: 0.9,
      duration: 700,
    },
    {
      name: "Tiny prick",
      regex: /('warning'>(?:.*?a tiny prick))/gi,
      type: "constant",
      intensity: 0.1,
      duration: 100,
    },
  ],
};
