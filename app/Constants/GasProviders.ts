interface IGasProvider {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    gas_types: number[];
    price_per_kg: {
        LPG?: number;
        CNG?: number;
    };
    delivery_areas: string[];
    rating: number;
    total_orders: number;
    status: 'active' | 'inactive' | 'suspended';
    created_at: string;
}

export const gasProviderConstant: IGasProvider[] = [
    {
        id: 1,
        name: "Lagos Gas Solutions",
        email: "orders@lagosgas.com",
        phone_number: "+234-901-234-5678",
        address: "15 Industrial Estate, Ikeja, Lagos",
        gas_types: [1, 2], // LPG and CNG
        price_per_kg: {
            LPG: 500,
            CNG: 480
        },
        delivery_areas: ["Victoria Island", "Ikoyi", "Ikeja", "Yaba"],
        rating: 4.8,
        total_orders: 1250,
        status: "active",
        created_at: "2024-01-15T10:00:00Z"
    },
    {
        id: 2,
        name: "Premium Gas Ltd",
        email: "sales@premiumgas.ng",
        phone_number: "+234-902-345-6789",
        address: "8 Marina Street, Lagos Island",
        gas_types: [1], // LPG only
        price_per_kg: {
            LPG: 520
        },
        delivery_areas: ["Marina", "Broad Street", "Victoria Island", "Ikoyi"],
        rating: 4.6,
        total_orders: 890,
        status: "active",
        created_at: "2024-02-20T14:30:00Z"
    },
    {
        id: 3,
        name: "Lekki Gas Express",
        email: "info@lekkigas.com",
        phone_number: "+234-903-456-7890",
        address: "45 Lekki Phase 1, Lagos",
        gas_types: [1, 2], // LPG and CNG
        price_per_kg: {
            LPG: 490,
            CNG: 470
        },
        delivery_areas: ["Lekki", "Ajah", "Victoria Island", "Ikoyi"],
        rating: 4.9,
        total_orders: 2100,
        status: "active",
        created_at: "2023-11-10T09:15:00Z"
    },
    {
        id: 4,
        name: "Mainland Gas Hub",
        email: "orders@mainlandgas.ng",
        phone_number: "+234-904-567-8901",
        address: "23 Agege Motor Road, Ikeja",
        gas_types: [1], // LPG only
        price_per_kg: {
            LPG: 485
        },
        delivery_areas: ["Ikeja", "Agege", "Ojodu", "Maryland"],
        rating: 4.4,
        total_orders: 650,
        status: "active",
        created_at: "2024-03-05T11:45:00Z"
    },
    {
        id: 5,
        name: "Island Gas Depot",
        email: "supply@islandgas.com",
        phone_number: "+234-905-678-9012",
        address: "12 Banana Island, Ikoyi",
        gas_types: [1, 2], // LPG and CNG
        price_per_kg: {
            LPG: 510,
            CNG: 495
        },
        delivery_areas: ["Ikoyi", "Banana Island", "Victoria Island"],
        rating: 4.7,
        total_orders: 430,
        status: "active",
        created_at: "2024-04-12T16:20:00Z"
    },
    {
        id: 6,
        name: "EcoGas Nigeria",
        email: "eco@ecogas.ng",
        phone_number: "+234-906-789-0123",
        address: "7 Ozumba Mbadiwe, Victoria Island",
        gas_types: [2], // CNG only
        price_per_kg: {
            CNG: 460
        },
        delivery_areas: ["Victoria Island", "Ikoyi", "Lekki", "Ajah"],
        rating: 4.5,
        total_orders: 780,
        status: "active",
        created_at: "2024-01-28T13:10:00Z"
    },
    {
        id: 7,
        name: "Swift Gas Services",
        email: "swift@swiftgas.ng",
        phone_number: "+234-907-890-1234",
        address: "34 Allen Avenue, Ikeja",
        gas_types: [1], // LPG only
        price_per_kg: {
            LPG: 495
        },
        delivery_areas: ["Ikeja", "Allen Avenue", "Maryland", "Ojodu"],
        rating: 4.3,
        total_orders: 320,
        status: "inactive",
        created_at: "2024-05-01T08:30:00Z"
    },
    {
        id: 8,
        name: "Metro Gas Supplies",
        email: "metro@metrogas.com",
        phone_number: "+234-908-901-2345",
        address: "19 Broad Street, Marina",
        gas_types: [1, 2], // LPG and CNG
        price_per_kg: {
            LPG: 505,
            CNG: 485
        },
        delivery_areas: ["Marina", "Lagos Island", "Victoria Island"],
        rating: 4.6,
        total_orders: 950,
        status: "suspended",
        created_at: "2024-02-14T12:00:00Z"
    }
];