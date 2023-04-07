import React, { FC, Suspense, useCallback, useEffect } from 'react';
import { useStore } from '@/store';
import ScrollRestoration from '@components/ScrollRestoration';
import AppRoutes from '@routes/AppRoutes';
import { Detector, PollingConfig } from 'react-detect-offline';
import './global.scss';
/** Ant Design */
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import vi_VN from 'antd/locale/vi_VN';
/** DayJS */
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import updateLocale from 'dayjs/plugin/updateLocale';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

dayjs.locale('vi');
dayjs.extend(updateLocale);
dayjs.updateLocale('vi', {
  weekStart: 1,
});

const App: FC = () => {
  const { commonStore } = useStore();
  const { setTheme } = commonStore;

  const appInitializer = useCallback(() => {
    const currentTheme = localStorage.getItem('appTheme');
    setTheme(currentTheme || '#5522bb');
  }, [setTheme]);

  useEffect(() => {
    appInitializer();
  }, [appInitializer]);

  return (
    <Suspense
      fallback={
        <ScrollRestoration>
          <Spin indicator={antIcon} />
        </ScrollRestoration>
      }>
      <ConfigProvider
        locale={vi_VN}
        theme={{
          token: {
            colorPrimary: commonStore.appTheme,
            borderRadius: 6,
          },
        }}>
        {/* <Detector
          polling={{ interval: 10000, timeout: 20000 } as PollingConfig}
          render={({ online }) => {
            commonStore.checkIsOffline(!online);
            return null;
          }}
        /> */}
        <AppRoutes />
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
