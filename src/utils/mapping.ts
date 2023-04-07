import { IOption, IMenuObject } from "@/types/common.type";
import { IDestination } from "@/types/tour.type";
import { ITourCategoryDataset } from "@/types/tourcategory.type"
import { ICurrentUser } from "@/types/user.type";

export interface TreeNode {
  value: string;
  label: string;
  children?: TreeNode[];
}

interface IDestinationArrayResponse {
    code : string,
    nameVi : string,
    parentCode: string,
    type: string,
}

interface ISelectWithGroup {
    label: string,
    value?: string,
    options?: ISelectWithGroup[]
}

export const mappingDestinationToGroupSelect = (arr : IDestinationArrayResponse[]) : ISelectWithGroup[] => {
    const map = new Map<string, ISelectWithGroup>();
    const roots: ISelectWithGroup[] = [];

    for(const option of arr){
        const {code, nameVi, parentCode, type} = option;
        const selectOption : ISelectWithGroup = {label: nameVi}
        map.set(code, selectOption);

        if((!parentCode && type === 'CONTINENT') || (type === 'AREA')){
            roots.push(selectOption)
        } else {
            const parentNode = map.get(parentCode);
            if(parentNode){
                if(!parentNode.options){
                    parentNode.options = [];
                }
                parentNode.options.push({...selectOption, value: code})
            }
        }
    }
    return roots;
} 

export const mappingDestinationToTree = (arr: IDestinationArrayResponse[]): TreeNode[] => {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const node of arr) {
    const { code, nameVi, parentCode, type } = node;
    const treeNode: TreeNode = { value: code, label: nameVi };
    map.set(code, treeNode);

    if (!parentCode) {
      roots.push(treeNode);
    } else {
      const parentNode = map.get(parentCode);
      if (parentNode) {
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(treeNode);
      }
    }
  }

  return roots;
}

export const mappingResponseObjToMenuObj = (responseArr : any) : IMenuObject[]=> {
    const menuObject:IMenuObject[] = [];
    for (let i = responseArr.length - 1; i >=0 ; i--) {
        const menuObj:IMenuObject = {
            label : responseArr[i].navName,
            key : responseArr[i].idPage,
            //icon: ("<" + responseArr[i]?.iconName + "/>") as React.ReactNode,
            type: responseArr[i]?.parentGroup,
        }
        
        if (responseArr[i].children.length > 0) {
            menuObj.children = mappingResponseObjToMenuObj(responseArr[i].children)
        }
        menuObject.push(menuObj)
    }
    return menuObject;
}

export const mappingResponseUserToCurrentUser = (responseObj : any) : ICurrentUser => {
    const currentUser : ICurrentUser = {
        account : responseObj.account,
        displayName : responseObj.displayName,
        userRole : responseObj.userRole
    }

    return currentUser;
}

export const mappingResponseCategoryToOption = (responseObj : ITourCategoryDataset) : IOption[] => {
    const options : IOption[] = [];
    for (let i = responseObj.dataList.length - 1; i >= 0 ;i--){
        const option : IOption = {
            value: responseObj.dataList[i].categoryId,
            label: responseObj.dataList[i].categoryName,
        }
        options.push(option)
    }
    return options;
}

export const mappingResponseDestinationToOption = (arr : IDestination[]) : IOption[] => {
    const options : IOption[] = [];
    for (let i = arr.length - 1; i >= 0 ; i--){
        const option: IOption = {
            value :  arr[i].code,
            label : arr[i].nameVi,
        }
        options.push(option)
    }
    return options;
}