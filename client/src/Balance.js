import React, { Component } from 'react'

export class Balance extends Component {
    render() {
        const sellerBalance =window.web3.fromWei(this.props.sellerBalance) 
        const selBal = window.web3.toBigNumber(sellerBalance)
        
        const buyerBalance = window.web3.fromWei(this.props.buyerBalance)
        const buyBal = window.web3.toBigNumber(buyerBalance)

        return (              
            <div className='container'>
                
                <h3 style={sellStyle}>Seller Balance:&nbsp;{selBal.toFixed(4)}</h3>
                <p>&nbsp;</p>                
                <h3 style={buyStyle}>Buyer Balance:&nbsp;{buyBal.toFixed(4)}</h3>
                    
            </div>
            
        )
    }
}
const sellStyle={
    backgroundColor: "green",
    color: "#fff",
    width: "400px",
    padding:"20px"    
}
const buyStyle={
    backgroundColor: "red",
    color: "#fff",
    width: "350px",
    padding: "10px"    
}


export default Balance
