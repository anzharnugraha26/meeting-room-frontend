import { BASE_URL } from "../lib/api"
import { mapRoomData, Room } from "../models/roomModel"


export async function getAllRooms(): Promise<Room[]> {
  const res = await fetch(`${BASE_URL}/rooms`, {
    next: { revalidate: 60 }, // cache 60 detik
  })

  if (!res.ok) {
    throw new Error("Failed to fetch rooms")
  }

  const data = await res.json()
  return data.map(mapRoomData)
}