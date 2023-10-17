import { useState, useEffect } from "react";

export default function FilterButtons(prop) {
  const { properties, onSetProp } = prop;
  const [grade, setGrade] = useState(properties.grade);
  const [nation, setNation] = useState(properties.nation);

  useEffect(() => {
    onSetProp(grade, nation);
  }, [grade, nation, onSetProp]);

  const onClickGrade = (e) => {
    const selectedGrade = e.target.value;
    setGrade(selectedGrade);
  };

  const onClickNation = (e) => {
    const selectedNation = e.target.value;
    setNation(selectedNation);
  };

  return (
    <div className="grade-nation-filter">
      <div>Current selected grade: {grade}</div>
      <button onClick={onClickGrade} value={0} disabled={grade === "0"}>
        0
      </button>
      <button onClick={onClickGrade} value={1} disabled={grade === "1"}>
        1
      </button>
      <button onClick={onClickGrade} value={2} disabled={grade === "2"}>
        2
      </button>
      <button onClick={onClickGrade} value={3} disabled={grade === "3"}>
        3
      </button>
      <button onClick={onClickGrade} value={4} disabled={grade === "4"}>
        4+
      </button>
      <div>Current selected nation: {nation}</div>
      <button
        onClick={onClickNation}
        value={"Dragon Empire"}
        disabled={nation === "Dragon Empire"}
      >
        Dragon Empire
      </button>
      <button
        onClick={onClickNation}
        value={"Dark States"}
        disabled={nation === "Dark States"}
      >
        Dark States
      </button>
      <button
        onClick={onClickNation}
        value={"Keter Sanctuary"}
        disabled={nation === "Keter Sanctuary"}
      >
        Keter Sanctuary
      </button>
      <button
        onClick={onClickNation}
        value={"Stoicheia"}
        disabled={nation === "Stoicheia"}
      >
        Stoicheia
      </button>
      <button
        onClick={onClickNation}
        value={"Brandt Gate"}
        disabled={nation === "Brandt Gate"}
      >
        Brandt Gate
      </button>
      <button
        onClick={onClickNation}
        value={"Elemental"}
        disabled={nation === "Elemental"}
      >
        Elemental
      </button>
    </div>
  );
}
