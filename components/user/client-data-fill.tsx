"use client";
import React, { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Search from "../search";
import { Client } from "@/types/user/client-types";
import { getClients } from "@/actions/getClients";

interface InvoiceFormProps {
  onClientData: (data: Client) => void;
  clientData: Client | undefined;
  title: string;
  visualizing?: boolean; // Nueva prop para controlar el modo de visualización
}

const ClientDataFill: React.FC<InvoiceFormProps> = ({
  onClientData,
  clientData,
  title,
  visualizing = false, // Valor por defecto: false
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client>({
    id: "",
    fullName: "",
    address: "",
    phone: "",
    email: "",
    age: 0,
    job: "",
  });

  // Actualiza el estado local y notifica al componente padre
  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    if (visualizing) return; // No permitir cambios en modo de visualización
    const { id, value } = e.target;
    const updatedClient = { ...selectedClient, [id]: value };
    setSelectedClient(updatedClient);
    onClientData(updatedClient); // Notifica al padre con el nuevo estado
  };

  useEffect(() => {
    if (clientData) {
      setSelectedClient(clientData);
    } else {
      setSelectedClient({
        id: "",
        fullName: "",
        address: "",
        phone: "",
        email: "",
        age: 0,
        job: "",
      });
    }
  }, [clientData]);

  const handleClients = async () => {
    const data = await getClients();
    setClients(data as Client[]);
  };

  const onSelectClient = (client: Client) => {
    if (visualizing) return; // No permitir cambios en modo de visualización
    const clientData = {
      id: client.id,
      fullName: client.fullName,
      address: client.address,
      phone: client.phone,
      email: client.email,
      age: client.age,
      job: client.job,
    };
    setSelectedClient(clientData);
    onClientData(clientData);
  };

  useEffect(() => {
    handleClients();
  }, []);

  return (
    <div className="w-full mb-5">
      <div>
        <AlertTitle>{title}</AlertTitle>
        <Search
          onSelectResult={onSelectClient}
          placeholder={`${title} por nombre`}
          type="client"
          disabled={visualizing} // Deshabilitar el Search en modo de visualización
        />
        <div className="p-4 bg-white rounded-md shadow-sm mt-2">
          <div className="flex flex-col space-y-4">
            <div className="flex w-full items-center gap-1.5">
              <Label htmlFor="fullName">Nombres Completos</Label>
              <Input
                id="fullName"
                type="text"
                value={selectedClient.fullName}
                className="flex-1"
                onChange={handleInputChange}
                disabled={visualizing} // Deshabilitar el Input en modo de visualización
              />
            </div>

            <div className="flex w-full items-center gap-1.5">
              <Label htmlFor="email" className="flex-none w-32">
                Correo
              </Label>
              <Input
                id="email"
                type="text"
                value={selectedClient.email}
                className="flex-1"
                onChange={handleInputChange}
                disabled={visualizing} // Deshabilitar el Input en modo de visualización
              />
              <Label htmlFor="age" className="flex-none w-32 ml-4">
                Edad
              </Label>
              <Input
                id="age"
                type="number"
                value={selectedClient.age}
                className="flex-1"
                onChange={handleInputChange}
                disabled={visualizing} // Deshabilitar el Input en modo de visualización
              />
            </div>

            <div className="flex w-full items-center gap-1.5">
              <Label htmlFor="phone" className="flex-none w-32">
                Teléfono
              </Label>
              <Input
                id="phone"
                type="text"
                value={selectedClient.phone || ""}
                className="flex-1"
                onChange={handleInputChange}
                disabled={visualizing} // Deshabilitar el Input en modo de visualización
              />
              <Label htmlFor="email" className="flex-none w-32 ml-4">
                Correo
              </Label>
              <Input
                id="email"
                type="text"
                value={selectedClient.email}
                className="flex-1"
                onChange={handleInputChange}
                disabled={visualizing} // Deshabilitar el Input en modo de visualización
              />
            </div>

            <div className="flex w-full items-center gap-1.5">
              <Label htmlFor="job" className="flex-none w-32">
                Ocupación
              </Label>
              <Input
                id="job"
                type="text"
                value={selectedClient.job || ""}
                className="flex-1"
                onChange={handleInputChange}
                disabled={visualizing} // Deshabilitar el Input en modo de visualización
              />
            </div>

            <div className="flex w-full items-center gap-1.5">
              <Label htmlFor="address" className="flex-none w-32">
                Dirección
              </Label>
              <Input
                id="address"
                type="text"
                value={selectedClient.address || ""}
                className="flex-1"
                onChange={handleInputChange}
                disabled={visualizing} // Deshabilitar el Input en modo de visualización
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDataFill;