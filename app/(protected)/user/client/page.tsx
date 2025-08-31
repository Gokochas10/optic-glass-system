"use client"
import { getClients } from "@/actions/getClients"
import { ClientTable } from "@/components/user/client-table"
import { Client } from "@/types/user/client-types"
import { useCallback, useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { ActionsCell } from "@/app/(protected)/_components/user/columns"

export default function DemoPage() {
  const [clients, setClients] = useState<Client[]>([])

  const fetchClients = useCallback(async () => {
    try {
      const data = await getClients()
      setClients(data as Client[])
      console.log("✅ Datos de clientes actualizados")
    } catch (error) {
      console.error("❌ Error al obtener clientes:", error)
    }
  }, [])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  // Definir las columnas con la función de refresh
  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "ruc",
      header: "RUC",
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nombres Completos
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Correo",
    },
    {
      accessorKey: "age",
      header: "Edad",
    },
    {
      accessorKey: "phone",
      header: "Telefono",
    },
    {
      accessorKey: "job",
      header: "Ocupacion",
    },
    {
      accessorKey: "address",
      header: "Direccion",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const client = row.original;
        return (
          <ActionsCell
            client={client}
            refreshData={fetchClients}
          />
        );
      },
    },
  ];

  return (
    <div className="w-full max-w-[1200px]">
      <ClientTable columns={columns} data={clients} />
    </div>
  )
}
