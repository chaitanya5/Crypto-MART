import React,{Component}  from 'react';
import Web3               from 'web3';
import './App.css';
import Navbar             from './Navbar';
//import {Abi,Address}      from './contract_config'
import Main               from './Main';
import Cryptomart from './contracts/Cryptomart.json';

class App extends Component{

  constructor(props){
    super(props)
    this.state={
      web3:null,
      account:'',
      cryptomart:{},
      buyerBalance:0,
      productCount:0,
      sellerBalance:0,
      products:[],
      loading:true
    }
    this.buyProduct = this.buyProduct.bind(this)
  }

  UNSAFE_componentWillMount(){
    document.title = 'Crypto-MART'
    this.loadBlockchainData()
  }

  async loadBlockchainData(){
    //Load Web3
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    //Load Account
    const accounts = await web3.eth.getAccounts()
    //Load Contract
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Cryptomart.networks[networkId];
    const cryptomart = new web3.eth.Contract(Cryptomart.abi,deployedNetwork.address);
    //Get Buyer Balance
    let accountBalance = await web3.eth.getBalance(accounts[0]);
    //Get the total number of products from Contract
    const productCount = await cryptomart.methods.productCount().call()
    //Get Seller Balance from the Contract
    const sellerBalance = await cryptomart.methods.sellerBalance().call()
    // SET all the state variables
    this.setState({
      web3,
      account:accounts[0],
      cryptomart:cryptomart,
      buyerBalance:accountBalance,
      productCount,
      sellerBalance})
    //Append the products one by one using loop to the state   
    for(var i=1;i<=productCount;i++){
      const product = await cryptomart.methods.products(i).call()
      this.setState({products:[...this.state.products,product]})
    }
    //After everything loads,remove the loader
    this.setState({loading:false})
    
  }
  buyProduct(id,cost){
    this.setState({loading:true})
    this.state.cryptomart.methods.buyProduct(id).send({from:this.state.account,value:cost})
    .then('receipt',(receipt)=> {
      this.setState({loading:false})
    }).then((load)=> window.location.reload() )
  }
  render() {
    return (
      <div>
        <Navbar/>
        <p>&nbsp;</p>        
        { 
          this.state.loading
          ? <div className='text-center'><h3>Loading....</h3></div>
          : <Main
              products={this.state.products} 
              buyProduct={this.buyProduct}
              sellerBalance={this.state.sellerBalance} buyerBalance={this.state.buyerBalance}        
            />
        }                
      </div>
    )
  }
}

export default App;
