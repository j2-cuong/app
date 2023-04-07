const publicPathConfig = {
  login: () => '/auth/login',
  // register: () => '/auth/register',
  notfound: () => '/notfound',
};

const privatePathConfig = {
  home: () => '/',
  dashboard: () => '/dashboard',
  tourcategory: () => '/category',
  tourlist: () => '/tour/tour-list',
  addtour: () => '/tour/add-tour',
  edittour: () => '/tour/edit-tour',
  warn:()=> '/system/warn',
  discount:()=> '/system/discount',
  tourssearch:()=> '/booking/tour-search',
  bookingpage:()=> '/booking/booking-page'

};

export const privatePaths = Object.values(privatePathConfig).map(item => item());

const pathsMap = {
  ...publicPathConfig,
  ...privatePathConfig,
};

export type PathsMap = typeof pathsMap;

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCb: (...args: any[]) => string = pathsMap[route];
  return pathCb(...params);
};
