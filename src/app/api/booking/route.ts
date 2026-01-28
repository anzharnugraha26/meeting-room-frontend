import { BASE_URL } from "@/src/lib/api"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Booking gagal" },
        { status: res.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/bookings`, {
      cache: "no-store", // biar selalu fresh
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { message: "Gagal mengambil data booking" },
        { status: res.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json()
    const bookingId = params.id

    // Panggil backend Express kamu
    const response = await fetch(
      `${BASE_URL}/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    )

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update booking status" },
      { status: 500 }
    )
  }
}