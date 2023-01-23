export type Device = {
  id: string,
  name: string,
  description: string,
  location: string,
  status: {
    volume: number,
    percent_usage: number
    volume_purchased: number
  },
}

export type User = {
  id: string,
  name: string,
  email: string,
  phone?: string,
}

export type DeviceUsage = {
  date: number,
  volume: number,
}

export type DevicePurchase = {
  date: number,
  volume: number,
  price: number,
}