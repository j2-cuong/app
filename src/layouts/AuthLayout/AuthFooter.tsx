import { AuthLayoutFooter, LinkTag } from './AuthLayoutStyled';
import { CopyrightOutlined } from '@ant-design/icons';

const AuthFooter = () => {
  return (
    <AuthLayoutFooter>
      Metatrip&nbsp;
      <CopyrightOutlined />
      &nbsp;2023&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <LinkTag href="https://metatrip.vn">Metatrip</LinkTag>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <LinkTag>Liên hệ</LinkTag>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <LinkTag>Về chúng tôi</LinkTag>
    </AuthLayoutFooter>
  );
};

export default AuthFooter;
