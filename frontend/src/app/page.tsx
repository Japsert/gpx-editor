"use client";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [ApiResponse, setApiResponse] = useState([] as string[]);
  const [requestSent, setRequestSent] = useState(false);
  const [inputValue, setInputValue] = useState("");

  async function getFirstRow() {
    setRequestSent(true);
    const url = "/api/hello";
    const response = await fetch(url, { method: "GET" });
    const text = await response.text();
    setApiResponse([...ApiResponse, text]);
    setRequestSent(false);
  }

  async function createRow(event: any) {
    event.preventDefault();
    setRequestSent(true);
    const url = "/api/hello";
    const input = JSON.stringify(inputValue ? inputValue : "hello world!");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: input,
    });
    const text = await response.text();
    setApiResponse([...ApiResponse, text]);
    setRequestSent(false);
  }

  // function to clear database
  async function clearDatabase() {
    setRequestSent(true);
    const url = "/api/hello";
    const response = await fetch(url, { method: "DELETE" });
    const text = await response.text();
    setApiResponse([...ApiResponse, text]);
    setRequestSent(false);
  }

  return (
    <>
      <h1>API test 🤠</h1>

      <p>
        <Link href="/map">
          <button>go to map</button>
        </Link>
      </p>

      <p>
        <button onClick={getFirstRow}>
          {requestSent ? "Sent request..." : "Get first row from database"}
        </button>
      </p>

      <div>
        <form onSubmit={createRow}>
          <label htmlFor="input">text:</label>
          <input
            id="input"
            type="text"
            value={inputValue}
            placeholder="hello world!"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button type="submit">
            {requestSent ? "Sent request..." : "Create row"}
          </button>
        </form>
      </div>

      <p>
        <button onClick={clearDatabase}>
          {requestSent ? "Sent request..." : "Clear database"}
        </button>
      </p>

      <p>API response:</p>
      <ul>
        {ApiResponse.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}
