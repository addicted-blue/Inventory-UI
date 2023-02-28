import { Category } from "./enums/category.enum";
import { UnitType } from "./enums/unittype.enum";

export interface Product {
    id?: any,
    name: string,
    description?: string,
    category: Category,
    imageUrl: File,
    price: number,
    unit: number,
    unitType: UnitType
}