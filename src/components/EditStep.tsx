import { useEffect, useState } from "react";
import styled from "styled-components";

export interface Step {
  id: string;
  bgColor: string;
  description: string;
  delay: number;
}

interface Props extends Step {
  index: number;
  stepsLength: number;
  onDelete: any;
  onMoveUp: any;
  onMoveDown: any;
  onStepChange: any;
}

const EditStep = ({
  id,
  index,
  stepsLength,
  bgColor,
  delay,
  description,
  onDelete,
  onMoveUp,
  onMoveDown,
  onStepChange,
}: Props) => {
  const [animateMoveUp, setAnimateMoveUp] = useState(false);
  const [animateMoveDown, setAnimateMoveDown] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [delayValue, setDelayValue] = useState(delay / 1000);
  const [bgColorValue, setBgColorValue] = useState(bgColor);
  const colorId = `color-${id}`;

  const handleBackgroundColorChange = (e: any) => {
    setBgColorValue(e.target.value);
    const step = {
      id,
      bgColor: e.target.value,
      description: descriptionValue,
      delay: delayValue * 1000,
    };
    onStepChange(step);
  };
  const handleDescriptionChange = (e: any) => {
    setDescriptionValue(e.target.value);
    const step = {
      id,
      bgColor: bgColorValue,
      description: e.target.value,
      delay: delayValue * 1000,
    };
    onStepChange(step);
  };
  const handleDelayValueChange = (e: any) => {
    setDelayValue(Number(e.target.value));
    const step = {
      id,
      bgColor: bgColorValue,
      description: descriptionValue,
      delay: Number(e.target.value) * 1000,
    };
    onStepChange(step);
  };

  const handleMoveUp = () => {
    setAnimateMoveUp(true);
    setTimeout(() => {
      setAnimateMoveUp(false);
      onMoveUp(id);
    }, 200);
  };

  const handleMoveDown = () => {
    setAnimateMoveDown(true);
    setTimeout(() => {
      setAnimateMoveDown(false);
      onMoveDown(id);
    }, 200);
  };

  useEffect(() => {
    setBgColorValue(bgColor);
    setDelayValue(delay / 1000);
    setDescriptionValue(description);
  }, [id, bgColor, delay, description]);

  return (
    <Wrapper
      bgColor={bgColorValue}
      animateMoveUp={animateMoveUp}
      animateMoveDown={animateMoveDown}
    >
      <ColorPicker
        id={colorId}
        type="color"
        onChange={handleBackgroundColorChange}
        value={bgColorValue}
      />
      <Input onChange={handleDescriptionChange} value={descriptionValue} />
      <Range
        type="range"
        min="0"
        max="120"
        step="0.1"
        onChange={handleDelayValueChange}
        value={delayValue}
      />
      <RangeValue>{delayValue}s</RangeValue>
      <Button disabled={index === 0} onClick={handleMoveUp}>
        &uarr;
      </Button>
      <Button disabled={index === stepsLength - 1} onClick={handleMoveDown}>
        &darr;
      </Button>
      <Button onClick={() => onDelete(id)}>&times;</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  bgColor: string;
  animateMoveUp: boolean;
  animateMoveDown: boolean;
}>`
  background-color: ${(p) => p.bgColor || "black"};
  margin: 5px;
  border-radius: 6px;
  color: white;
  text-align: left;
  text-shadow: 0.5px 0.5px #666;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  ${(p) =>
    p.animateMoveUp &&
    `
    transform: translateY(-115%);
    transition: transform 200ms ease;
  `}
  ${(p) =>
    p.animateMoveDown &&
    `
    transform: translateY(115%);
    transition: transform 200ms ease;
  `}
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  background-color: inherit;
  color: inherit;
  padding: 10px;
  border: none;
  margin: 0 5px;
`;
const Range = styled(Input)`
  width: 30%;
`;
const RangeValue = styled.strong`
  display: block;
  width: 150px;
`;

const ColorPicker = styled.input`
  background-color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const Button = styled.button`
  border-radius: 6px;
  background-color: inherit;
  color: white;
  border: none;
  font-size: 20px;
  line-height: 20px;
  cursor: pointer;
  :disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export default EditStep;
