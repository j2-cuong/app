import React, { FC } from 'react';
import { AppRoute } from '@routes/types';
import { Redirect, Route } from 'react-router-dom';
import { getPath } from '@/router-paths';

const ProtectedRoute: FC<AppRoute> = ({ component: Component, permissionKeys, ...args }) => {
  return (
    <Route {...args} render={props => (
      localStorage.getItem('jwt')
        // @ts-ignore
        ? <Component {...props} />
        : (
          <Redirect to={{
            pathname: getPath('login'),
            state: { from: props.location },
          }} />
        )
    )} />
  );
};

export default ProtectedRoute;