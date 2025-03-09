module.exports = {
  phrases: [
    // Biting
    {
      regex: /userdanger'>(.*bites you!?)/gi,
      type: "constant",
      intensity: 0.8,
      duration: 300,
    },
    // Punching
    {
      regex:
        /('userdanger'>(?:.*?punch(es)?.*you)|(?:you.*punched by)|(?:punch strikes))/gi,
      type: "linearDropoff",
      intensity: 0.8,
      duration: 400,
    },
    // Kicking
    {
      regex: /(userdanger'>.*(kicked by|kicks you))/gi,
      type: "linearDropoff",
      intensity: 1.0,
      duration: 200,
    },
    // Stabbing
    {
      regex: /(userdanger'>(?:.*you.*in the.*with the))/gi,
      type: "linearDropoff",
      intensity: 0.9,
      duration: 700,
    },
    // Tiny prick
    {
      regex: /('warning'>(?:.*?a tiny prick))/gi,
      type: "constant",
      intensity: 0.7,
      duration: 150,
    },
  ],
};
