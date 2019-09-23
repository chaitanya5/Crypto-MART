import React, { Component } from 'react'


export class Navbar extends Component {
    render() {
        return (
            <div className="container-fluid" >
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Cryptomart</a>
                </nav>
            </div>            
        )
    }
}

export default Navbar;
