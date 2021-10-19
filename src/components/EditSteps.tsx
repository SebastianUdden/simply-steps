import { useEffect, useState } from "react";
import styled from "styled-components";
import { uuidv4 } from "../utils/uuid";
import EditStep, { Step } from "./EditStep";

const COLORS = [
  "#20acb6",
  "#b120b6",
  "#20b691",
  "#b66920",
  "#b62a20",
  "#20acb6",
  "#b6207d",
  "#205cb6",
  "#20b65f",
  "#b68e20",
];

const arrayMove = (arr: any[], fromIndex: number, toIndex: number) => {
  const arrCopy = arr.slice();
  const element = arrCopy[fromIndex];
  arrCopy.splice(fromIndex, 1);
  arrCopy.splice(toIndex, 0, element);
  return arrCopy;
};

const getSingleDigit = (number: number) => {
  if (number > 10 && number <= 20) return number - 10;
  if (number > 20 && number <= 30) return number - 20;
  return number;
};
interface Props {
  stepsObject: any;
  onStepsChange: Function;
  selectedIndex: number;
  stepsContainerLength: number;
  onIndexChange: Function;
  onDeleteStepsObject: Function;
}

const EditSteps = ({
  stepsObject,
  selectedIndex,
  stepsContainerLength,
  onIndexChange,
  onStepsChange,
  onDeleteStepsObject,
}: Props) => {
  const onAdd = (id: string) => {
    onStepsChange({
      ...stepsObject,
      steps: [
        ...stepsObject.steps,
        {
          id,
          description: `Step ${stepsObject.steps.length + 1}`,
          bgColor:
            COLORS[getSingleDigit(stepsObject.steps.length)] || "#000000",
          delay: 300,
        },
      ],
    });
  };

  const onDelete = (id: string) => {
    onStepsChange({
      ...stepsObject,
      steps: stepsObject.steps.filter((s: any) => s.id !== id),
    });
  };

  const onMoveUp = (id: string) => {
    const index = stepsObject.steps.findIndex((s: any) => s.id === id);
    if (index === 0 || index === -1) return;
    onStepsChange({
      ...stepsObject,
      steps: arrayMove(stepsObject.steps, index, index - 1),
    });
  };
  const onMoveDown = (id: string) => {
    const index = stepsObject.steps.findIndex((s: any) => s.id === id);
    if (index === stepsObject.steps.length - 1 || index === -1) return;
    onStepsChange({
      ...stepsObject,
      steps: arrayMove(stepsObject.steps, index, index + 1),
    });
  };
  const onStepChange = (step: Step) => {
    onStepsChange({
      ...stepsObject,
      steps: stepsObject.steps.map((s: any) => {
        if (s.id === step.id) {
          return step;
        }
        return s;
      }),
    });
  };
  return (
    <Wrapper>
      <Title
        onChange={(e) =>
          onStepsChange({ ...stepsObject, name: e.target.value })
        }
        value={stepsObject?.name}
      />
      <Arrows>
        <Arrow
          disabled={selectedIndex === 0}
          onClick={() => onIndexChange(selectedIndex - 1)}
        >
          &larr;
        </Arrow>
        <Arrow
          disabled={selectedIndex === stepsContainerLength - 1}
          onClick={() => onIndexChange(selectedIndex + 1)}
        >
          &rarr;
        </Arrow>
      </Arrows>
      <AddStep onClick={() => onAdd(uuidv4())}>Add step</AddStep>
      {stepsObject?.steps.map((step: any, index: any) => (
        <EditStep
          key={step.id}
          {...step}
          stepsLength={stepsObject.steps.length}
          index={index}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onStepChange={onStepChange}
        />
      ))}
      {stepsContainerLength > 1 && (
        <Delete onClick={() => onDeleteStepsObject(stepsObject.id)}>
          Delete steps
        </Delete>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 80px;
`;
const Title = styled.input`
  font-size: 35px;
  margin: 40px 0 0;
  border: none;
  text-align: center;
`;
const AddStep = styled.button`
  background-color: black;
  color: white;
  border-radius: 6px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  font-size: 20px;
  width: calc(100% - 10px);
`;
const Delete = styled(AddStep)`
  background-color: #aa2244;
  color: #ffffff;
`;
const Arrows = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const Arrow = styled.button`
  cursor: pointer;
  background-color: inherit;
  border: none;
  font-size: 33px;
`;

export default EditSteps;
