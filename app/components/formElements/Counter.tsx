"use client";

import { IconType } from "react-icons/lib";

import { AiOutlineMinus } from "@react-icons/all-files/ai/AiOutlineMinus";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";

import "./Counter.scss";

interface CounterProps {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  description: string;
  icon: IconType;
}

const Counter: React.FC<CounterProps> = ({
  amount,
  setAmount,
  title,
  description,
  icon: Icon,
}) => {
  const handleAddBtnClick = () => {
    setAmount((prev) => prev + 1);
  };

  const handleMinusBtnClick = () => {
    if (amount == 0) return;
    setAmount((prev) => prev - 1);
  };

  return (
    <li className="counter">
      <div className="counter__left">
        <div className="counter__left-top">
          <Icon size={15} />
          <h3 className="counter__title">{title}</h3>
        </div>
        <p className="counter__desc">{description}</p>
      </div>
      <div className="counter__right">
        <div className="counter__counter">
          <button
            disabled={amount == 0 ? true : false}
            onClick={handleMinusBtnClick}
            className="counter__btn"
            aria-label={`Add ${title}`}
          >
            <AiOutlineMinus />
          </button>
          <div className="counter__amount">{amount}</div>
          <button
            onClick={handleAddBtnClick}
            className="counter__btn"
            aria-label={`Deduct ${title}`}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Counter;
