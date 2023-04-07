import { useEffect, useState } from 'react';
import HeaderBooking from '../component/headerBooking';
import FooterBooking from '../component/footer';
import './modal.css';
import BodyBooking from '../component/bodyBooking';
import { post, postGetTour, postGetTourById } from '@/services/http';
import { ENDPOINT } from '@/config';
import { ITourData } from '@/pages/Booking/ToursSearch/IBooking';
import {
  SuccessResponseTourById,
} from '@/types/http.type';
import { Spin } from 'antd';

const ModalBooking = (props: any) => {
  const id = props.data;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState<ITourData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const loadDataTour = async (): Promise<void> => {
    setIsLoading(true);
    let json = {
      tourId: id,
    };
    try {
      await postGetTourById<ITourData[]>(
        ENDPOINT.GET_TOUR_BY_ID,
        JSON.stringify(json)
      ).then((res: SuccessResponseTourById<ITourData[]>) => {
        setData(res.data.data);
      });
    } catch (error) {
      setError('Lỗi');
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    loadDataTour();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Spin size="large" />;
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <HeaderBooking data={data} />
      <BodyBooking data={data} />
      <FooterBooking />
    </>
  );
};

export default ModalBooking;
