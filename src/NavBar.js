import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { usePlayerContext } from "./PlayerContext";

const URL = process.env.REACT_APP_BACKEND_URL;
const url_player = `${URL}/player`;

export default function NavBar() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [userList, setUserList] = useState(null);
  const { player, setPlayer } = usePlayerContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_player, {
          method: "GET",
        });

        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (!userList) {
      fetchData();
    }
    const checkNew = () => {
      for (const acc in userList) {
        
        if (user.nickname === userList[acc].player_name) {
          return false;
        }
      }
      return true;
    };
    const createPlayer = async () => {
      const requestData = {
        player_name: user.nickname,
        player_email: user.name,
      };

      try {
        const response = await fetch(url_player, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if needed
            // "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        });
        const newPlayer = await response.json();
        setPlayer(newPlayer)
        
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    if(isAuthenticated && !player){
      const isNew = checkNew();
        if (isNew){
            createPlayer();
            
        } else {
          
            for (const acc in userList) {
                if (user.nickname === userList[acc].player_name) {
                  setPlayer(userList[acc])
                  break;
                }
              }
        }
    }
  },[userList, isAuthenticated, player,setPlayer, user]);

  return (
    <AppBar position="static" style={{ backgroundColor: "#e1f4fa" }}>
       
      <Toolbar style={{ justifyContent: "flex-start" }}>
        <Typography variant="body1" style={{ color: "#063846" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            HOME
          </Link>
        </Typography>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Typography variant="body1" style={{ color: "#063846" }}>
          <Link to="/about" style={{ textDecoration: "none" }}>
            ABOUT
          </Link>
        </Typography>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Typography variant="body1" style={{ color: "#063846" }}>
          <Link to="/about" style={{ textDecoration: "none" }}>
            FAQ
          </Link>
        </Typography>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div style={{ flexGrow: 1 }}></div>
        {isAuthenticated ? (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            <Typography variant="body1" style={{ color: "#063846" }}>
              LOG OUT
            </Typography>
          </button>
        ) : (
          <button onClick={() => loginWithRedirect()}>
            {" "}
            <Typography variant="body1" style={{ color: "#063846" }}>
              Log In{" "}
            </Typography>
          </button>
        )}
      </Toolbar>
    </AppBar>
  );
}
