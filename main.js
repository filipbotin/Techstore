let listOfProducts;

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}

function initSite() {
    loadProducts();
    productQuantity();
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    let main = document.getElementsByTagName("main")[0]

    for (let i = 0; i < listOfProducts.length; i++) {
        let productContainer = createProductContainer(listOfProducts[i]);
        
        main.appendChild(productContainer);
        };
    }

function createProductContainer(product){
    let productContainer = document.createElement("div")
    productContainer.classList.add("productContainer")

//}
        // Container for product title
        let titleContainer = document.createElement("div")
        titleContainer.classList.add("titleCointainer")

        let titleElement = document.createElement("h1")
        titleElement.classList.add("titleElement") 
        titleElement.innerText = product.title
        
        // Container for product description
        let descriptionElement = document.createElement("h3")
        descriptionElement.classList.add("descriptionElement")
        descriptionElement.innerText = product.description

        titleContainer.append(titleElement, descriptionElement)
        
        // Container for product image
        let imageContainer = document.createElement("div")
        imageContainer.classList.add("imgContainer")

        let productImg = document.createElement("img")
        productImg.classList.add("productImg")
        productImg.src = "./assets/" + product.image

        imageContainer.append(productImg)

        // Container for product price
        let priceContainer = document.createElement("div")
        priceContainer.classList.add("priceCointainer")

        let priceElement = document.createElement("h3")

        priceElement.classList.add("price")
        priceElement.innerText = product.price + " kr"

        priceContainer.append(priceElement)

        // Container for product button
       
        let buttonElement = document.createElement("div");
        buttonElement.classList.add("buttonElement")
        buttonElement.addEventListener("click", () => {
            addItemToCart(product)
            buttonElement.style.visibility = "hidden"
        });
        

        let icon = document.createElement("i")
        icon.className = "fas fa-cart-arrow-down"
        icon.classList.add("cartIcon")

        let buttonElementText = document.createElement("div")
        buttonElementText.innerText = "Lägg till i kundvagnen";
        buttonElement.append(icon, buttonElementText);
        
        productContainer.append(titleContainer, imageContainer, priceContainer, buttonElement)
        return productContainer    
    
        }
    

function addItemToCart(product){

    let cart = localStorage.getItem("cart")

    if(cart) { 
        cart = JSON.parse(cart)
    } else {
        cart = [] 
    }
    console.log(cart)
    console.log(product)

    let cartIndex = cart.findIndex((cartItems) => {
        return cartItems.product.title == product.title
    })
    
    if(cartIndex >= 0) {
        cart[cartIndex].quantity++
    } else{
        cart.push({
            product: product, 
            quantity: 1
        })
    }
        
    localStorage.setItem("cart", JSON.stringify(cart))
    productQuantity()
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
}
