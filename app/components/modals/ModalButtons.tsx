import Button from "../formElements/Button";
import "./ModalButtons.scss";

interface ModalButtonsProps {
  submitBtnValue: string;
  secondButtonValue?: string;
  disabled?: boolean;
  handleSecondBtnClick?: () => void;
  handleSubmitBtnClick: () => void;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({
  submitBtnValue,
  secondButtonValue,
  disabled,
  handleSecondBtnClick,
  handleSubmitBtnClick,
}) => {
  return (
    <div className="modal-btns">
      <Button
        disabled={disabled}
        onClick={handleSubmitBtnClick}
        ariaLabel={
          submitBtnValue === "continue" ? "Go to next step" : "Share your flat"
        }
      >
        {submitBtnValue}
      </Button>
      {secondButtonValue && (
        <Button
          outline
          onClick={handleSecondBtnClick}
          ariaLabel="Go to previous step"
        >
          {secondButtonValue}
        </Button>
      )}
    </div>
  );
};

export default ModalButtons;
