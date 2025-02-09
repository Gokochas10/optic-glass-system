"use client"

import { useState } from "react";
import { Client } from "@/types/user/client-types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
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
import { saveClient } from "@/actions/addClient";
import { ClientForm } from "./client-form";
import { toast } from "sonner";
import DeleteForm from "./delete-form";
import { MdEdit, MdMedicalInformation } from "react-icons/md";
import { FaCopy, FaTrash } from "react-icons/fa";
import MedRecordModal from "./med-record-modal";

// Nuevo componente para la celda de acciones
const ActionsCell = ({ client, refreshData, showToastMessage }: { client: Client, refreshData: () => void, showToastMessage: (message: string, status: "success" | "error") => void }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [watchMedicalRecord, setWatchMedicalRecord] = useState(false);

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleWatchMedicalReport = () => {
    setWatchMedicalRecord(true);
  }

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
          <FaCopy  size={20} className="mr-2" />
            Copiar Nombre
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleWatchMedicalReport}><MdMedicalInformation size={20} className="mr-2 text-green-600"/>Ver Historial Medico</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}><MdEdit size={20} className="mr-2 text-blue-500" />Editar Cliente</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}><FaTrash size={20} className="mr-2 text-red-600" />Eliminar Cliente</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>Edita los detalles del cliente.</DialogDescription>
          </DialogHeader>
          <ClientForm client={client} onSuccess={() => {setEditDialogOpen(false)
            toast.success("Cliente actualizado con éxito")
          }} />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.</DialogDescription>
          </DialogHeader>
          {/* Aquí pasas las props correctamente */}
          <DeleteForm clientId={client.id} setDeleteDialogOpen={setDeleteDialogOpen} />
        </DialogContent>
      </Dialog>

      <Dialog open={watchMedicalRecord} onOpenChange={setWatchMedicalRecord}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Historial Medico</DialogTitle>
            <DialogDescription>Historial Medico del Cliente.</DialogDescription>
          </DialogHeader>
          {/* Aquí pasas las props correctamente */}
          <MedRecordModal clientId={client.id}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};


// Definir las columnas, usando el componente ActionsCell
export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: "Identificador",
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
          refreshData={() => {}}
          showToastMessage={(message, status) => {}}
        />
      );
    },
  },
];
