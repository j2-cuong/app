import React, { FC } from 'react';
import AppHelmet from '@components/Helmet';
import { Button, Result } from 'antd';
import { NotFoundPageWrapper } from '@pages/NotFoundPage/NotFoundPage.styled';
import { useHistory } from 'react-router-dom';
import { getPath } from '@/router-paths';

const NotFoundPage: FC = () => {

  const history = useHistory();

  return (
    <NotFoundPageWrapper>
      <AppHelmet title={'Không tìm thấy trang yêu cầu'} />
      <Result
        status='404'
        title='404'
        subTitle='Xin lỗi, trang bạn tìm kiếm không tồn tại'
        extra={
          <>
            <Button type='default' onClick={() => history.goBack()}>
              Quay lại trang trước
            </Button>
            <Button type='primary' onClick={() => history.push(getPath('dashboard'))}>
              Quay lại trang chủ
            </Button>
          </>
        }
      />
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
