import React, { Component } from 'react';
import axios from 'axios';


const addProduct = (product_name, product_price, product_img) =>(
    axios.post('/add', {product_name, product_price, product_img})
    .then((reponse) =>{
        return reponse.data;
    })
)

// Ở post bị lỗi access allow cho dù có cho phép/
// "proxy" : "http://localhost:4000"
// fix gọi là proxy 

class FormAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name :'',
            product_price : '',
            product_img : '',
            data : this.props.data,
        }
    }
    
    onChange  = (event) =>{
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name] : value
        });
        // console.log(this.state);
    }

    actionOfButtonAdd = () =>{
        // var product_name = this.state.product_name,
        // product_price = this.state.product_price,
        // product_img = this.state.product_img;
        // // or
        var  {product_name , product_price, product_img} = this.state;
        
        var item = {};
        item.product_name = product_name;
        item.product_price = product_price;
        item.product_img = product_img;
        this.props.updatePrintDataRealTime(item);

        addProduct(product_name, product_price, product_img).then((response) =>{
            console.log(response);
        })
        
    }

    // khi xử lý add cần xử lý trên React cho nhẹ Sever.
    // Không cần gọi API get data về vì nó đã add rồi.


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="form-group">
                    <form action="/add" method="POST">
                        <small id="helpId" className="text-muted">Tên</small>
                        <input onChange= { (event) => this.onChange(event) } type="text" name="product_name" id="product_name" className="form-control"/>
                        <small id="helpId" className="text-muted">Giá</small>
                        <input onChange= { (event) => this.onChange(event) } type="text" name="product_price" id="product_price" className="form-control"  aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Ảnh</small>
                        <input onChange= { (event) => this.onChange(event) } type="text" name="product_img" id="product_img" className="form-control"  aria-describedby="helpId" />
                        <button onClick={ () => this.actionOfButtonAdd() } type="reset"> Send </button>
                    </form> 
                    </div>
                </div>
            </div>

        );
    }
}

export default FormAdd;