import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Kankorn Chirachaihirun",
    studentId: "650610746",
  });
};
