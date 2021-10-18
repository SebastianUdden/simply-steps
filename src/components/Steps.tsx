import { useEffect, useState } from "react";
import styled from "styled-components";

const initialStep = {
  id: 0,
  bgColor: "#444",
  description: "Loading",
  delay: 300,
};

interface Props {
  steps: any[];
}

const Steps = ({ steps }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [showButton, setShowButton] = useState(false);
  const [fadeInButton, setFadeInButton] = useState(false);

  useEffect(() => {
    setCurrentStep(steps[currentIndex]);
  }, [steps, currentIndex]);

  useEffect(() => {
    if (currentStep.id === 0) return;
    setShowButton(false);
    setFadeInButton(false);
    setTimeout(() => {
      setShowButton(true);
    }, currentStep.delay);
    setTimeout(() => {
      setFadeInButton(true);
    }, currentStep.delay + 300);
  }, [currentStep]);

  if (!currentStep) return null;

  return (
    <Wrapper bgColor={currentStep.bgColor}>
      <span>{currentStep.description}</span>
      {currentStep.id !== steps.length && showButton && (
        <Button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          fadeInButton={fadeInButton}
        >
          Done
        </Button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ bgColor?: string }>`
  background-color: ${(p) => p.bgColor || "#282c34"};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  transition: background-color 150ms ease;
  padding: 0 40px;
  span {
    text-shadow: 0.5px 0.5px #666;
  }
`;

const Button = styled.button<{ fadeInButton?: boolean }>`
  opacity: ${(p) => (p.fadeInButton ? 1 : 0)};
  transition: opacity 500ms ease;
  cursor: pointer;
  position: absolute;
  bottom: 40px;
  left: 40px;
  right: 40px;
  width: calc(100% - 80px);
  background-color: #00000055;
  color: white;
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  font-size: 20px;
  padding: 20px;
  border-radius: 6px;
`;

export default Steps;
