import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableFooter,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {IProductsListProps, IProductsListState} from './interface'

export default class ProductsList extends React.Component<IProductsListProps, IProductsListState> {
  state: IProductsListState = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: true,
    deselectOnClickaway: true,
    showCheckboxes: true,
    height: '300px',
    itemName: '',
    itemImage: '',
    itemDimensions: '',
    itemWeight: '',
    itemColor: '',
    itemPrice: '',
    itemError: '',
    multiplyPriceValue: '',
    data: this.props.tableData
  };

  handleAddProduct = () => {
    if (this.state.itemName === '') {
      this.setState({itemError: 'Error: Item name is empty'})
    } else if (this.state.itemImage === '') {
      this.setState({itemError: 'Error: Item image is empty'})
    } else if (this.state.itemDimensions === '') {
      this.setState({itemError: 'Error: Item dimensions are empty'})
    } else if (this.state.itemWeight === '' || (typeof +this.state.itemWeight !== 'number') || isNaN(+this.state.itemWeight)) {
      this.setState({itemError: 'Error: Item weight is incorrect'})
    } else if (this.state.itemColor === '') {
      this.setState({itemError: 'Error: Item color is empty'})
    } else if (this.state.itemPrice === '' || (typeof +this.state.itemPrice !== 'number') || isNaN(+this.state.itemPrice)) {
      this.setState({itemError: 'Error: Item price is incorrect'})
    } else {
      this.setState({
        itemName: '',
        itemImage: '',
        itemDimensions: '',
        itemWeight: '',
        itemColor: '',
        itemPrice: '',
        itemError: ''
      })

      this.props.addProduct({
        name: this.state.itemName,
        image: this.state.itemImage,
        dimensions: this.state.itemDimensions,
        weight: +this.state.itemWeight,
        color: this.state.itemColor,
        price: +this.state.itemPrice
      })
    }
  }

  shouldComponentUpdate(nextProps: any) {
    if (nextProps.tableData.length > this.props.tableData.length) {
      this.setState({data: nextProps.tableData});
    }
    return true;
  }

  handleTextFieldChange = (fieldName: any) => (e: any) => this.setState({[fieldName]: e.target.value})

  handleSort = (sortType: any) => () => {
    // let sortFuncNumDown = (a: any, b: any) => a[sortType] - b[sortType]
    let sortFuncNumDown = (a: any, b: any) => a[sortType] - b[sortType]
    let stringSortDown = (a: any, b: any) => a[sortType].localeCompare(b[sortType])
    // let stringSortDown = (a: any, b: any) => b.attr.localeCompare(a.attr)

    let sortFunc

    switch (sortType) {
      case('name'):
      case('image'):
      case('dimensions'):
      case('color'):
        sortFunc = stringSortDown
        break;

      case('weight'):
      case('price'):
        sortFunc = sortFuncNumDown
        break;
    }

    this.setState({
      data: this.props.tableData.map(el => el).sort(sortFunc)
    })
  }

  handleMultiplyPrice = () => {
    if (this.state.multiplyPriceValue === '' || (typeof +this.state.multiplyPriceValue !== 'number') || isNaN(+this.state.multiplyPriceValue)) {
      this.setState({itemError: 'Error: Price multiply num is incorrect'})
    } else {
      this.setState({
        data: this.props.tableData.map(el => {
          el.price *= (+this.state.multiplyPriceValue)
          return el
        })
      })
    }
  }


  public render() {
    const { data } = this.state


    return (
    <div className="container-fluid">
      <div className="product-list">
        <h2 className="heading">Products dashboard
          {this.state.itemError ? <span className="error">{this.state.itemError}</span> : false}
          {(this.props.tableData.length > 0) ? (<div className="price-multiply">
            <TextField
                className="multiply-textfield"
                hintText="Multiply price(* Num)"
                value={this.state.multiplyPriceValue}
                onChange={this.handleTextFieldChange('multiplyPriceValue')}
            />

            <FlatButton
              className="multiply-button"
              label="Multiply"
              onClick={this.handleMultiplyPrice}
              primary={true} />
          </div>) : false}
        </h2>

        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            className="product-list__header"
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableHeaderColumn>
                <span className="name">ID</span>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span className="name">Name</span>
                <FontIcon className="material-icons" onClick={this.handleSort('name')}>expand_more</FontIcon>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span className="name">Image</span>
                <FontIcon className="material-icons" onClick={this.handleSort('image')}>expand_more</FontIcon>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span className="name">Dimensions</span>
                <FontIcon className="material-icons" onClick={this.handleSort('dimensions')}>expand_more</FontIcon>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span className="name">Weight</span>
                <FontIcon className="material-icons" onClick={this.handleSort('weight')}>expand_more</FontIcon>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span className="name">Color</span>
                <FontIcon className="material-icons" onClick={this.handleSort('color')}>expand_more</FontIcon>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span className="name">Price</span>
                <FontIcon className="material-icons" onClick={this.handleSort('price')}>expand_more</FontIcon>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {data.map( (item, index: number) => (
              <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn><a href={item.image} target="_blank">{item.image}</a></TableRowColumn>
                <TableRowColumn>{item.dimensions}</TableRowColumn>
                <TableRowColumn>{item.weight}</TableRowColumn>
                <TableRowColumn>{item.color}</TableRowColumn>
                <TableRowColumn>{item.price}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            className="product-list__footer"
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>
                <TextField
                  className="product-list__textfield"
                  hintText="Name"
                  value={this.state.itemName}
                  onChange={this.handleTextFieldChange('itemName')}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  className="product-list__textfield"
                  hintText="Image"
                  value={this.state.itemImage}
                  onChange={this.handleTextFieldChange('itemImage')}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  className="product-list__textfield"
                  hintText="Dimensions"
                  value={this.state.itemDimensions}
                  onChange={this.handleTextFieldChange('itemDimensions')}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  className="product-list__textfield"
                  hintText="Weight"
                  value={this.state.itemWeight}
                  onChange={this.handleTextFieldChange('itemWeight')}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  className="product-list__textfield"
                  hintText="Color"
                  value={this.state.itemColor}
                  onChange={this.handleTextFieldChange('itemColor')}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  className="product-list__textfield"
                  hintText="Price"
                  value={this.state.itemPrice}
                  onChange={this.handleTextFieldChange('itemPrice')}
                />
              </TableRowColumn>
              <TableRowColumn>
                <FlatButton
                  className="product-list__submit-button"
                  label="Add product"
                  onClick={this.handleAddProduct}
                  primary={true} />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>)
  }
}