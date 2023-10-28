import { useState } from "react";
import { Button } from "@mui/material";
import imgDE from "../Images/Icon_DEOD.webp";
import imgDS from "../Images/Icon_DS.webp";
import imgKS from "../Images/Icon_KS.webp";
import imgStoi from "../Images/Icon_Stoic.webp";
import imgBG from "../Images/Icon_BG.webp";

export default function FilterButtons(prop) {
  const { properties, onSetProp } = prop;
  const [grade, setGrade] = useState(properties.grade);
  const [nation, setNation] = useState(properties.nation);

  const onClickGrade = (e) => {
    const selectedGrade = e.target.value;
    setGrade(selectedGrade);
    onSetProp(selectedGrade, nation);
  };

  const onClickNation = (e) => {
    let selectedNation=null
    if (e.target.value) {
      selectedNation = e.target.value;
    } else {
      selectedNation = e.target.alt;
    }
    setNation(selectedNation);
    onSetProp(grade, selectedNation);
  };

  return (
    <div className="grade-nation-filter">
      <div>Current selected grade: {grade}</div>
      <Button onClick={onClickGrade} value={0} disabled={grade === "0"}>
        0
      </Button>
      <Button onClick={onClickGrade} value={1} disabled={grade === "1"}>
        1
      </Button>
      <Button onClick={onClickGrade} value={2} disabled={grade === "2"}>
        2
      </Button>
      <Button onClick={onClickGrade} value={3} disabled={grade === "3"}>
        3
      </Button>
      <Button onClick={onClickGrade} value={4} disabled={grade === "4"}>
        4+
      </Button>
      <div>Current selected nation: {nation}</div>
      <Button
        onClick={onClickNation}
        value={"Dragon Empire"}
        disabled={nation === "Dragon Empire"}
      >
        <img src={imgDE} width="100px" height="50px" alt="Dragon Empire" />
      </Button>
      <Button
        onClick={onClickNation}
        value={"Dark States"}
        disabled={nation === "Dark States"}
      >
        <img src={imgDS} width="100px" height="50px" alt="Dark States" />
      </Button>
      <Button
        onClick={onClickNation}
        value={"Keter Sanctuary"}
        disabled={nation === "Keter Sanctuary"}
      >
        <img src={imgKS} width="100px" height="50px" alt="Keter Sanctuary" />
      </Button>
      <Button
        onClick={onClickNation}
        value={"Stoicheia"}
        disabled={nation === "Stoicheia"}
      >
        <img src={imgStoi} width="100px" height="50px" alt="Stoicheia" />
      </Button>
      <Button
        onClick={onClickNation}
        value={"Brandt Gate"}
        disabled={nation === "Brandt Gate"}
      >
        <img src={imgBG} width="100px" height="50px" alt="Brandt Gate" />
      </Button>
      <Button
        onClick={onClickNation}
        value={"Elemental"}
        disabled={nation === "Elemental"}
      >
        Elemental
      </Button>
    </div>
  );
}
