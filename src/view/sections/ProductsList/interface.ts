import {IProduct} from '_pages/HomePage/interface'

export interface IProductsListProps {
  tableData: IProduct[];
  addProduct: any;
}

export interface IProductsListState {
  fixedHeader: boolean;
  fixedFooter: boolean;
  stripedRows: boolean;
  showRowHover: boolean;
  selectable: boolean;
  multiSelectable: boolean;
  deselectOnClickaway: boolean;
  showCheckboxes: boolean;
  height: string;
  itemName: string;
  itemImage: string;
  itemDimensions: string;
  itemWeight: string;
  itemColor: string;
  itemPrice: string;
  itemError: string;
  multiplyPriceValue: string;
  data: IProduct[];
}