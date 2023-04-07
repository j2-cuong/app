import React, { FC, PropsWithChildren, useState, useEffect } from 'react';
import { LogoContainer } from '@layouts/MainLayout/MainLayoutStyled';
import MainFooter from './MainFooter';
import {
  BugOutlined,
  DashboardOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  UserOutlined,
  CompassOutlined,
  SettingOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import { Avatar, MenuProps } from 'antd';
import { Dropdown, Menu, Breadcrumb, Layout, theme } from 'antd';
import { useHistory } from 'react-router-dom';
import { getPath } from '@/router-paths';
import { Observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { ENDPOINT } from '@/config';
import { mappingResponseObjToMenuObj } from '@/utils/mapping';
import { post } from '@/services/http';
import { PathsMap } from '@/router-paths';
import { mappingResponseUserToCurrentUser } from '@/utils/mapping';

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const history = useHistory();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();
  //const [menuObject, setMenuObject] = useState<MenuProps['items']>();
  const menuObject = [
    {
      key: '/dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      key: '/category',
      label: 'Danh mục Tour',
      icon: <UnorderedListOutlined />,
    },
    {
      key: '/tour',
      label: 'Tours',
      icon: <CompassOutlined />,
      children: [
        {
          key: '/tour/tour-list',
          label: 'Danh sách Tours',
        },
        {
          key: '/tour/add-tour',
          label: 'Thêm mới Tour',
        },
      ],
    },
    {
      key: '/booking',
      label: 'Booking',
      icon: <CarryOutOutlined />,
      children: [
        {
          key: '/booking/tour-search',
          label: 'Đặt Tour',
        },
        {
          key: '/booking/booking-page',
          label: 'Booking',
        },
      ],
    },
    {
      key: '/system',
      label: 'Cấu hình',
      icon: <SettingOutlined />,
      children: [
        {
          key: '/system/warn',
          label: 'Cấu hình lưu ý',
        },
        {
          key: '/system/discount',
          label: 'Cấu hình chiết khấu',
        },
      ],
    },
    {
      key: '/error',
      label: 'Error',
      danger: true,
      icon: <BugOutlined />,
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      label: `User: ${localStorage.getItem('name')}`,
      key: '-1',
    },
    {
      label: `Role: ${localStorage.getItem('role')}`,
      key: '-2',
    },
    {
      type: 'divider',
    },
    {
      label: 'Chỉnh sửa hồ sơ',
      icon: <UserOutlined />,
      key: '0',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      key: '1',
      danger: true,
    },
  ];

  const onUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      localStorage.clear();
      history.push(getPath('login'));
    }
  };

  const handleClick: MenuProps['onClick'] = e => {
    history.push(e.key);
  };

  // useEffect(() => {
  //   const data = post(ENDPOINT.GET_MENU)
  //   console.log(data)
  //   setMenuObject(mappingResponseObjToMenuObj(data))
  // }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}>
        <LogoContainer>
          <img src={`${process.env.PUBLIC_URL}/assets/imgs/Logo.png`} alt="" />
        </LogoContainer>
        <Menu
          onClick={handleClick}
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={menuObject}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            paddingRight: 20,
            background: '#ffffff',
            textAlign: 'right',
          }}>
          <Dropdown
            menu={{ items: userMenuItems, onClick: onUserMenuClick }}
            placement={'bottomRight'}
            overlayClassName={'user-menu-dropdown'}
            trigger={['click']}>
            <Avatar
              style={{
                background: colorPrimary,
              }}>
              {localStorage.getItem('acronym')}
            </Avatar>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Tours</Breadcrumb.Item>
            <Breadcrumb.Item>Tours list</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 164px)',
              background: colorBgContainer,
              borderRadius: '5px',
            }}>
            {children}
          </div>
        </Content>
        <MainFooter></MainFooter>
      </Layout>
    </Layout>
  );
};

export default React.memo(MainLayout);
