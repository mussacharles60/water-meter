import { Device, User } from "../models";

export const db = {
  "devices": [
    {
      id: "device-1",
      name: "My home meter",
      description: "This is my home meter",
      location: "Dar es salaam",
      status: {
        volume: 250,
        volume_unit: "l", // litres
        percent_usage: 50.0,
        volume_purchased: 500,
      },
    },
    {
      id: "device-2",
      name: "My other meter",
      description: "This is my other meter",
      location: "Dar es salaam",
      status: {
        volume: 2500,
        volume_unit: "l", // litres
        percent_usage: 50.0,
        volume_purchased: 5000,
      },
    },
  ],
  "users": [
    {
      id: "user-1",
      name: "Mussa Charles",
      email: "mussacharles60@gmail.com",
      password_hash: "wpeomicjjwqoifowimewiof",
    },
    {
      id: "user-2",
      name: "Robert",
      email: "robert@gmail.com",
      password_hash: "wpeomicjjwqoifowimewiof",
    },
    {
      id: "user-3",
      name: "Willbroad 101",
      email: "willbroad@gmail.com",
      password_hash: "wpeomicjjwqoifowimewiof",
    },
    {
      id: "user-4",
      name: "User ###",
      email: "user@gmail.com",
      password_hash: "wpeomicjjwqoifowimewiof",
    },
  ],
  "user_devices": [
    {
      user_id: "user-1",
      device_id: "device-1",
      role: "owner",
    },
    {
      user_id: "user-1",
      device_id: "device-2",
      role: "owner",
    },
    {
      user_id: "user-1",
      device_id: "device-3",
      role: "user",
    },
    {
      user_id: "user-1",
      device_id: "device-4",
      role: "owner",
    },
    {
      user_id: "user-1",
      device_id: "device-5",
      role: "user",
    },
    {
      user_id: "user-1",
      device_id: "device-6",
      role: "user",
    },
    {
      user_id: "user-1",
      device_id: "device-7",
      role: "user",
    },
    {
      user_id: "user-1",
      device_id: "device-8",
      role: "owner",
    },
    {
      user_id: "user-1",
      device_id: "device-9",
      role: "owner",
    },
    {
      user_id: "user-1",
      device_id: "device-10",
      role: "owner",
    },
    {
      user_id: "user-1",
      device_id: "device-11",
      role: "owner",
    },
    {
      user_id: "user-2",
      device_id: "device-1",
      role: "owner",
    },
    {
      user_id: "user-3",
      device_id: "device-1",
      role: "owner",
    },
    {
      user_id: "user-4",
      device_id: "device-1",
      role: "user",
    },
  ],
  "device-1_usage": [
    {
      date: 1,
      volume: 20,
    },
    {
      date: 2,
      volume: 18,
    },
    {
      date: 3,
      volume: 50,
    },
    {
      date: 4,
      volume: 80.5,
    },
    {
      date: 5,
      volume: 30.2,
    },
    {
      date: 6,
      volume: 20,
    },
    {
      date: 7,
      volume: 5,
    },
  ],
  "device-1_purchases": [
    {
      date: 1,
      volume: 500,
      price: 50000,
    },
  ],
};

