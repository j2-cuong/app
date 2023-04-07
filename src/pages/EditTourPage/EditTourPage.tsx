import { Button, Typography } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { EditTourHeader } from './EditTourPageStyled';
import { useStore } from '@/store';
import { useState } from 'react';
import TourDataForm from '@/features/tours/components/TourDataForm';
import { useHistory } from 'react-router-dom';
import { getPath } from '@/router-paths';
import { initTourData } from '@/constants/initdata';
import TourEditImageForm from '@/features/tours/components/TourEditImageForm';
import { useResetTourState } from '@/hooks/useResetTourState';

const { Title } = Typography;

const EditTourPage = () => {
  const [showDataPage, setShowDataPage] = useState<boolean>(true);
  const [tourId, setTourId] = useState<string>('');
  const history = useHistory();
  const { tourStore } = useStore();
  const { tourData } = tourStore;
  const setInitTourState = useResetTourState();

  const dataFormCallback = (param: boolean, id: string) => {
    setShowDataPage(param);
    setTourId(id);
  };

  const backToTourList = () => {
    history.push(getPath('tourlist'));
    setInitTourState();
  };

  if (!tourData) {
    console.log(tourData);
    console.log('no data for edit tour');
  }

  return (
    <>
      <EditTourHeader>
        <Title level={3}>Chỉnh sửa Tour</Title>
        <Button type="primary" onClick={backToTourList}>
          <RollbackOutlined />
          Quay lại danh sách tour
        </Button>
      </EditTourHeader>
      {showDataPage ? (
        <TourDataForm dataFormCallback={dataFormCallback} />
      ) : (
        <TourEditImageForm tourId={tourId} />
      )}
    </>
  );
};

export default EditTourPage;
