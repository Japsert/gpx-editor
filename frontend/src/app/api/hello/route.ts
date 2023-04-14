import axios from "axios";
import { debug } from "console";
import { NextRequest, NextResponse } from "next/server";

const helloApiUrl = "http://backend:8000/api/hello";

export async function GET() {
  try {
    const res = await axios.get(helloApiUrl);
    return NextResponse.json(res.data);
  } catch (err) {
    console.error(err);
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const res = await axios.post(helloApiUrl, data);
    return NextResponse.json(res.data);
  } catch (err) {
    console.error(err);
  }
}

export async function DELETE() {
  try {
    const res = await axios.delete(helloApiUrl);
    return NextResponse.json(res.data);
  } catch (err) {
    console.error(err);
  }
}
