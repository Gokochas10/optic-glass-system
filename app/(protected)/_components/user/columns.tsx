"use client"

import { useState } from "react";
import { Client } from "@/types/user/client-types";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { toast } from "sonner";
import { MdEdit, MdMedicalInformation } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { ClientEditForm } from "@/components/user/client-edit-form";
import MedRecordModal from "@/components/user/med-record-modal";

// Componente para la celda de acciones
export const ActionsCell = ({
  client,
  refreshData
}: {
  client: Client,
  refreshData?: () => Promise<void>
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [watchMedicalRecord, setWatchMedicalRecord] = useState(false);

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleWatchMedicalReport = () => {
    setWatchMedicalRecord(true);
  }

  const handleEditSuccess = async () => {
    setEditDialogOpen(false);
    toast.success("Cliente actualizado con éxito");

    // Refrescar los datos después de la actualización
    if (refreshData) {
      try {
        await refreshData();
        console.log("✅ Datos refrescados después de la actualización");
      } catch (error) {
        console.error("❌ Error al refrescar datos:", error);
      }
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(client.fullName)}>
            <FaCopy size={20} className="mr-2" />
            Copiar Nombre
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleWatchMedicalReport}><MdMedicalInformation size={20} className="mr-2 text-green-600" />Ver Historial Medico</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}><MdEdit size={20} className="mr-2 text-blue-500" />Editar Cliente</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>Edita solo la edad y ocupación del cliente.</DialogDescription>
          </DialogHeader>
          <ClientEditForm client={client} onSuccess={handleEditSuccess} />
        </DialogContent>
      </Dialog>

      <Dialog open={watchMedicalRecord} onOpenChange={setWatchMedicalRecord}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Historial Medico</DialogTitle>
            <DialogDescription>Historial Medico del Cliente.</DialogDescription>
          </DialogHeader>
          <MedRecordModal clientId={client.id} />
        </DialogContent>
      </Dialog>
    </div>
  );
};