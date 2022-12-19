function initSite() {
    productQuantity()
    getCartProduct()
    console.log("allt funkar")

}

function getCartProduct(){

    let cart = localStorage.getItem("cart")
    
    if(cart) {
        cart = JSON.parse(cart)
    } else{
        cart = []
    }

    let divCartContainer = document.querySelector(".divCartContainer"); divCartContainer.innerHTML = " "

    for (let i = 0; i < cart.length; i++){
        let cartContainer = addCartItemsToWebpage(cart[i]);
    
        divCartContainer.appendChild(cartContainer);
    }
    checkOut(cart)
}


function addCartItemsToWebpage(cartProduct){

        let main = document.getElementsByTagName("main")[0]


        let cartContainer = document.createElement("div");
        cartContainer.classList.add("cartContainer");

        // Container for product image
        let imageCartContainer = document.createElement("div");
        imageCartContainer.classList.add("imgContainer");
        
        let imageCart = document.createElement("img");
        imageCart.classList.add("imageCart")
        imageCart.src = "./assets/" + cartProduct.product.image
        imageCartContainer.append(imageCart)

        // Container for product title
        let titleCartContainer = document.createElement("div");
        titleCartContainer.classList.add("titleContainer");
        let titleCartElement = document.createElement("h2");
        titleCartElement.classList.add("titleCartElement");
        titleCartElement.innerText = cartProduct.product.title

        let productQuantity = document.createElement("h3");
        productQuantity.classList.add("productQuantity");
        //productQuantity.innerText = cartProduct.quantity + " st"

        titleCartContainer.append(titleCartElement, productQuantity)

        // Container for product price
        let priceCartContainer = document.createElement("div");
        priceCartContainer.classList.add("priceCartContainer")
        let priceCartElement = document.createElement("h3");
        priceCartElement.classList.add("priceCartElement");
        priceCartElement.innerText = cartProduct.product.price + " kr"
        
        priceCartContainer.append(priceCartElement)

        // Container for product button
        let buttonCartContainer = document.createElement("div");
        buttonCartContainer.classList.add("buttonCartContainer")
        buttonCartContainer.addEventListener("click", () => {
            removeCartItems(cartProduct);
            
        });
        
        
        let cartTrash = document.createElement("i");
        cartTrash.className = "far fa-trash-alt"
        cartTrash.classList.add("cartTrashsymbol")

        let buttonCartDelete = document.createElement("div");
        buttonCartDelete.innerText = "Ta bort"

        buttonCartContainer.append(cartTrash, buttonCartDelete);

        cartContainer.append(imageCartContainer, titleCartContainer, priceCartContainer, buttonCartContainer)
        //main.appendChild(cartContainer);
        return cartContainer
};


function removeCartItems(cartProduct) {
    
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++){
    if (cartProduct.product.title == cart[i].product.title) {
            cart.splice(i, 1);
        }
    }
    cart = JSON.stringify(cart);
    localStorage.setItem("cart", cart);
    getCartProduct();
    productQuantity();
}

function checkOut(cart){

    let totalValue = 0
    cart.forEach((cartProduct) => {
        totalValue += cartProduct.product.price * cartProduct.quantity
    })

    let cartPrice = document.getElementsByClassName("cartPrice")[0] 
    cartPrice.innerHTML = " "

    let cartTotal = document.createElement("div");
    cartTotal.classList.add("cartTotal");
    cartTotal.innerText = "Totalt pris: " + totalValue + " kr"

    cartPrice.append(cartTotal);

    /*let cartPurchase = document.querySelector(".cartPurchase"); //query?
    let cartPurchaseButton = document.createElement("div");
    cartPurchaseButton.classList.add("cartPurchaseButton");

    let purchaseIcon = document.createElement("i")
    purchaseIcon.className = "fas fa-check"
    purchaseIcon.classList.add("purchaseIcon");*/
    
    cartPurchase = document.getElementsByClassName("cartPurchase")[0]
    cartPurchase.innnerHTML = " "
    cartPurchase.addEventListener("click", () => {
        alert("Tack för ditt köp!")
        localStorage.removeItem("cart")
        window.location = "index.html"
    });
    
     //cartPurchase.append(confirmPurchase) //cartPurchase.append
    //cartTotal.append(cartPurchase)
    /* return cartTotal  behövs en return här?*/
}


function productQuantity(){
    let cartQuantity = document.getElementById("quantity")
    let cart = localStorage.getItem("cart")

    if(cart) { 
        cart = JSON.parse(cart)
    } else {
        cart = [] 
    }

    let totalSum = cart.reduce((ammount, item) => ammount + item.quantity, 0);
    if (totalSum > 0){
        cartQuantity.innerText = totalSum
    } else {
        cartQuantity.style.dispay = "none";
    }

    //cartQuantity.innerText = totalSum
    //sum -> 0, cartQuantity.innerText = totalSum (display.null)
}

