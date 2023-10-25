export function ArraytoList(array, db) {
    console.log("got here")
  const newTriggerList = {
    crit: [],
    draw: [],
    front: [],
    heal: [],
    over: [],
  };

  array.forEach((cardID) => {
    for (const card in db) {
      if (db[card].id === cardID) {
        switch (db[card].trigger) {
          case "Crit ":
            newTriggerList.crit.push(cardID);
            break;
          case "Draw ":
            newTriggerList.draw.push(cardID);
            break;
          case "Front ":
            newTriggerList.front.push(cardID);
            break;
          case "Heal ":
            newTriggerList.heal.push(cardID);
            break;
          case "Over":
            newTriggerList.over.push(cardID);
            break;
          default:
            break;
        }
      }
    }
  });
  return newTriggerList;
}

export function ListtoArray(list) {
  const cardArray = [];
  for (const type in list) {
    for (let i = 0; i < list[type].length; i++) {
      cardArray.push(list[type][i]);
    }
  }
  return cardArray;
}
