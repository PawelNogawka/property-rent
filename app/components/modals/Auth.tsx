"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

import { signIn } from "next-auth/react";

import { AiFillGithub } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GiCastle } from "@react-icons/all-files/gi/GiCastle";

import { useRegister } from "@/app/hooks/useRegister";
import { useLogin } from "@/app/hooks/useLogin";

import Modal from "./Modal";
import Input from "../formElements/Input";
import Button from "../formElements/Button";

import "./Auth.scss";

interface AuthProps {
  setShowModal: (show: string) => void;
  mode?: string;
}

interface Errors {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmedPassword: string | null;
}

const Auth: React.FC<AuthProps> = ({ setShowModal, mode }) => {
  const [modalMode, setModalMode] = useState(mode);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({
    name: null,
    email: null,
    password: null,
    confirmedPassword: null,
  });

  const {
    error: registerError,
    isLoading: isRegisterLoading,
    register,
  } = useRegister();

  const { error: loginError, isLoading: isLoginLoading, login } = useLogin();

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({
      name: null,
      email: null,
      password: null,
      confirmedPassword: null,
    });

    let shouldSubmit = true;

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!values.email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
      shouldSubmit = false;
    } else if (!emailRegex.test(values.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
      shouldSubmit = false;
    }

    if (!values.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      shouldSubmit = false;
    }

    if (values.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
      shouldSubmit = false;
    }

    if (mode == "login") {
      if (shouldSubmit) {
        const response = await login(values);
        if (response?.ok) {
          setShowModal("");
        }
        setValues({
          name: "",
          email: "",
          password: "",
          confirmedPassword: "",
        });

      }
      return;
    }

    if (!values.name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required.",
      }));
      shouldSubmit = false;
    }

    if (!values.confirmedPassword.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmedPassword: "Confirmed is required.",
      }));
      shouldSubmit = false;
    }

    if (values.confirmedPassword !== values.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmedPassword: "Passwords doesen't match.",
      }));
      shouldSubmit = false;
    }

    if (shouldSubmit) {
      const response = await register(values);
      if (response && response.statusText == "OK") {
        setShowModal("login");
      }

      setValues({
        name: "",
        email: "",
        password: "",
        confirmedPassword: "",
      });
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    let error: string | null = null;

    if (name === "name" && !value.trim()) {
      error = "name is required.";
    } else if (name === "email") {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email address.";
      }
    } else if (name === "password") {
      if (!value.trim()) {
        error = "Password is required.";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long.";
      }
    } else if (name === "confirmedPassword") {
      if (!value.trim()) {
        error = "Confirmed is required.";
      } else if (value !== values.password) {
        error = "Passwords don't match.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleClearButtonClick = () => {
    setErrors({
      name: null,
      email: null,
      password: null,
      confirmedPassword: null,
    });

    setValues({
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
    });
  };

  const handleModeLinkClick = () => {
    if (modalMode == "login") {
      setModalMode("register");
    } else if (modalMode == "register") {
      setModalMode("login");
    }
  };

  const body = (
    <form onSubmit={handleFormSubmit} className="auth">
      {modalMode == "register" && (
        <>
          <Input
            type="text"
            name="name"
            id="name"
            label="Name:"
            placeholder="Enter your name..."
            ariaLabel="Enter your name"
            onChange={handleInputChange}
            error={errors.name}
            value={values.name}
          />
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Enter your email..."
            ariaLabel="Enter your email"
            onChange={handleInputChange}
            error={errors.email}
            value={values.email}
          />
          <Input
            type="password"
            name="password"
            id="password"
            label="Password"
            placeholder="Enter your password..."
            ariaLabel="Enter your password"
            value={values.password}
            error={errors.password}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="confirmedPassword"
            id="confirm-password"
            label="Confirm password"
            placeholder="Confirm your password..."
            ariaLabel="Confirm your password"
            value={values.confirmedPassword}
            error={errors.confirmedPassword}
            onChange={handleInputChange}
          />
        </>
      )}
      {modalMode == "login" && (
        <>
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Enter your email..."
            ariaLabel="Enter your email"
            onChange={handleInputChange}
            error={errors.email}
            value={values.email}
          />
          <Input
            type="password"
            name="password"
            id="password"
            label="Password"
            placeholder="Enter your password..."
            ariaLabel="Enter your password"
            value={values.password}
            error={errors.password}
            onChange={handleInputChange}
          />
        </>
      )}
      {loginError && <span className="auth__error">{loginError.message}</span>}
      {registerError && (
        <span className="auth__error">{registerError.message}</span>
      )}

      <div className="auth__btns">
        <Button
          disabled={isLoginLoading || isRegisterLoading}
          type="submit"
          ariaLabel="Continue to photo upload"
        >
          {!isLoginLoading && !isRegisterLoading ? "Continue" : "Loading..."}
        </Button>
        <Button
          onClick={handleClearButtonClick}
          outline
          ariaLabel="Clear the form"
        >
          Clear form
        </Button>
      </div>
    </form>
  );

  const footer = (
    <>
      <div className="auth__footer-btns">
        <Button
          dark
          onClick={() => signIn("github")}
          outline
          ariaLabel="Login with Githhub"
        >
          <AiFillGithub />
          Continue with Github
        </Button>
        <Button
          dark
          onClick={() => signIn("google")}
          outline
          ariaLabel="Login with Google"
        >
          <AiFillGoogleCircle />
          Continue with Google
        </Button>
      </div>
      <div className="auth__footer-bottom">
        <Link href="/" className="auth__logo" aria-label="Back to home">
          <GiCastle />
        </Link>
        <button
          onClick={handleModeLinkClick}
          className="auth__change-link"
          aria-label="Go to login"
        >
          {modalMode == "login"
            ? "Don't have an account? register"
            : "Have an account? login"}
        </button>
        <Link
          href="/"
          className="auth__footer-link"
          aria-label="Go to terms and conditions"
        >
          Terms and Conditions
        </Link>
      </div>
    </>
  );

  return (
    <Modal
      body={body}
      footer={footer}
      label={modalMode == "login" ? "Login" : "Register"}
      title={
        modalMode == "login" ? "Log in to your account" : "Create an account"
      }
      subtitle={
        modalMode === "login"
          ? "Log in and Discover your dream rental apartment hassle-free!"
          : "Register and Discover your dream rental apartment hassle-free!"
      }
      setShowModal={setShowModal}
    />
  );
};

export default Auth;
