export const config = {
  mode: process.env.NODE_ENV || 'development',
  appName: process.env.REACT_APP_NAME || 'METATRIP',
  apiUrl: process.env.REACT_APP_API_URL,
} as const

export const ENDPOINT = {
  LOGIN: '/Login/LoginEco',
  GET_MENU: '/Login/GetMenu',
  GET_ALL_CATEGORY: '/TourCategory/Search',
  CREATE_CATEGORY: '/TourCategory/Create',
  UPDATE_CATEGORY: '/TourCategory/Update',
  DELETE_CATEGORY: '/TourCategory/Delete',

  GET_ALL_DESTINATION: '/DestinationCategory/GetAll',
  GET_DESTINATION_BY_TOURID: '/TourDestination/GetAllByTourId',

  GET_ALL_TOURS: '/Tour/GetAll',
  SEARCH_TOUR: '/Tour/Search',
  GET_TOUR_BY_ID: '/Tour/GetById',
  CREATE_TOUR: '/Tour/Create',
  UPDATE_TOUR: '/Tour/Update',
  DELETE_TOUR: '/Tour/Delete',

  UPLOAD_IMG: '/IMG/UploadImageAsync',
  GET_IMG: '/IMG/GetImageAsync',
  // CREATE_DISCOUNT: '/TourCategory/Create',
  // UPDATE_DISCOUNT: '/TourCategory/Update',
  // DELETE_DISCOUNT: '/TourCategory/Delete',

  GET_TOUR_DETAIL_BY_TOURID: '/TourDetail/GetByTourId',

  GET_DISCOUNT:'/TourCategoryDiscount/Search',
  GETBYTOURCATEGORYID_DISCOUNT:'/TourCategoryDiscount/GetByTourCategoryId',
  CREATE_DISCOUNT:'/TourCategoryDiscount/Create',
  UPDATE_DISCOUNT:'/TourCategoryDiscount/Update',
  DELETE_DISCOUNT:'/TourCategoryDiscount/Delete',
  
  CREATE_WARN : '/Warn/Create',
  UPDATE_WARN : '/Warn/Update',
  SEARCH_WARN : '/Warn/GetAll',
  DELETE_WARN : '/Warn/Delete',

  ToursSearchInBooking : '/Tour/SearchInBooking',
  DestinationCategory :'/DestinationCategory/GetAll'

} as const
