export interface BookingPayload {
  room_id: string
  name: string
  title: string
  description: string
  start_time: string
  end_time: string
}

export interface Booking {
  id: string
  room_id: string
  title: string
  description: string
  start_time: string
  end_time: string
  created_at: string
  status: string
  name: string
  image_link: string | null
  rooms: {
    name: string
    location: string
  }
}