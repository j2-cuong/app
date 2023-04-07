import { Button, Form, Input, Tooltip, message } from 'antd';
import { BarcodeOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { TAuthenticationPayload, TLoginResponse } from './types';
import { Observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { ENDPOINT } from '@/config';
import {
  API_DATA_CODE_RESPONSE,
  MESSAGE_MODAL_VI,
} from '@/constants/constants';
import { postLogin } from '@/services/http';
import { useState } from 'react';
import { handleLoginError } from '@/utils/handleError';
import { getPath } from '@/router-paths';

const LoginForm = () => {
  const { commonStore } = useStore();
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (payload: TAuthenticationPayload) => {
    setLoading(true);
    const data = await postLogin(ENDPOINT.LOGIN, payload);
    setLoading(false);
    if (data.code === API_DATA_CODE_RESPONSE.SUCCESS) {
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('name', data.displayName);
      localStorage.setItem('role', data.userRole);
      localStorage.setItem(
        'acronym',
        data.displayName
          .split(' ')
          .map(c => c[0])
          .join('')
          .toString()
          .toUpperCase()
          .slice(0, 2)
      );
      message.success(MESSAGE_MODAL_VI.LOGIN_SUCCESS);
      history.push(getPath('dashboard'));
    } else {
      handleLoginError(data);
    }
  };

  return (
    <Observer>
      {() => {
        const { appTheme } = commonStore;
        return (
          <Form form={form} layout={'vertical'} onFinish={handleLogin}>
            <Form.Item
              name={'partnercode'}
              label={'Mã đại lý'}
              rules={[{ required: true, message: 'Vui lòng nhập mã đại lý!' }]}>
              <Input suffix={<BarcodeOutlined></BarcodeOutlined>} />
            </Form.Item>

            <Form.Item
              name={'username'}
              label={'Tên đăng nhập'}
              rules={[
                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              ]}>
              <Input suffix={<UserOutlined></UserOutlined>} />
            </Form.Item>

            <Form.Item
              name={'password'}
              label={'Mật khẩu'}
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
              <Input.Password />
            </Form.Item>

            {/* <FormRow>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              <Link to={''} style={{ color: appTheme }}>Quên mật khẩu</Link>
            </FormRow> */}

            <Form.Item>
              <Button
                block
                type={'primary'}
                htmlType={'submit'}
                loading={loading}>
                Đăng nhập
              </Button>
            </Form.Item>
            <Tooltip
              placement="bottom"
              title="Vui lòng liên hệ chăm sóc khách hàng để lấy lại mật khẩu">
              <p
                style={{
                  color: appTheme,
                  display: 'inline',
                  cursor: 'pointer',
                }}>
                Quên mật khẩu?
              </p>
            </Tooltip>
          </Form>
        );
      }}
    </Observer>
  );
};

export default LoginForm;
