export interface ITourCategory {
  categoryId: string;
  categoryCode: string;
  categoryName: string;
}

export interface ITourCategoryNullable {
  categoryId?: string;
  categoryCode?: string;
  categoryName?: string;
}

export interface ITourCategoryDataset {
  totalNumber : number;
  dataList: ITourCategory[]
  
}

export interface ITourCategoryDatasetNullable {
  totalNumber : number;
  dataList: ITourCategoryNullable[]
}