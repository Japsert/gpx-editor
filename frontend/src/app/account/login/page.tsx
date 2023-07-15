"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send login request to server
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }

  useEffect(() => {
    setIsButtonDisabled(email.trim() === "" || password.trim() === "");
  }, [email, password]);

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

        <button
          type="submit"
          className="border shadow rounded-md h-12 mx-0 mt-6 bg-lime-700 text-white font-medium hover:bg-lime-800 focus:bg-lime-800 focus:outline-none hover:shadow-lg transition disabled:bg-gray-300"
          disabled={isButtonDisabled}
        >
          Log in
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-gray-600">
        No account yet?{" "}
        <Link href="/account/register" className="text-lime-700">
          Create one
        </Link>
      </p>
    </div>
  );
}
