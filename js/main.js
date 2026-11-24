let form = document.forms[0];
form.addEventListener("submit",function(event){
    event.preventDefault();
})

let title = document.querySelector(`[name="title"]`);
let price = document.querySelector(`[name="price"]`);
let taxes = document.querySelector(`[name="taxes"]`);
let ads =   document.querySelector(`[name="ads"]`);
let discount = document.querySelector(`[name="discount"]`);
let span = document.querySelector("span");
let count = document.querySelector(`[name="count"]`);
let category = document.querySelector(`[name="category"]`);
let btnCreate = document.querySelector(`.create`);
let search = document.querySelector(`[name="Search"]`);
let searchByTitle = document.querySelector(`.ser button:first-child`);
let searchByCatgory = document.querySelector(`.ser button:last-child`);
let btnDeleAll = document.querySelector(`section > button`);
let tbody = document.querySelector("tbody");
let arr ;
// function check data to arr  
let data = localStorage.getItem("arr");
if(data){
    arr = JSON.parse(data);
}else{
    arr = [];
};

// calling function
createElement();


//delete all btn count

setInterval(delALLCount,1);

function delALLCount(){
    if(arr.length !== 0){
        btnDeleAll.textContent = `Delete All(${arr.length})`;
    }else{
        btnDeleAll.textContent = `Delete All`;
    }
}   

//btn click
btnCreate.onclick = createData;

// data to local
function createData(){
    const titleValue = title.value.trim();
    const categoryValue = category.value.trim();
    const priceValue = Number(price.value);
    const taxesValue = Number(taxes.value);
    const adsValue = Number(ads.value);
    const discountValue = discount.value.trim() === "" ? 0 : Number(discount.value);
    const countValue = count.value === "" ? null : Number(count.value);

    let validationMessage = "";
    if(!titleValue){
        validationMessage = "Title is required.";
    }else if(!categoryValue){
        validationMessage = "Category is required.";
    }else if(price.value.trim() === "" || !Number.isFinite(priceValue) || priceValue <= 0){
        validationMessage = "Price must be a number greater than 0.";
    }else if(taxes.value.trim() === "" || !Number.isFinite(taxesValue) || taxesValue < 0){
        validationMessage = "Taxes must be a non-negative number.";
    }else if(ads.value.trim() === "" || !Number.isFinite(adsValue) || adsValue < 0){
        validationMessage = "Ads must be a non-negative number.";
    }else if(!Number.isFinite(discountValue) || discountValue < 0){
        validationMessage = "Discount must be a non-negative number.";
    }else if(countValue !== null && (!Number.isInteger(countValue) || countValue <= 0)){
        validationMessage = "Count must be a positive integer.";
    }

    if(validationMessage){
        alert(validationMessage);
        return;
    }

    title.value = titleValue;
    category.value = categoryValue;
    if(discount.value.trim() === ""){
        discount.value = "0";
    }

    if(countValue === null){
        dataToarr();
    }else{
        for(let i = 0; i < countValue; i++){
            dataToarr();
        }
    }
    clear();
}



//fun Collection process tpo ruselt total
function Collection(){
    let total = +price.value + +taxes.value + +ads.value - +discount.value;
    if(price.value&&taxes.value&&ads.value){
        span.innerHTML = `Total:${total}`; 
        span.style.cssText = "background-color: rgb(0,150,0);"
    }else{
        span.innerHTML = "Total:";
        span.style.cssText = "background-color;red;";
    }
    return total;
}
setInterval(Collection , 1 );
let Total = Collection();



// data to arr 
function dataToarr(){
    if(!discount.value){
        discount.value=0;
    }
    const tr = {
        title: title.value.toLowerCase(),price: price.value,taxes: taxes.value,ads: ads.value,discount: discount.value,total: Collection(),category: category.value.toLowerCase(),update:"update",del:"delete",
    }
    arr.push(tr);
    dataToLocal();
    createElement(arr);
};

//data to local
function dataToLocal(){
    localStorage.setItem("arr",JSON.stringify(arr));
};


