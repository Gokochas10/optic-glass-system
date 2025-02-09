import React, { useState } from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Iconos de React Icons
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface MedRecord {
  id: string;
  reason: string;
  date: Date;
}

interface MedRecordItemProps extends MedRecord {
  onDelete: (recordId: string) => Promise<void>; // Función para eliminar el registro
}

const MedRecordItem: React.FC<MedRecordItemProps> = ({ id, reason, date, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar el modal
  const [isDeleting, setIsDeleting] = useState(false); // Estado para manejar el loading durante la eliminación
  const router = useRouter();

  const formattedDate = format(new Date(date), "dd/MM/yyyy");

  // Función para manejar la eliminación del registro
  const handleDelete = async () => {
    setIsDeleting(true); // Activar el estado de "cargando"
    try {
      await onDelete(id); // Llamar a la función de eliminación
      setIsDeleteModalOpen(false); // Cerrar el modal después de eliminar
    } catch (error) {
      console.error("Error eliminando el registro:", error);
    } finally {
      setIsDeleting(false); // Desactivar el estado de "cargando"
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow mb-5">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Registro Médico</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <strong className="text-gray-700">ID:</strong>{" "}
            <span className="text-gray-900">{id}</span>
          </p>
          <p className="text-sm">
            <strong className="text-gray-700">Motivo:</strong>{" "}
            <span className="text-gray-900">{reason}</span>
          </p>
          <p className="text-sm">
            <strong className="text-gray-700">Fecha:</strong>{" "}
            <span className="text-gray-900">{formattedDate}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Button onClick={()=> router.push(`/user/medrecord/${id}`)} className="flex items-center bg-blue-500 hover:bg-blue-600">
          <FaEye className="mr-2" />
          Ver Detalles
        </Button>
        <Button onClick={()=> router.push(`/user/medrecord/edit/${id}`)} className="flex items-center bg-green-500 hover:bg-green-600">
          <FaEdit className="mr-2" />
          Editar
        </Button>

        {/* Botón para abrir el modal de eliminación */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogTrigger asChild>
            <Button color="#ff0000" className="flex items-center hover:bg-red-600">
              <FaTrash className="mr-2" />
              Eliminar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Estás seguro de eliminar este registro?</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer. El registro se eliminará permanentemente.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)} // Cerrar el modal
              >
                Cancelar
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={handleDelete} // Llamar a la función de eliminación
                disabled={isDeleting} // Deshabilitar el botón durante la eliminación
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default MedRecordItem;