export const devices_api = [
  {
    id: "device-1",
    name: "My home meter",
    description: "This is my home meter",
    location: "Dar es salaam",
    status: {
      volume: 250, // litres
      percent_usage: 50.0,
      volume_purchased: 500,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-3",
        name: "Willbroad 101",
        email: "willbroad@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-4",
        name: "User ###",
        email: "user@gmail.com",
        role: "user",
      },
    ],
  },
  {
    id: "device-2",
    name: "My other meter",
    description: "This is my other meter",
    location: "Dar es salaam",
    status: {
      volume: 2500, // litres
      percent_usage: 50.0,
      volume_purchased: 5000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
  {
    id: "device-3",
    name: "Meter no. 3",
    description: "This is meter no. 3",
    location: "Dar es salaam",
    status: {
      volume: 2500, // litres
      percent_usage: 50.0,
      volume_purchased: 5000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
  {
    id: "device-4",
    name: "Meter no. 4",
    description: "This is meter no. 4",
    location: "Dar es salaam",
    status: {
      volume: 4500, // litres
      percent_usage: 45.0,
      volume_purchased: 10000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
  {
    id: "device-5",
    name: "Meter no. 5",
    description: "This is meter no. 5",
    location: "Dar es salaam",
    status: {
      volume: 2550, // litres
      percent_usage: 52.50,
      volume_purchased: 5000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
  {
    id: "device-6",
    name: "Meter no. 6",
    description: "This is meter no. 6",
    location: "Dar es salaam",
    status: {
      volume: 5000, // litres
      percent_usage: 50.0,
      volume_purchased: 10000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
  {
    id: "device-7",
    name: "Meter no. 7",
    description: "This is meter no. 7",
    location: "Dar es salaam",
    status: {
      volume: 6000, // litres
      percent_usage: 60.0,
      volume_purchased: 10000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
  {
    id: "device-8",
    name: "Meter no. 8",
    description: "This is meter no. 8",
    location: "Dar es salaam",
    status: {
      volume: 7500, // litres
      percent_usage: 75.0,
      volume_purchased: 10000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
  {
    id: "device-9",
    name: "Meter no. 9",
    description: "This is meter no. 9",
    location: "Dar es salaam",
    status: {
      volume: 3500, // litres
      percent_usage: 30.0,
      volume_purchased: 9000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
  {
    id: "device-10",
    name: "Meter no. 10",
    description: "This is meter no. 10",
    location: "Dar es salaam",
    status: {
      volume: 5000, // litres
      percent_usage: 100.0,
      volume_purchased: 5000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
  {
    id: "device-11",
    name: "Meter no. 11",
    description: "This is meter no. 11",
    location: "Dar es salaam",
    status: {
      volume: 5000, // litres
      percent_usage: 100.0,
      volume_purchased: 5000,
      usage: [
        {
          date: 1,
          volume: 20,
        },
        {
          date: 2,
          volume: 18,
        },
        {
          date: 3,
          volume: 50,
        },
        {
          date: 4,
          volume: 80.5,
        },
        {
          date: 5,
          volume: 30.2,
        },
        {
          date: 6,
          volume: 20,
        },
        {
          date: 7,
          volume: 5,
        },
      ],
    },
    users: [
      {
        user_id: "user-1",
        name: "Mussa Charles",
        email: "mussacharles60@gmail.com",
        role: "owner",
      },
      {
        user_id: "user-2",
        name: "Robert",
        email: "robert@gmail.com",
        role: "owner",
      },
    ],
  },
];

export type APIResponce = {
  success?: {
    code: number,
    message?: string,
    data: any,
  },
  error?: {
    code: number,
    message: string,
    data?: any,
  }
}

export default class API {

  public static login = (email: string, password: string): APIResponce => {
    let user: User | null = null;
    for (let i = 0; i < db.users.length; i++) {
      const u = db.users[i];
      if (u.email === email) {
        user = u;
        break;
      }
    }

    if (user && user.id + '2023' === password) {
      return {
        success: {
          code: 200,
          message: 'returned user data',
          data: [
            {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
            }
          ]
        }
      }
    } else {
      return {
        error: {
          code: 500,
          message: 'user not found'
        }
      }
    }
  };

  public static getUserData = (userId: string): APIResponce => {
    let user: User | null = null;
    for (let i = 0; i < db.users.length; i++) {
      const u = db.users[i];
      if (u.id === userId) {
        user = u;
        break;
      }
    }
    if (user) {
      return {
        success: {
          code: 200,
          message: 'returned user data',
          data: [
            {
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
              },
              devices: devices_api,
            }
          ]
        }
      }
    } else {
      return {
        error: {
          code: 500,
          message: 'user not found'
        }
      }
    }
  }

  public static getDevicesByUser = (userId: string): Device[] => {

    const user_devices_ids: string[] = [];

    db.user_devices.forEach(ud => {
      if (ud.user_id === userId) {
        user_devices_ids.push(ud.device_id);
      }
    });

    const devices = db.devices.filter(d => {
      return user_devices_ids.includes(d.id);
    });

    return devices;
  }
}

