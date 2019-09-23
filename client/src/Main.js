import React, { Component } from 'react'
import Balance from './Balance';


export class Main extends Component {
    render() {
        return (
            <div className='container'>
                <Balance sellerBalance={this.props.sellerBalance} buyerBalance={this.props.buyerBalance}/>
                &nbsp;
                <table className='table' >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Product Owner</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>                        
                    <tbody>
                    { this.props.products.map((product,key)=>{
                            
                            return(
                                <tr key={key}>
                                    <th scope='row'>{product.id.toString()}</th>
                                    <td>{product.name}</td>
                                    <td>{window.web3.fromWei(product.cost) } Ethers</td>                                        
                                    <td>{product.owner}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            name={product.id}
                                            value={product.cost}
                                            onClick = {e=>{
                                                this.props.buyProduct(e.target.name,e.target.value)
                                            }}
                                        >Buy</button>
                                    </td>                                                                  
                                </tr>
                            )                      
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Main
