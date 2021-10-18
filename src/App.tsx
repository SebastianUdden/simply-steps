import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { Step } from "./components/EditStep";
import EditSteps from "./components/EditSteps";
import Steps from "./components/Steps";

const arrayMove = (arr: any[], fromIndex: number, toIndex: number) => {
  const arrCopy = arr.slice();
  const element = arrCopy[fromIndex];
  arrCopy.splice(fromIndex, 1);
  arrCopy.splice(toIndex, 0, element);
  return arrCopy;
};

function App() {
  const [editMode, setEditMode] = useState(false);
  const [steps, setSteps] = useState(
    JSON.parse(localStorage.getItem("steps") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("steps", JSON.stringify(steps));
    if (steps.length === 0) setEditMode(true);
  }, [steps]);

  const handleDelete = (id: number) => {
    const newSteps = steps.filter((s: any) => s.id !== id);
    setSteps(newSteps);
  };

  const handleMoveUp = (id: number) => {
    const index = steps.findIndex((s: any) => s.id === id);
    if (index === 0 || index === -1) return;
    setSteps(arrayMove(steps, index, index - 1));
  };
  const handleMoveDown = (id: number) => {
    const index = steps.findIndex((s: any) => s.id === id);
    if (index === steps.length - 1 || index === -1) return;
    setSteps(arrayMove(steps, index, index + 1));
  };
  const onStepChange = (step: Step) => {
    setSteps(
      steps.map((s: Step) => {
        if (s.id !== step.id) return s;
        return step;
      })
    );
  };

  return (
    <div className="App">
      {steps.length !== 0 && (
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Steps" : "Edit"}
        </Button>
      )}
      {editMode && (
        <>
          <AddStep
            onClick={() =>
              setSteps([
                ...steps,
                {
                  id: steps.length + 1,
                  description: "",
                  bgColor: "#20acb6",
                  delay: 300,
                },
              ])
            }
          >
            Add step
          </AddStep>
          <EditSteps
            steps={steps}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDelete={handleDelete}
            onStepChange={onStepChange}
          />
        </>
      )}
      {!editMode && <Steps steps={steps} />}
    </div>
  );
}

const Button = styled.button`
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
const AddStep = styled(Button)`
  position: static;
  font-size: 20px;
  margin-top: 40px;
  width: calc(100% - 10px);
`;

export default App;
