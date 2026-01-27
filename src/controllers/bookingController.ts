import { Booking, BookingPayload } from "../models/bookingModel"


export async function createBooking(payload: BookingPayload) {
  const res = await fetch("/api/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Gagal membuat booking")
  }

  return data
}

export async function getBookings(): Promise<Booking[]> {
  const res = await fetch("/api/booking")

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Gagal mengambil booking")

  return data
}