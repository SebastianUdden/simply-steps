import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import EditSteps from "./components/EditSteps";
import Steps from "./components/Steps";
import { uuidv4 } from "./utils/uuid";

const MOCK_STEPS = [
  {
    id: uuidv4(),
    name: "Morning routine",
    steps: [
      {
        id: uuidv4(),
        description: "Do mornin x",
        bgColor: "#000000",
        delay: 300,
      },
      { id: uuidv4(), description: "Do y", bgColor: "#ff9900", delay: 500 },
    ],
  },
  {
    id: uuidv4(),
    name: "Night routine",
    steps: [
      {
        id: uuidv4(),
        description: "Do night z",
        bgColor: "#66aa00",
        delay: 200,
      },
      { id: uuidv4(), description: "Do y", bgColor: "#ff00ff", delay: 3400 },
    ],
  },
];

const newContainer = {
  id: uuidv4(),
  name: "Example",
  steps: [],
};

function App() {
  const [editMode, setEditMode] = useState(false);
  const [stepsContainer, setStepsContainer] = useState<any>(
    JSON.parse(localStorage.getItem("steps") || "[]")
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onStepsChange = (stepsObject: any) => {
    setStepsContainer(
      stepsContainer.map((s: any) => {
        if (s.id === stepsObject.id) {
          return stepsObject;
        }
        return s;
      })
    );
    localStorage.setItem("steps", JSON.stringify(stepsContainer));
  };

  return (
    <div className="App">
      {
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Steps" : "Menu"}
        </Button>
      }
      {editMode && (
        <>
          <Add
            onClick={() => setStepsContainer([...stepsContainer, newContainer])}
          >
            +
          </Add>
          <EditSteps
            stepsObject={stepsContainer[selectedIndex]}
            onStepsChange={onStepsChange}
            selectedIndex={selectedIndex}
            stepsContainerLength={stepsContainer.length}
            onIndexChange={(index: number) => setSelectedIndex(index)}
          />
        </>
      )}
      {!editMode && <Steps steps={stepsContainer[selectedIndex]} />}
    </div>
  );
}

export const Button = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: black;
  color: white;
  border-radius: 6px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 1;
`;
const Add = styled(Button)`
  left: 5px;
  right: auto;
`;

export default App;
