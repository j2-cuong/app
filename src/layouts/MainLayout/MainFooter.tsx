import { LinkTag } from '../AuthLayout/AuthLayoutStyled';
import { CopyrightOutlined } from '@ant-design/icons';
import {
  BrandSection,
  InfoSection,
  MainLayoutFooter,
} from './MainLayoutStyled';
const MainFooter = () => {
  return (
    <MainLayoutFooter>
      <BrandSection>
        <img
          src={`${process.env.PUBLIC_URL}/assets/imgs/Logometa.png`}
          alt=""
        />
      </BrandSection>
      <InfoSection>
        Copyright&nbsp;
        <CopyrightOutlined />
        &nbsp;2023&nbsp;|&nbsp;
        <LinkTag href="https://metatrip.vn">Metatrip</LinkTag>&nbsp;|&nbsp;
        <LinkTag>Chính sách và quyền riêng tư</LinkTag>
      </InfoSection>
    </MainLayoutFooter>
  );
};

export default MainFooter;
