
import { PlusSquareOutlined } from '@ant-design/icons';
import { Typography, Button, Modal } from 'antd';
import {
  TourCategoryPageWrap,
  TourCategoryHeader,
} from '../TourCategoryPage/TourCategoryPageStyled';
import { useState } from 'react';
import DiscountForm from '@/features/Discount/DiscountForm';
import DiscountTable from '@/features/Discount/DiscountTable';

const { Title } = Typography;

const DiscountListPage = () => {
  const [openAdd,setIsOpenAdd] = useState<boolean>(false);
  const handleAdd = () =>{setIsOpenAdd(true);};
  const handleCancel = () => {setIsOpenAdd(false)};
  const handleModalClose =   (value: boolean): void =>{
    setIsOpenAdd(value);
  }
  return (
    <div>
      <TourCategoryPageWrap>
        <TourCategoryHeader>
          <Title level={3}>Danh mục chiết khấu</Title>
          <Button type="primary" onClick={handleAdd} >
            <PlusSquareOutlined />
            Thêm mới chiết khấu
          </Button>
          <Modal open={openAdd} onCancel={handleCancel} footer={null}>
            <DiscountForm callback = {handleModalClose}></DiscountForm>
          </Modal>
        </TourCategoryHeader>
        <DiscountTable />
      </TourCategoryPageWrap>
    </div>
  );
};

export default DiscountListPage;
