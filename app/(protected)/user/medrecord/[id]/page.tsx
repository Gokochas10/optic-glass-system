import { getMedRecordDetail } from '@/actions/getMedRecordDetail';
import VisualizeMedicalRecord from '@/components/user/visualize-medical-record';

interface MedRecordPageProps {
  params: {
    id: string;
  };
}

const MedRecordPage = async ({ params }: MedRecordPageProps) => {
  const { id } = params;

  if (!id) {
    return <div>Loading...</div>;
  }

  const medicalRecord = await getMedRecordDetail(id);

  if (!medicalRecord) {
    return <div>Registro médico no encontrado</div>;
  }

  return (
    <VisualizeMedicalRecord medicalRecord={medicalRecord} />
  );
};

export default MedRecordPage;