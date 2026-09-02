import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonDb } from "@/lib/json-db";
import type { BaseRecord } from "@/lib/types";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ collection: string }> };
const idSchema = z.string().min(1);

const getCollection = async (context: RouteContext): Promise<string> => {
  const { collection } = await context.params;
  return collection;
};

const errorResponse = (error: unknown): NextResponse => {
  const message = error instanceof z.ZodError ? "Invalid request" : "Collection unavailable";
  return NextResponse.json({ error: message }, { status: error instanceof z.ZodError ? 400 : 500 });
};

export async function GET(request: Request, context: RouteContext): Promise<NextResponse> {
  try {
    const collection = await getCollection(context);
    const id = new URL(request.url).searchParams.get("id");
    if (id) return NextResponse.json(await jsonDb.getById<BaseRecord>(collection, id));
    return NextResponse.json(await jsonDb.getAll(collection));
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request, context: RouteContext): Promise<NextResponse> {
  try {
    const collection = await getCollection(context);
    const body = await request.json();
    const record = await jsonDb.create(collection, body);
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: RouteContext): Promise<NextResponse> {
  try {
    const collection = await getCollection(context);
    const id = idSchema.parse(new URL(request.url).searchParams.get("id"));
    const record = await jsonDb.update(collection, id, await request.json());
    return NextResponse.json(record);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request, context: RouteContext): Promise<NextResponse> {
  try {
    const collection = await getCollection(context);
    const id = idSchema.parse(new URL(request.url).searchParams.get("id"));
    const removed = await jsonDb.remove(collection, id);
    return removed ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return errorResponse(error);
  }
}
