
import { PlusSquareOutlined } from '@ant-design/icons';
import { Typography, Button, Modal } from 'antd';
import {
  TourCategoryPageWrap,
  TourCategoryHeader,
} from '../TourCategoryPage/TourCategoryPageStyled';
import { useState } from 'react';
import WarnTable from '@/features/WarnsMain/WarnTable';
import WarnForm from '@/features/WarnsMain/WarnForm/WarnForm';
import { IWarnList } from '@/features/WarnsMain/IWarnList';
const { Title } = Typography;

const WarnListPage = () => {
  const [openAdd, setIsOpenAdd] = useState<boolean>(false);
  const handleAdd = () => { setIsOpenAdd(true); };
  const handleCancel = () => { setIsOpenAdd(false) };
  const handleModalClose = (value: boolean): void => {
    setIsOpenAdd(value);
  }

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
          <Title level={3}>Danh mục Lưu ý</Title>
          <Button type="primary" onClick={handleAdd} >
            <PlusSquareOutlined />
            Thêm mới Lưu ý
          </Button>
          <Modal open={openAdd} onCancel={handleCancel} footer={null}>
            <WarnForm callback={handleModalClose} ></WarnForm>
          </Modal>
        </TourCategoryHeader>
        <WarnTable />
      </TourCategoryPageWrap>
    </div>
  );
};

export default WarnListPage;
