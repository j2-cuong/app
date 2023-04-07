import styled from 'styled-components';

export const MainLayoutWrapper = styled.div`
  display: flex;
`;
export const MainSidebarWrapper = styled.aside`
  width: 280px;
  background-color: #0f172a;
  height: 100%;
  padding: 16px 0 24px;
  min-height: 500px;
`
export const MainPageContentWrapper = styled.main`
  width: calc(100% - 280px);
`
export const LogoContainer = styled.figure`
  margin: 0 15px;
  padding: 15px calc(50% - 45px);
  img {
    width: 60px;
    height: 35px;
    object-fit: cover;
    object-position: 0 0;
  }
`

export const TopSidebarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 150px;
`
export const UserAvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, .2);
  }

  .anticon {
    color: #94a3b8;
    font-size: 20px;
  }
`

export const MainLayoutFooter =  styled.div`
  margin: 10px 15px;
`

export const InfoSection = styled.div`
  padding: 0 20px;
`

export const BrandSection = styled.figure`
  margin: 0;
  padding: 5px 20px;
  img {
    height: 22px;
    object-fit: cover;
    object-position: 0 0;
  }
`