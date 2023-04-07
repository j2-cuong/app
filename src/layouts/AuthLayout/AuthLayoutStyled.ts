import styled from 'styled-components';
import commonStore from '@/stores/commonStore';
const {appTheme} = commonStore;

export const AuthLayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  flex-direction: column;
  height: calc(100vh - 100px);
`;
export const AuthFormWrapper = styled.div`
  width: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FormContent = styled.div`
  max-width: 320px;
  flex: 1;
`

export const AuthLayoutHeader =  styled.div`
  width: 100%;
  height: 64px;
  text-align: left;
  border-bottom: 1px solid rgba(0,0,0,0.08);
`

export const LogoHeader = styled.figure`
  margin: 0 15px;
  padding: 15px 20px;
  img {
    height: 28px;
    object-fit: cover;
    object-position: 0 0;
  }
`

export const AuthLayoutFooter =  styled.div`
  display: flex;  
  border: 0;
  justify-content: center;
`

export const LinkTag = styled.a`
  color: ${appTheme};
  cursor: pointer;
  text-decoration: none;
`
// export const WelcomeBanner = styled.section`
//   position: relative;
//   width: 50%;
//   background-color: #ab9332;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 64px 112px;

//   svg {
//     position: absolute;
//     opacity: .25;

//     &.circle {
//       inset: 0;
//     }

//     &.dots {
//       top: 0;
//       right: 0;
//       transform: translate(30%, -30%);
//     }
//   }
// `;
// export const WelcomeContent = styled.div`
//   position: relative;
//   z-index: 1;

//   * {
//     color: white;
//     text-shadow: 0 0 10px rgba(0, 0, 0, .2);
//   }

//   h2 {
//     font-size: 48px;
//     line-height: 1.1;
//     font-weight: bold;
//   }

//   p {
//     font-size: 16px;
//     line-height: 1.5;
//   }
// `;
export const FormHeading = styled.h1`
  color: #1e293b;
  font-weight: 500;
  font-size: 30px;
  margin-bottom: 5px;
  text-align: left;
`;