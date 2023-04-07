import { ITourDetails } from "./tour.type"

export interface IOption {
    value?: string,
    label: string,
    disabled?: boolean,
    options?: IOption[]
}

export interface IMenuObject {
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: IMenuObject[],
    type?: 'group',
}