import React, { Component } from 'react';
import './../App.css';
import Header from './Header';
import ListProduct from './ListProduct';
import axios from 'axios';
import FormAdd from './FormAdd';
// Hằng số này khi thực thi chỉ cần GETDATAPRODUCT() không cần this
  // Make a request for a user with a given ID
  // post yêu cầu bảo mật hơn get 
const GETDATAPRODUCT = () => {
  return  axios.get('/getData')
  .then(function (response) {
    // console.log(response.data);
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
  // Access control allow method node Js.
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data: null,

    }
  }
  
  //Set up dât wiht component will mount.
  
  componentWillMount() {
    // console.log(this.state.data + " cwm");  nó ra null 
    if(!this.state.data){
      GETDATAPRODUCT().then( (response) =>
      {
        if(response !== undefined  || response !== null) {
          
          this.setState({
            data: response,
          })
          
            
          }
        })
      }
    }
    

    updatePrintDataRealTime = (item) =>{
      var dataTemp = [];
      console.log(this.state.data);
        dataTemp = this.state.data;
        console.log(dataTemp);
        if(item.product_name !== ''){
          dataTemp.push(item);
          this.setState({
            data : dataTemp,
          })
        }
        console.log(item);
    }
  
    // !== null && dataOfProduct !== undefined
  printDataProduct = () => {
    var dataOfProduct = this.state.data;
    if(!!dataOfProduct ){ // dataOfProduct !== null && dataOfProduct !== undefined { || là sai vì nó trả về 2 nhưng != thì chạy}
      return (
      dataOfProduct.map((value, key ) =>{
        // console.log(dataOfProduct);
        return (
          <ListProduct 
          key = { key }
          productName = { value.product_name }
          productPrice = { value.product_price }
          productImg = { value.product_img }
          
          >
          </ListProduct>
        );
      })
      );
    }
    else return false;
  }
  


  render() {
    
    
    return (
      <div className="App">
      
        <FormAdd  updatePrintDataRealTime = { (item) => this.updatePrintDataRealTime(item) }/>
        <Header />
        <div className="container-fluid">
          <div className="row">
                { this.printDataProduct() }
            </div>
          </div>
        </div>
    );
  }
}

export default App;
