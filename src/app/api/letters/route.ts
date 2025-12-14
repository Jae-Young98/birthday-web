import { NextResponse } from "next/server";

export async function GET() {
  const raw = process.env.LETTERS_JSON;

  if (!raw) {
    return NextResponse.json({ error: "letters not found" }, { status: 404 });
  }

  return NextResponse.json(JSON.parse(raw));
}
