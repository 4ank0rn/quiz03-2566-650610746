import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: DB.rooms.length,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  const body = await request.json();
  const { roomName } = body;

  if (!payload)
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();

  const foundDupe = DB.rooms.find((x) => x.roomName === roomName);
  if (foundDupe)
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${body.roomName} already exists`,
      },
      { status: 400 }
    );

  const roomId = nanoid();

  DB.rooms.push(roomName && roomId);

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId: payload.roomId,
    message: `Room ${body.roomName} has been created`,
  });
};
