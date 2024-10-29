let data =[];

let product = document.querySelector('#productName');
let prices = document.querySelector('#price');
let addItems = document.querySelector('#add');
let productCart = document.querySelector('#productList');
let cartList =document.querySelector('#cart');
let total = document.querySelector('#total');
let totalSum=0;

let totalDisplay = document.createElement('div');
totalDisplay.setAttribute('id','total');
cartList.appendChild(totalDisplay);
totalDisplay.innerHTML = `Total=> Rs:${totalSum}`;

function activateButton(){
    document.querySelectorAll('.addLists').forEach((list,idx)=>{
        list.addEventListener('click',(e)=>{
           if (e.target.className === 'incre' && data[idx].items >= 0){
              let addItems=data[idx].items;
              addItems+=1;
              data[idx].items =addItems;
              let sum = parseInt(data[idx].prices);
            //   data[idx].sum +=sum; //for indiviual
              totalSum+=sum;
              updateToUi2();
              updateToUI1();
              
            }

            if(e.target.className === 'decre' && data[idx].items > 0){
                let removeItems=data[idx].items;
                removeItems-=1;
                data[idx].items =removeItems;
                let diff = parseInt(data[idx].prices);
                // data[idx].sum -=sum;
                totalSum-=diff;
                updateToUI1();
                updateToUi2();

            }

            if (data[idx].items === 0) {
                data.splice(idx, 1); // Remove the item from the data array
                updateToUI1(); // Update UI
                updateToUi2(); // Update cart UI
            }

        })

    })

};



function updateToUI1(){
    let productValue='';
    if (data.length === 0) {
        // Display message when no products are added
        productValue = '<h4>No product Added!!</h4>';
    } 
    else{
        data.forEach((listItem)=>{
            productValue+= `
            <div class="addLists">
            <span>${listItem.products}</span>
            <span>${listItem.prices}</span>
            <button class="decre">-</button>
            <span class="addNum">${listItem.items}</span>
            <button class="incre">+</button>
            </div>
            `;
        });
    }
    productCart.innerHTML=productValue;
    activateButton();

};



function updateToUi2(){
    let addToCart='';
    if (data.length === 0) {
        // Display message when no products are added
        addToCart= '<h4>No product Added to the cart!!</h4>';
    }

    else{
        data.forEach((listItem)=>{
            addToCart += `
            <div class="addCarts">
            <span>${listItem.products}</span>
            <span>:- ${listItem.items}</span>
            <span> x</span>
            <span>${listItem.prices}</span>
            </div>
            `;
        });
    }
    cartList.innerHTML=addToCart;
    cartList.appendChild(totalDisplay);
    totalDisplay.innerHTML = `Total=> Rs:${totalSum}`; // Display total sum
    

};

addItems.addEventListener('click',(e)=>{
    e.preventDefault();
    if(product.value === '' || prices.value === ''){
        alert('Please enter the product name before adding');
        return;
    }
    else{
        let obj={
            products : product.value,
            prices : prices.value,
            items: 1,
            // sum:0
        }

        data.push(obj);
        updateToUI1();
        totalSum+=parseInt(prices.value);
        updateToUi2();
        product.value="";
        prices.value="";

    }
    
});




