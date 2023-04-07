import React, { FC, lazy } from 'react';
import { Switch } from 'react-router-dom';
import { getPath } from '@/router-paths';
import { AppRoute } from '@routes/types';
import ProtectedRoute from '@routes/ProtectedRoute';
import MainLayout from '@layouts/MainLayout';

const routes: AppRoute[] = [
  {
    path: [getPath('dashboard'), getPath('home')],
    component: lazy(() => import('@pages/DashboardPage')),
  },
  {
    path: [getPath('tourcategory')],
    component: lazy(() => import('@pages/TourCategoryPage')),
  },
  {
    path: [getPath('tourlist')],
    component: lazy(() => import('@pages/TourListPage')),
  },
  {
    path: [getPath('addtour')],
    component: lazy(() => import('@pages/AddTourPage')),
  },
  {
    path: [getPath('edittour')],
    component: lazy(() => import('@pages/EditTourPage')),
  },
  {
    path: [getPath('warn')],
    component: lazy(() => import('@pages/WarnPage')),
  },
  {
    path: [getPath('discount')],
    component: lazy(() => import('@pages/DiscountPage')),
  },
  {
    path: [getPath('tourssearch')],
    component: lazy(() => import('@pages/Booking/ToursSearch')),
  },
  {
    path: [getPath('bookingpage')],
    component: lazy(() => import('@pages/Booking/BookingPage')),
  },
  
];

const MainRoutes: FC = () => {
  return (
    <MainLayout>
      <Switch>
        {routes.map((route, index) => (
          <ProtectedRoute
            exact
            key={index}
            component={route.component}
            path={route.path}
            permissionKeys={route.permissionKeys}
          />
        ))}
      </Switch>
    </MainLayout>
  );
};

export default MainRoutes;
