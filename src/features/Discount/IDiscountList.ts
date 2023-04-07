export interface IDiscountList {
    discountId: string;
    categoryId: string;
    discountMax: string;
    partnerCode: string;
    categoryName: string

}

export interface IDiscountDataset {
  totalNumber : number;
  dataList: IDiscountList[]
  
}