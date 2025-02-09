import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const DeleteForm = ({ clientId, setDeleteDialogOpen }: { clientId: string; setDeleteDialogOpen: (open: boolean) => void }) => {

  const handleConfirmDelete = async (clientId: string) => {
    try {
      // Hacer la solicitud a la API para eliminar el cliente
      const response = await fetch("/api/client", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId }), // Pasamos el id del cliente en el cuerpo de la solicitud
      });

      if (response.ok) {
        console.log("Cliente eliminado con éxito");
        toast.success("Cliente eliminado con éxito");
        setDeleteDialogOpen(false); // Cerrar el diálogo de eliminación
      } else {
        console.error("Error al eliminar el cliente");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud de eliminación:", error);
    }
  };

  return (
    <div className="flex justify-end space-x-2 mt-4">
      <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
        Cancelar
      </Button>
      <Button variant="destructive" onClick={() => { handleConfirmDelete(clientId); }}>
        Eliminar
      </Button>
    </div>
  );
};

export default DeleteForm;
