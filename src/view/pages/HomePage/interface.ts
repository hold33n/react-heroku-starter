export interface IProduct {
  name: string;
  image: string;
  dimensions: string;
  weight: number;
  color: string
  price: number;
}

export interface IHomePageProps {
  productsList: IProduct[];
  addProduct: void;
}