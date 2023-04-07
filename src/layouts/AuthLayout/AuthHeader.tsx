import { AuthLayoutHeader, LogoHeader } from './AuthLayoutStyled';

const AuthHeader = () => {
  return (
    <AuthLayoutHeader>
      <LogoHeader>
        <img
          src={`${process.env.PUBLIC_URL}/assets/imgs/Logometa.png`}
          alt=""
        />
      </LogoHeader>
    </AuthLayoutHeader>
  );
};

export default AuthHeader;
