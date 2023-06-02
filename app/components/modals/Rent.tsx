"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";

import { useCreate } from "@/app/hooks/useCreate";

import { CountrySelectValue } from "../formElements/CountrySelect";
import { categories } from "@/app/data/categories";
import { FaChair } from "@react-icons/all-files/fa/FaChair";
import { FaBath } from "@react-icons/all-files/fa/FaBath";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";

import Modal from "./Modal";
import CategoryInput from "../formElements/CategoryInput";
import CountrySelect from "../formElements/CountrySelect";
import Loader from "../uiElements/Loader";
import Counter from "../formElements/Counter";
import ImageInput from "../formElements/ImageInput";
import Input from "../formElements/Input";
import ModalButtons from "./ModalButtons";

import "./Rent.scss";

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGE,
  DESCRIPTION,
  PRICE,
}

interface RentProps {
  setShowModal: (show: string) => void;
}

const Rent: React.FC<RentProps> = ({ setShowModal }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState<CountrySelectValue>();
  const [bathrooms, setBathrooms] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [guest, setGuest] = useState(0);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [descError, setDescError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState<string | number>(0);

  const { create, isLoading, error } = useCreate();

  const buttonsRef = useRef<HTMLDivElement>(null);
  const Map = dynamic(() => import("../Map"), { ssr: false });

  const handleNextStepBtnClick = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStepBtnClick = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleCategoryInputClick = (categoryName: string) => {
    buttonsRef.current?.scrollIntoView({ behavior: "smooth" });
    setSelectedCategory(categoryName);
  };

  const handleSelectInputChange = (value: any) => {
    setLocation(value);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    let error: string | null = null;

    if (name === "title") {
      if (!value.trim()) {
        error = "Title is required.";
      } else if (value.length < 5) {
        error = "Title must have at least 5 characters";
      }
      setTitleError(error);
      setTitle(value);
    } else if (name === "description") {
      if (!value.trim()) {
        error = "Description is required.";
      } else if (value.length < 20) {
        error = "The description must contain a minimum of 20 characters.";
      }
      setDescError(error);
      setDesc(value);
    } else if (name === "price") {
      if (!value.trim()) {
        error = "Price is required.";
      } else if (isNaN(parseFloat(value))) {
        error = "Price must be a number.";
      } else if (+value <= 0) {
        error = "Price must be positive.";
      }
      setPriceError(error);
      setPrice(value);
    }
  };

  const isStepValid = () => {
    if (step === STEPS.CATEGORY) {
      return !!selectedCategory;
    } else if (step === STEPS.LOCATION) {
      return !!location;
    } else if (step === STEPS.INFO) {
      return bathrooms && guest && rooms;
    } else if (step === STEPS.IMAGE) {
      return !!image;
    } else if (step === STEPS.DESCRIPTION) {
      return !titleError && !descError;
    } else if (step === STEPS.PRICE) {
      return !priceError && +price > 0;
    }
    return false;
  };

  const handleCreateBtnClick = async () => {
    const formData = {
      category: selectedCategory,
      location: location,
      bathrooms: +bathrooms,
      rooms: +rooms,
      guests: +guest,
      image: image,
      title: title,
      description: desc,
      price: +price,
    };

    const url = "/api/listings";

    await create(url, formData);

    setShowModal("");
  };

  const renderCategoryStep = () => (
    <div className="rent">
      <ul className="rent__categories">
        {categories.map((category) => (
          <li key={category.label}>
            <CategoryInput
              category={category.label}
              description={category.description}
              icon={category.icon}
              selected={selectedCategory === category.label}
              onClick={() => handleCategoryInputClick(category.label)}
            />
          </li>
        ))}
      </ul>
      <div ref={buttonsRef}>
        <ModalButtons
          submitBtnValue="Continue"
          handleSubmitBtnClick={handleNextStepBtnClick}
          disabled={!isStepValid()}
        />
      </div>
    </div>
  );

  const renderLocationStep = () => (
    <div className="rent">
      <CountrySelect onChange={handleSelectInputChange} value={location} />
      <div className="rent__map">
        <Loader />
        <Map center={location?.latlng} />
      </div>
      <ModalButtons
        submitBtnValue="Continue"
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleNextStepBtnClick}
        disabled={!isStepValid()}
      />
    </div>
  );

  const renderInfoStep = () => (
    <div className="rent">
      <ul className="rent__counters">
        <Counter
          amount={bathrooms}
          setAmount={setBathrooms}
          title="Bathrooms"
          description="How many bathrooms do you have?"
          icon={FaBath}
        />
        <Counter
          amount={rooms}
          setAmount={setRooms}
          title="Rooms"
          description="How many rooms do you have?"
          icon={FaChair}
        />
        <Counter
          amount={guest}
          setAmount={setGuest}
          title="Guests"
          description="how many guests can you take?"
          icon={FaUserFriends}
        />
      </ul>

      <ModalButtons
        submitBtnValue="Continue"
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleNextStepBtnClick}
        disabled={!isStepValid()}
      />
    </div>
  );

  const renderImageStep = () => (
    <div className="rent">
      <ImageInput setImage={setImage} value={image} />
      <ModalButtons
        submitBtnValue="Continue"
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleNextStepBtnClick}
        disabled={!isStepValid()}
      />
    </div>
  );

  const renderDescriptionStep = () => (
    <div className="rent">
      <div className="rent__inputs">
        <Input
          type="text"
          name="title"
          id="title"
          label="Title:"
          placeholder="Enter title..."
          ariaLabel="Enter title"
          onChange={handleInputChange}
          error={titleError}
          value={title}
        />
        <Input
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Describe your apartment..."
          ariaLabel="Describe your apartment"
          onChange={handleInputChange}
          error={descError}
          value={desc}
        />
      </div>
      <ModalButtons
        submitBtnValue="Continue"
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleNextStepBtnClick}
        disabled={!isStepValid()}
      />
    </div>
  );

  const renderPriceStep = () => (
    <div className="rent">
      <Input
        type="number"
        name="price"
        id="price"
        label="Price ($) :"
        placeholder="The cost of spending a day in your home..."
        ariaLabel="the cost of spending a day in your home"
        onChange={handleInputChange}
        error={priceError}
        value={price}
      />

      <ModalButtons
        submitBtnValue="Share your flat!"
        secondButtonValue="Back"
        handleSecondBtnClick={handlePreviousStepBtnClick}
        handleSubmitBtnClick={handleCreateBtnClick}
        disabled={!isStepValid()}
      />
      {error && <p>{error.message}</p>}
    </div>
  );

  let body: React.ReactNode = null;

  switch (step) {
    case STEPS.CATEGORY:
      body = renderCategoryStep();
      break;
    case STEPS.LOCATION:
      body = renderLocationStep();
      break;
    case STEPS.INFO:
      body = renderInfoStep();
      break;
    case STEPS.IMAGE:
      body = renderImageStep();
      break;
    case STEPS.DESCRIPTION:
      body = renderDescriptionStep();
      break;
    case STEPS.PRICE:
      body = renderPriceStep();
      break;
    default:
      break;
  }
  const heading =
    step === STEPS.CATEGORY
      ? "Category"
      : step === STEPS.LOCATION
      ? "Location"
      : step === STEPS.INFO
      ? "Information"
      : step === STEPS.IMAGE
      ? "Image"
      : step === STEPS.DESCRIPTION
      ? "Description"
      : "Price";

  const subtitle =
    step === STEPS.CATEGORY
      ? "Choose the category that best describes your property"
      : step === STEPS.LOCATION
      ? "Where is your apartment located?"
      : step === STEPS.INFO
      ? "Provide information about your property"
      : step === STEPS.IMAGE
      ? "Upload an image of your property"
      : step === STEPS.DESCRIPTION
      ? "Describe your property"
      : "Set the price for your property in dollars";

  const label = "Rent your home!";

  return (
    <Modal
      body={body}
      label={label}
      title={heading}
      subtitle={subtitle}
      setShowModal={setShowModal}
    />
  );
};

export default Rent;
