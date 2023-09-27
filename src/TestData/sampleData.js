export const sample_cards = {
  card1: {
    id: 0,
    CardNumber: "BT16-094",
    CardName: "Cheer Girl, Adalaide",
    Image:
      "https://static.wikia.nocookie.net/cardfight/images/9/93/BT16-094-C_%28Sample%29.png/",
    Nation: "Dark Zone",
    CardType: "unit",
    Grade: 0,
    Power: 5000,
    Shield: 10000,
    Trigger: "Heal",
    isSentinel: false,
    Effect: null,
    CardAdvantage: 0,
  },
  card2: {
    id: 1,
    CardNumber: "DSD01-001",
    CardName: "Chakrabarthi Divine Dragon, Nirvana",
    Image:
      "https://static.wikia.nocookie.net/cardfight/images/5/5d/D-SD01-001_%28Sample%29.png/",
    Nation: "Dragon Empire",
    CardType: "unit",
    Grade: 3,
    Power: 13000,
    Shield: 0,
    Trigger: null,
    isSentinel: false,
    Effect: `[ACT](VC)1/Turn:COST [Discard a card from your hand], choose a grade 0 card from your drop, and call it to (RC). \n[AUTO](VC):When this unit attacks, COST [Counter Blast (1)], and this unit and all of your units with the [overDress] ability get [Power]+10000 until end of turn.`,
    CardAdvantage: 0,
  },
  card3: {
    id: 2,
    CardNumber: "DSD01-008",
    CardName: "Escort Stealth Dragon, Hayashi Kaze",
    Image:
      "https://static.wikia.nocookie.net/cardfight/images/6/65/D-SD01-008_%28Sample%29.png/",
    Nation: "Dragon Empire",
    CardType: "unit",
    Grade: 1,
    Power: 7000,
    Shield: 0,
    Trigger: null,
    isSentinel: true,
    Effect:
      "[AUTO]:When this unit is put on (GC), COST [discard a card from your hand], choose one of your units, and it cannot be hit until end of that battle.",
    CardAdvantage: 0,
  },
  card4: {
    id: 3,
    CardNumber: "DSD01-011",
    CardName: "Blaze Maiden, Zonne",
    Image:
      "https://static.wikia.nocookie.net/cardfight/images/5/5b/D-SD01-011_%28Sample%29.png/",
    Nation: "Dragon Empire",
    CardType: "unit",
    Grade: 0,
    Power: 5000,
    Shield: 15000,
    Trigger: "Crit",
    isSentinel: false,
    Effect: null,
    CardAdvantage: 0,
  },
};

export const listOfDecks = {
  1: {
    name: "deck1",
    deckList: ["1", "1", "1", "1", "2", "3", "3"],
    rideDeckList: ["1"],
  },
};
