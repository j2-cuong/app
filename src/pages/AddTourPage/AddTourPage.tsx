import TourDataForm from '@/features/tours/components/TourDataForm';
import TourUploadImageForm from '@/features/tours/components/TourUploadImageForm';
import { Typography } from 'antd';
import { useState } from 'react';
import { useResetTourState } from '@/hooks/useResetTourState';
const { Title } = Typography;

const AddTourPage = () => {
  const [showDataPage, setShowDataPage] = useState<boolean>(true);
  const [tourId, setTourId] = useState<string>('');
  const setInitTourState = useResetTourState();

  setInitTourState();
  const dataFormCallback = (param: boolean, id: string) => {
    setShowDataPage(param);
    setTourId(id);
  };

  return (
    <>
      <Title level={3}>Thêm mới Tour</Title>
      {showDataPage ? (
        <TourDataForm dataFormCallback={dataFormCallback} />
      ) : (
        <TourUploadImageForm tourId={tourId} />
      )}
    </>
  );
};

export default AddTourPage;
