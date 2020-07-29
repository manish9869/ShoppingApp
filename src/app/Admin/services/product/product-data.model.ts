export interface ProductData {
  _id: string;
  categoryId: string;
  subcategoryId: string;
  productName: string;
  productDescription: string;
  keywords: string;
  productMRPrice: string;
  productSellingPrice: string;
  Flavor: string;
  Weight: string;
  ISCODAvailable: boolean;
  image: Array<string>;
  IsActive: boolean;
  EnteredBy: string;
  WhenEntered: Date;
  ModifiedBy: string;
  WhenModified: Date;
}
