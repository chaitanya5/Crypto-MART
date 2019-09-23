pragma solidity >0.4.25;

contract Cryptomart{

    address payable public seller;
    uint256 public sellerBalance;
    address public buyer;
    uint public productCount=0;
    mapping(uint=>Product) public products;

    struct Product{
        uint id;
        string name;
        uint256 cost;
        address payable owner;
        bool purchase;
    }
    event buyedProduct(
        uint id,
        address payable owner,
        bool purchase
    );
    constructor()public{
        seller = msg.sender;
        sellerBalance = address(seller).balance;
        addProduct(10 ether,'Laptop');
        addProduct(3 ether,'Headphone');
        addProduct(8 ether,'Led');
        addProduct(2 ether,'Keyboard');
    }
    function addProduct(uint _cost,string memory _name)private{
        productCount++;
        products[productCount] = Product(productCount,_name,_cost,seller,false);
    }
    function buyProduct(uint _id)public payable{

        //Fetch the product
        Product memory _product = products[_id];
        //Seller should exist
        require(seller!=address(0),'Seller doesnt exist');
        //require(_product.purchase == false,'Products can be bought only once');
        require(msg.sender!=seller,'Seller and buyer cant be same');
        require(msg.value == products[_id].cost,'Buyer should buy with correct amount');
        //Mark as purchased
        _product.purchase = true;
        //Transfer the ownership
        _product.owner = msg.sender;
        //Update the product
        products[_id] = _product;
        //Pay the seller by sending ether
        address(seller).transfer(msg.value);
        //Get the seller sellerBalance
        sellerBalance = address(seller).balance;
        //Trigger an event
        emit buyedProduct(_id,_product.owner,true);
    }
}
