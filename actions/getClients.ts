"use server"

import { db } from "@/lib/db"
import { Client } from "@prisma/client";

export async function getClients () {
    // Use Prisma Client to fetch all clients
    const clients = await db.client.findMany({
        orderBy: {
        createdAt: "desc",
        },
    })
    
    return clients as Client[];
}