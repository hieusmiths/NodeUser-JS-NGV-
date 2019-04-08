import React, { Component } from 'react';

class ListProduct extends Component {
    render() {
        return (
            <div className="col-3">
                <div className="card border-primary">
                    <img className="card-img-top" src= { this.props.productImg } alt="true" />
                    <div className="card-body">
                    <h4 className="card-title">{ this.props.productName }</h4>
                    <p className="card-text">{ this.props.productPrice }</p>
                    </div>
                </div>
            </div>
);
    }
}

export default ListProduct;