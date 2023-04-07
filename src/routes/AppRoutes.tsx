import React, { FC, lazy } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getPath, privatePaths } from 'router-paths';
import NotFoundPage from '@pages/NotFoundPage';
import LoginPage from '@pages/LoginPage';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import ProtectedRoute from '@routes/ProtectedRoute';
import { MESSAGE_MODAL_VI } from '@/constants/constants';

const history = createBrowserHistory();
const MainRoutes = lazy(() => import('@routes/MainRoutes'));

axios.defaults.timeout = 30000;
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error)
);
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response, code } = error;
    if (response?.status === 401) {
      void message.error('Token expired!');
      localStorage.clear();
      history.push(getPath('login'));
    }
    if (response?.status === 403) {
      void message.error('No permission!');
      return;
    }
    if (response?.status === 408 || code === 'ECONNABORTED') {
      message.config({
        maxCount: 1,
      });
      void message.error('Request timeout!');
      history.push(getPath('login'));
    }
    if (response?.status === 404 || code === 'ERR_BAD_REQUEST') {
      // history.push(getPath('notfound'));
      void message.error(MESSAGE_MODAL_VI.API_NOT_FOUND);
    }
    return Promise.reject(error);
  }
);

const AppRoutes: FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={getPath('login')} component={LoginPage} />
        <ProtectedRoute exact path={privatePaths} component={MainRoutes} />
        <Route path={'*'} component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
