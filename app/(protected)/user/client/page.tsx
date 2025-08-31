"use client"
import { getClients } from "@/actions/getClients"
import { ClientTable } from "@/components/user/client-table"
import { columns } from "@/components/user/columns"
import { Client } from "@/types/user/client-types"
import { useEffect, useState } from "react"

export default function DemoPage() {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const fetchClients = async () => {
      const data = await getClients()
      setClients(data as Client[])
    }
    fetchClients()
  }, [])

  return (
    <div className="w-full max-w-[1200px]">
      <ClientTable columns={columns} data={clients} />
    </div>
  )
}
