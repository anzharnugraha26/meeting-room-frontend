import { getAllRooms } from "@/src/controllers/roomController"
import { NextResponse } from "next/server"


export async function GET() {
  try {
    const rooms = await getAllRooms()
    return NextResponse.json(rooms)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching rooms" },
      { status: 500 }
    )
  }
}