// clear after btncreate click 
function clear(){
    [...document.forms[0]].forEach(function(el){
        if(el.localName === 'input'){
            el.value = '';
        }
    })
};

// function create element
function createele(ele){
    return document.createElement(`${ele}`);
};

// create element to page

function createElement (){
    tbody.innerHTML = '';
    arr.forEach(function(tr,index){
        let TR = createele("tr");
        let ID = createele("td"); ID.textContent = `${index + 1}`;
        let TITLE = createele("td"); TITLE.append(tr.title);
        let PRICE = createele("td"); PRICE.append(tr.price);
        let TAXES = createele("td"); TAXES.append(tr.taxes);
        let ADS = createele("td"); ADS.append(tr.ads);
        let DISCOUNT = createele("td"); DISCOUNT.append(tr.discount);
        let TOTAL = createele("td"); TOTAL.append(tr.total);
        let CATEGORY = createele("td"); CATEGORY.append(tr.category);
        let UPDATE = createele("td"); UPDATE.innerHTML = `<button>update</button>`;
        let DELE = createele("td"); DELE.innerHTML = `<button>delete</button>`;
        TR.append(ID,TITLE,PRICE,TAXES,ADS,DISCOUNT,TOTAL,CATEGORY,UPDATE,DELE);
        tbody.append(TR)
    })
};


//  function delete and update

document.querySelector("section").addEventListener('click',(e) => {
    //delete all
    if(e.target === btnDeleAll){
        arr.splice(0);
        localStorage.clear();
        createElement();
        location.reload();
    }
    // delete one element 
    if(e.target.textContent === "delete"){
        arr.splice(arr[arr.indexOf(e.target.parentElement.parentElement)],1)
        localStorage.arr = JSON.stringify(arr);
        createElement();
        location.reload();
    }

    //update

    if(e.target.textContent === "update"){
        count.remove();
        let objIndex = arr[e.target.parentElement.parentElement.firstElementChild.innerHTML - 1];

        [...document.forms[0]].forEach(function(el){
            if(el.localName === 'input' ){
                el.value = objIndex[el.name];
            }
        })
        
        btnCreate.textContent = "Update";
        
        if(btnCreate.textContent !== "create"){
        btnCreate.onclick = function(){
            [...document.forms[0]].forEach(function(el){
                if(el.localName === "input"){
                    objIndex[el.name] = el.value;
                    localStorage.arr = JSON.stringify(arr);
                    createElement();
                }
                location.reload();
            })
        }}
    }
});



// function serach
function serachFun(){
    document.querySelector('.ser').addEventListener("click",(event)=>{
        if(event.target === searchByCatgory){
            search.placeholder = searchByCatgory.textContent;
            search.value = '';
        }else if(event.target === searchByTitle){
            search.placeholder = searchByTitle.textContent;
            search.value = '';
        }
        createElement();
    });


    search.onkeyup = function(e){
        let dataSer = ''; 
        if(search.placeholder === searchByTitle.textContent){
            arr.forEach(function(el,i){
                if(el.title.includes(search.value.trim().toLowerCase())){
                    dataSer += `
                    <tr><td>${i + 1}</td><td>${el.title}</td><td>${el.price}</td><td>${el.taxes}</td><td>${el.ads}</td><td>${el.discount}</td><td>${el.total}</td><td>${el.category}</td><td><button>update</button></td><td><button>delete</button></td></tr>
                    `;
                    tbody.innerHTML = dataSer;
                }
            });
        }else if(search.placeholder === searchByCatgory.textContent){
            arr.forEach(function(el,i){
                if(el.category.includes(search.value.trim().toLowerCase())){
                    dataSer += `
                    <tr><td>${i + 1}</td><td>${el.title}</td><td>${el.price}</td><td>${el.taxes}</td><td>${el.ads}</td><td>${el.discount}</td><td>${el.total}</td><td>${el.category}</td><td><button>update</button></td><td><button>delete</button></td></tr>
                    `;
                    btnDeleAll.innerHTML = 'Delete All';
                    tbody.innerHTML = dataSer;
                }
            });
        }
        tbody.innerHTML = dataSer;
    }
}
serachFun();

