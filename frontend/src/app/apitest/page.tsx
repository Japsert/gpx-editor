"use client";
import { useState } from "react";
import axios from "axios";

export default function ApiTestPage() {
  const [ApiResponse, setApiResponse] = useState([] as string[]);
  const [requestSent, setRequestSent] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const helloApiUrl = "/api/hello";

  async function getFirstRow() {
    setRequestSent(true);
    try {
      const response = await axios.get(helloApiUrl);
      setApiResponse([...ApiResponse, response.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setRequestSent(false);
    }
  }

  async function createRow(event: any) {
    event.preventDefault(); // to prevent page reload
    setRequestSent(true);
    try {
      const input = JSON.stringify({
        text: inputValue ? inputValue : "hello world!",
      });
      const response = await axios.post(helloApiUrl, input);
      setApiResponse([...ApiResponse, response.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setRequestSent(false);
    }
  }

  async function clearDatabase() {
    setRequestSent(true);
    try {
      const response = await axios.delete(helloApiUrl);
      setApiResponse([...ApiResponse, response.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setRequestSent(false);
    }
  }

  return (
    <main className="text-content">
      <h1>API test</h1>

      <h2>Getting the first row</h2>

      <button onClick={getFirstRow} className="btn-blue">
        {requestSent ? "Sent request..." : "Get first row from database"}
      </button>

      <h2>Creating a row</h2>

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
          <button type="submit" className="btn-blue">
            {requestSent ? "Sent request..." : "Create row"}
          </button>
        </form>
      </div>

      <h2>Clearing the database</h2>

      <button onClick={clearDatabase} className="btn-red">
        {requestSent ? "Sent request..." : "Clear database"}
      </button>

      <h2>API Response</h2>

      {ApiResponse.length === 0 && (
        <p className="text-gray-500 italic">No responses yet</p>
      )}
      <ul>
        {ApiResponse.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
