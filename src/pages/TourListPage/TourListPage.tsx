import TourTable from '@/features/ToursMain';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Typography, Button, Modal } from 'antd';
import {
  TourCategoryPageWrap,
  TourCategoryHeader,
} from '../TourCategoryPage/TourCategoryPageStyled';
import { useState } from 'react';
const { Title } = Typography;


const TourListPage = () => {
  // const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  // const handleAdd = () => {
  //   setIsOpenAdd(true);
  // };
  // const handleCancel = () => {
  //   setIsOpenAdd(false);
  // };

  // const handleModalClose = (value: boolean): void => {
  //   setIsOpenAdd(value);
  // };
  return (
    <div>
      <TourCategoryPageWrap>
        <TourCategoryHeader>
          <Title level={3}>Danh mục Tour</Title>
          {/* <Button type="primary" onClick={handleAdd}>
            <PlusSquareOutlined />
            Thêm mới Tours
          </Button> */}
        </TourCategoryHeader>
        <TourTable />
      </TourCategoryPageWrap>
    </div>
  );
};

export default TourListPage;
