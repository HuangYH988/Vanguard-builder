export function ArraytoList(array, db) {
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
const img = require("./Images/cardBack.png");
const img2 = require("./Images/yuyu_deck.jpg");
export const customStyles = {
  content: {
    width: "75vw",
    height: "75vh",
    paddingBottom: "0px",
    display: "block",
    position: "relative",
    backgroundColor: "rgba(142, 235, 204, 0.95)",
    border: "2px solid #072f49",
    borderRadius: "30px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    //color: "rgb(248, 200, 200)",
  },
  modalBackground: {
    backgroundImage: "url(" + img + ")",
    backgroundSize: "400px 250px",
    opacity: "0.2",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: "-1",
  },
  modalBackground2: {
    backgroundImage: "url(" + img2 + ")",
    backgroundSize: "250px 450px",
    opacity: "0.15",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    backgroundPosition: "20px 20px",
    
  },
};
