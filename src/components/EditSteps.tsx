import styled from "styled-components";
import EditStep from "./EditStep";

interface Props {
  steps: any[];
  onDelete: any;
  onMoveUp: any;
  onMoveDown: any;
  onStepChange: any;
}

const EditSteps = ({
  steps,
  onMoveUp,
  onMoveDown,
  onDelete,
  onStepChange,
}: Props) => {
  return (
    <Wrapper>
      {steps.map((step, index) => (
        <EditStep
          key={step.id}
          {...step}
          stepsLength={steps.length}
          index={index}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onStepChange={onStepChange}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default EditSteps;
