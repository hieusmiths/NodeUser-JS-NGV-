import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="container-fluid">
                <section>
                    <div className="jumbotron text-center p-2">
                    <h1 className="display-5">Quản Lý Nhân Sự</h1>
                    <hr className="my-1" />
                    <p className="lead">Dữ Liệu Json</p>
                    </div>
                </section>
            </div>

        );
    }
}

export default Header;