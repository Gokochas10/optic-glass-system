import { getMedRecord } from '@/actions/getMedRecord';
import React from 'react'
import MedRecordItem from './med-record-item';
import { deleteMedRecord } from '@/actions/deleteMedRecord';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, FilterIcon, X } from 'lucide-react';

interface MedRecordModalProps {
  clientId: string;
}

interface MedRecord {
  id: string;
  reason: string;
  date: Date;
}

const MedRecordModal: React.FC<MedRecordModalProps> = ({ clientId }) => {
  const [medRecords, setMedRecords] = React.useState<MedRecord[]>([]);
  const [allRecords, setAllRecords] = React.useState<MedRecord[]>([]);
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const [isFiltered, setIsFiltered] = React.useState(false);

  const handleDelete = async (recordId: string) => {
    await deleteMedRecord(recordId);
    const records = await getMedRecord(clientId);
    setAllRecords(records);
    setMedRecords(records);
    toast.success('Registro médico eliminado');
  }

  // Función para aplicar el filtro de fechas
  const applyDateFilter = () => {
    if (!startDate && !endDate) {
      setMedRecords(allRecords);
      setIsFiltered(false);
      return;
    }

    const filteredRecords = allRecords.filter(record => {
      const recordDate = new Date(record.date);

      // Normalizar las fechas para comparar solo la fecha (sin hora)
      const recordDateOnly = new Date(recordDate.getFullYear(), recordDate.getMonth(), recordDate.getDate());

      // Crear fechas de comparación normalizadas
      const start = startDate ? new Date(startDate + 'T00:00:00') : null;
      const end = endDate ? new Date(endDate + 'T23:59:59') : null;

      // Para debugging
      console.log('Filtrando registro:', {
        recordDate: recordDate.toISOString(),
        recordDateOnly: recordDateOnly.toISOString(),
        startDate: startDate,
        endDate: endDate,
        start: start?.toISOString(),
        end: end?.toISOString()
      });

      if (start && end) {
        // Incluir registros que sean iguales o estén en el rango
        const isInRange = recordDateOnly >= start && recordDateOnly <= end;
        console.log('Rango completo:', isInRange);
        return isInRange;
      } else if (start) {
        // Incluir registros que sean iguales o posteriores a la fecha de inicio
        const isAfterStart = recordDateOnly >= start;
        console.log('Después de inicio:', isAfterStart);
        return isAfterStart;
      } else if (end) {
        // Incluir registros que sean iguales o anteriores a la fecha de fin
        const isBeforeEnd = recordDateOnly <= end;
        console.log('Antes de fin:', isBeforeEnd);
        return isBeforeEnd;
      }

      return true;
    });

    console.log('Registros filtrados:', filteredRecords.length);
    setMedRecords(filteredRecords);
    setIsFiltered(true);
  };

  // Función para limpiar el filtro
  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setMedRecords(allRecords);
    setIsFiltered(false);
  };

  // Función para formatear fecha para input type="date"
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  React.useEffect(() => {
    const fetchMedRecords = async () => {
      const records = await getMedRecord(clientId);
      setAllRecords(records);
      setMedRecords(records);
    };

    fetchMedRecords();
  }, [clientId]);

  return (
    <div className="space-y-4">
      {/* Filtro de fechas */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <FilterIcon className="h-4 w-4 text-gray-600" />
          <h3 className="font-medium text-gray-900">Filtrar por fechas</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <Label htmlFor="startDate" className="text-sm font-medium">
              Fecha de inicio
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="endDate" className="text-sm font-medium">
              Fecha de fin
            </Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={applyDateFilter}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
            size="sm"
          >
            <CalendarIcon className="h-4 w-4" />
            Aplicar Filtro
          </Button>

          {(isFiltered || startDate || endDate) && (
            <Button
              onClick={clearFilter}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Limpiar
            </Button>
          )}
        </div>

        {isFiltered && (
          <div className="mt-2 text-sm text-gray-600">
            Mostrando {medRecords.length} de {allRecords.length} registros
          </div>
        )}
      </div>

      {/* Lista de registros médicos */}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {medRecords.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {isFiltered ? 'No hay registros en el rango de fechas seleccionado' : 'No hay registros médicos'}
          </div>
        ) : (
          medRecords.map((record: MedRecord) => (
            <MedRecordItem key={record.id} {...record} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default MedRecordModal;