import { Link } from "react-router-dom";
import cardImg from "../Images/cardBack.png";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-description">
        <h2>About Cardfight!! Vanguard</h2>
        <img src={cardImg} alt="Vanguard cardback" width="400px" />
        <p>
          Cardfight!! Vanguard is a Trading Card Game (TCG) developed by
          Bushiroad in 2011. The game currently are available to players in many
          different languages including Japanese, English, Chinese, Korean and
          Thai. There are hundreds of thousands of active players worldwide. The
          franchise also have related products in other areas such as anime and
          manga series, as well as video games and novels.{" "}
        </p>
        <p>More information on Cardfight!! Vanguard:</p>
        <Button variant="contianed" endIcon={<SendIcon />}>
          <Link to="https://en.cf-vanguard.com/">Official Vanguard Page</Link>
        </Button>
        <Button variant="contianed" endIcon={<SendIcon />}>
          <Link to="https://cardfight.fandom.com/wiki/Cardfight!!_Vanguard_Wiki">
            Cardfight!! Vanguard Wiki
          </Link>
        </Button>
      </div>
      <div className="about-description"><h2>About Vanguard Builder</h2>
      <p>Vanguard Builder is a fan made application which vanguard players can use to 
        search for certain cards from specific sets or having specific effects. Players 
        may also use this to construct their very own vanguard decks.</p></div>
    </div>
  );
}