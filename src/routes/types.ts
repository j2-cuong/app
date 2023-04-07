import { RouteProps } from 'react-router-dom';

export type AppRoute = {
  permissionKeys?: string[] //TODO: Should be changed to enum later
} & RouteProps