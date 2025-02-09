"use server"
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Manejar POST (Crear un cliente)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newClient = await db.client.create({
      data: body, // Asegúrate de enviar los datos correctos desde el frontend
    });

    return NextResponse.json({ message: "Cliente creado con éxito", newClient }, { status: 201 });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return NextResponse.json({ error: "Error al crear el cliente" }, { status: 500 });
  }
}

// Manejar DELETE (Eliminar un cliente)
export async function DELETE(req: NextRequest) {
  try {
    const { clientId } = await req.json();

    const deletedClient = await db.client.delete({
      where: { id: clientId },
    });

    return NextResponse.json({ message: "Cliente eliminado con éxito", deletedClient });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return NextResponse.json({ error: "Error al eliminar el cliente" }, { status: 500 });
  }
}

// Manejar GET (Obtener clientes)
export async function GET() {
  try {
    const clients = await db.client.findMany();
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return NextResponse.json({ error: "Error al obtener los clientes" }, { status: 500 });
  }
}
