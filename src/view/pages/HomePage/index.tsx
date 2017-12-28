import React from 'react'
import {connect} from 'react-redux'
import {IHomePageProps} from './interface'
import {addProduct, productsListSelector} from '../../../ducks/productsList'
import ProductList from '_sections/ProductsList'
import ScrollToTopOnMount from '_components/ScrollToTopOnMount'


 class HomePage extends React.Component<IHomePageProps, {}> {
  public render() {
    const { addProduct, productsList } = this.props


    return [
      <ScrollToTopOnMount key="ScrollToTopOnMount"/>,
      <div className="container-fluid" key="ProductList">
        <ProductList
          tableData={productsList}
          addProduct={addProduct}
        />
      </div>
    ]
  }
}

export default connect((state) => ({
  productsList: productsListSelector(state),
}), {addProduct})(HomePage as any)