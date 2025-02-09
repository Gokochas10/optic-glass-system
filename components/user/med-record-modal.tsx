import { getMedRecord } from '@/actions/getMedRecord';
import React from 'react'
import MedRecordItem from './med-record-item';
import { deleteMedRecord } from '@/actions/deleteMedRecord';
import { toast } from 'sonner';

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

    const handleDelete = async (recordId: string) => {
        await deleteMedRecord(recordId);
        const records = await getMedRecord(clientId);
        setMedRecords(records);
        toast.success('Registro médico eliminado');
    }
    
    React.useEffect(() => {
        const fetchMedRecords = async () => {
            const records = await getMedRecord(clientId);
            setMedRecords(records);
        };

        fetchMedRecords();
    }, [clientId]);

    if (medRecords.length === 0) {
        return <p>No hay registros médicos</p>;
    }

    return (
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {medRecords.map((record: MedRecord) => (
                <MedRecordItem key={record.id} {...record} onDelete={handleDelete}/>
            ))}
        </div>
    );
};

export default MedRecordModal;