"use client";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password || !password2) return;
    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "password2") setPassword2(value);
  }

  useEffect(() => {
    setIsButtonDisabled(
      email.trim() === "" || password.trim() === "" || password2.trim() === ""
    );
  }, [email, password, password2]);

  return (
    <div className="p-8 m-4 border shadow max-w-md mx-auto 448px:rounded-xl bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          id="email"
          name="email"
          className="login-input"
          placeholder="Email"
          onChange={handleInputChange}
        />

        <input
          type="password"
          id="password"
          name="password"
          className="login-input mt-4"
          placeholder="Password"
          onChange={handleInputChange}
        />

        <input
          type="password"
          id="password2"
          name="password2"
          className="login-input mt-4"
          placeholder="Confirm password"
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="border shadow rounded-md h-12 mx-0 mt-6 bg-lime-700 text-white font-medium hover:bg-lime-800 focus:bg-lime-800 focus:outline-none hover:shadow-lg transition disabled:bg-gray-300"
          disabled={isButtonDisabled}
        >
          Register
        </button>
      </form>
    </div>
  );
}
