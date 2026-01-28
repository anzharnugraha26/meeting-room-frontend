import { NextRequest, NextResponse } from "next/server"
import { BASE_URL } from "@/src/lib/api"

export async function PATCH(req: NextRequest, context: any) {
  try {
    const { id: bookingId } = await context.params   // works for Promise or object
    const { status } = await req.json()

    const backendRes = await fetch(
      `${BASE_URL}/bookings/${bookingId}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        cache: "no-store",
      }
    )

    const data = await backendRes.json()
    return NextResponse.json(data, { status: backendRes.status })
  } catch (error) {
    console.error("PROXY UPDATE STATUS ERROR:", error)
    return NextResponse.json(
      { message: "Failed to connect to backend service" },
      { status: 500 }
    )
  }
}