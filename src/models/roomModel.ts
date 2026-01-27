export interface Room {
  id: string
  name: string
  location: string
  capacity: number
  image_link: string
  status: string
  realtime_status: string
  next_booking_start: string | null
}

export function mapRoomData(data: any): Room {
  return {
    id: data.id,
    name: data.name,
    location: data.location,
    capacity: data.capacity,
    image_link: data.image_link,
    status: data.status,
    realtime_status: data.realtime_status,
    next_booking_start: data.next_booking_start,
  }
}