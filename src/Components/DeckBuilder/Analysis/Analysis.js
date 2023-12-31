import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { url_cards } from "../DeckBuilder";
import RideDeck from "./RideDeck";
import MainDeck from "./MainDeck";
import Triggers from "./Triggers";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import SampleHand from "./SampleHand";

export const renderImage = (id, datas) => {
  for (const card in datas) {
    if (datas[card].id === id) {
      return datas[card].image_link;
    }
  }
};
export const renderName = (id, datas) => {
  for (const card in datas) {
    if (datas[card].id === id) {
      return datas[card].card_name;
    }
  }
};

const URL = process.env.REACT_APP_BACKEND_URL;
const url_deck = `${URL}/deck/byPlayer`;
const url_player = `${URL}/player`;

export default function Analysis() {
  const [deck, setDeck] = useState();
  const [rideDeck, setRideDeck] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);
  const [originalCardpool, setOriginalCardpool] = useState(null);
  const [player, setPlayer] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [downloads, setDownloads] = useState(null);
  const [isHand, setIsHand]= useState(false);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("deck");

  const isTrigger = (cardId, data) => {
    for (const card in data) {
      if (data[card].id === cardId && data[card].trigger) {
        return data[card].trigger;
      }
    }
    return false;
  };
  const setCard = (cardId, data) => {
    for (const card in data) {
      if (data[card].id === cardId) {
        return [data[card].is_sentinel, data[card].card_advantage];
      }
    }
  };

  const exportImage = async () => {
  try {
    const response = await fetch(`${URL}/deck/getImage/${deck.id}`, {
      method: "GET",
    });

    if (response.ok) {
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an image element and set its source to the URL
      const imgElement = document.createElement("img");
      imgElement.src = url;

      // Wait for the image to load
      imgElement.onload = () => {
        // Append the image to the body
        //document.body.appendChild(imgElement);

        // Use setTimeout to add a delay before initiating the download
        setTimeout(() => {
          const a = document.createElement("a");
          a.href = url;
          a.download = "deck-image.png";
          a.style.display = "none";
          //document.body.appendChild(a);
          a.click();

          // Clean up the URL object
          window.URL.revokeObjectURL(url);
        }, 2000); // Adjust the delay time (in milliseconds) as needed
      };
    } else {
      alert("Error generating deck image");
    }
  } catch (error) {
    alert("Error generating deck image");
    console.error("Error generating deck image", error.message);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_cards, {
          method: "GET",
        });

        const data = await response.json();
        setOriginalCardpool(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    const fetchData2 = async () => {
      //const requestData={deck_name:name};
      try {
        const response = await fetch(`${url_deck}/${player.id}`, {
          method: "GET",
        });

        const data = await response.json();
        for (const dl in data) {
          if (data[dl].deck_name === name) {
            setDeck(data[dl]);
            break;
          }
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(url_player, {
          method: "GET",
        });

        const data = await response.json();
        for (const acc in data) {
          if (user.nickname === data[acc].player_name) {
            setPlayer(data[acc]);
            break;
          }
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (!player) {
      fetchPlayerData();
    }
    if (!deck && player) {
      fetchData2();
    }

    if (originalCardpool === null) {
      fetchData();
    }
    if (originalCardpool && deck) {
      setRideDeck(deck.ride_deck);
      const triggerList = [];
      const deckList = [];
      for (const tid in deck.triggers) {
        const trigId = deck.triggers[tid];

        triggerList.push({
          id: trigId,
          type: isTrigger(trigId, originalCardpool),
        });
      }
      for (const mid in deck.main_deck) {
        const cardId = deck.main_deck[mid];
        deckList.push({
          id: cardId,
          isSentinel: setCard(cardId, originalCardpool)[0],
          CA: setCard(cardId, originalCardpool)[1],
        });
      }

      setTriggers(triggerList);
      setMainDeck(deckList);
    }
    setDownloads(null);
  }, [name, deck, rideDeck, originalCardpool, user, player]);

  const deleteDeck = async () => {
    const confirmed = window.confirm(
      "Deletion is irreversible! \n Are you sure you want to delete this deck?"
    );

    if (confirmed) {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAccessToken(token);

          // Now that you have the accessToken, proceed with the delete operation
          const response = await fetch(`${URL}/deck/${deck.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            // Handle successful response if needed
            alert("Deck deleted!");
          } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
            alert(`Failed to delete deck. Error: ${errorData.message}`);
          }

          // Navigate after successful deletion
          navigate(`/`);
        } catch (error) {
          console.error("Error: ", error.message);
        }
      }
    }
  };
  const openModal = () => {
    setIsHand(true);
  };
  const closeModal = () => {
    setIsHand(false);
  };

  return (
    <div>
      {deck && (
        <div>
          <h1>Deck: {deck ? `${deck.deck_name}` : null}</h1>
          <h3>Ride Deck:</h3>
          <RideDeck rideDeck={rideDeck} cardpool={originalCardpool} />
          <h3>Triggers:</h3>
          <Triggers triggers={triggers} cardpool={originalCardpool} />
          <h3>Main Deck:</h3>
          <MainDeck mainDeck={mainDeck} cardpool={originalCardpool} />

          <br />
          <Button variant="contained" onClick={exportImage}>
            Export image
          </Button>
          {downloads && (
            <a href={downloads} download="combined_images.png">
              Click here to download the combined image
            </a>
          )}
          
          <Button variant="contained" onClick={openModal}>Draw Opening Hand</Button> 
           <SampleHand isOpen={isHand} onClose={closeModal} trigger={triggers} main={mainDeck} />
          <Button variant="outlined" endIcon={<SendIcon />}>
            {" "}
            <Link to="/"> Back to homepage</Link>
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={deleteDeck}
          >
            Delete Deck
          </Button>
          
        </div>
      )}
    </div>
  );
}
