export default function SaveDeck(prop){
    const {rideDeck,triggers,mainDeck,playerID}= prop;
    const saveDeck = () => {
        const deckList2 = [];
        const rideDeckList = [
          rideDeck.g0,
          rideDeck.g1,
          rideDeck.g2,
          rideDeck.g3,
        ];
        const triggersList = [];
        for (const type in triggers) {
          for (let i = 0; i < triggers[type].length; i++) {
            triggersList.push(triggers[type][i]);
          }
        }
        for (const id in mainDeck) {
          for (let i = 0; i < mainDeck[id]; i++) {
            deckList2.push(id);
          }
        }
        const requestData = {
          player_id: playerID,
          main_deck: deckList2,
          ride_deck: rideDeckList,
          triggers: triggersList,
        };
        console.log(requestData);
      };
    return(<div><button onClick={saveDeck}>Save Deck</button></div>)
}