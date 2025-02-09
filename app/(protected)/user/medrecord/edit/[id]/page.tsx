import { getMedRecordDetail } from '@/actions/getMedRecordDetail';
import EditMedicalRecord from '@/components/user/edit-medical-record';
import VisualizeMedicalRecord from '@/components/user/visualize-medical-record';

interface MedRecordPageProps {
  params: {
    id: string;
  };
}

const EditMedRecordPage = async ({ params }: MedRecordPageProps) => {
  const { id } = params;

  if (!id) {
    return <div>Loading...</div>;
  }

  const medicalRecord = await getMedRecordDetail(id);

  if (!medicalRecord) {
    return <div>Registro médico no encontrado</div>;
  }

  return (
    <EditMedicalRecord medicalRecord={medicalRecord} medicalRecordId={id} />
  );
};

export default EditMedRecordPage;