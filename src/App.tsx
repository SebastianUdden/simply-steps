import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import EditSteps from "./components/EditSteps";
import Steps from "./components/Steps";
import { uuidv4 } from "./utils/uuid";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [stepsContainer, setStepsContainer] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const createNewContainer = (id: string, stepId: string) => {
    return {
      id,
      steps: [
        {
          id: stepId,
          description: "Step 1",
          bgColor: "#2288bb",
          delay: 200,
        },
      ],
    };
  };
  const onStepsChange = (stepsObject: any) => {
    setStepsContainer(
      stepsContainer.map((s: any) => {
        if (s.id === stepsObject.id) {
          return stepsObject;
        }
        return s;
      })
    );
  };
  const onDeleteStepsObject = (id: string) => {
    setSelectedIndex(0);
    setStepsContainer(stepsContainer.filter((s: any) => s.id !== id));
  };

  useEffect(() => {
    const storedStepsContainer = JSON.parse(
      localStorage.getItem("stepsContainer") || "[]"
    );
    if (storedStepsContainer.length === 0) {
      storedStepsContainer.push({
        ...createNewContainer(uuidv4(), uuidv4()),
        name: "Steps",
      });
    }
    setStepsContainer(storedStepsContainer);
  }, []);

  useEffect(() => {
    localStorage.setItem("stepsContainer", JSON.stringify(stepsContainer));
  }, [stepsContainer]);

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
            onClick={() => {
              setStepsContainer([
                ...stepsContainer,
                {
                  ...createNewContainer(uuidv4(), uuidv4()),
                  name: `Steps ${stepsContainer.length + 1}`,
                },
              ]);
              setSelectedIndex(stepsContainer.length);
            }}
          >
            +
          </Add>
          <EditSteps
            stepsObject={stepsContainer[selectedIndex]}
            onStepsChange={onStepsChange}
            selectedIndex={selectedIndex}
            stepsContainerLength={stepsContainer.length}
            onIndexChange={(index: number) => setSelectedIndex(index)}
            onDeleteStepsObject={onDeleteStepsObject}
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
