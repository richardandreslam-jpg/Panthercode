import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET(): NextResponse {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "development",
  });
}
