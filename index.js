const { ipcRenderer } = require('electron')

let mylist;
let idproduct
let name;
let price;
let btnform;
let btnUpdate;
let btndelete;
let btnedit;


/*document.addEventListener("DOMContentLoaded", function() {
 
})*/

window.onload = function() { 
   mylist = document.getElementById("mylist") 
   btnform = document.getElementById("btnform")
   btnUpdate = document.getElementById("btnupdate")
   idproduct = document.getElementById("idproduct")
   name = document.getElementById("name")
   price = document.getElementById("price")
   btnform.onclick = renderAddProduct  
  
   

   
   
   renderGetProducts() 
};

if(btndelete !=null){
   console.log(btndelete)
}

async function renderGetProducts() 
{
   await ipcRenderer.invoke('get')   
}

 
async function renderAddProduct() 
{
   const obj = {
      name:name.value,
      price: parseInt(price.value)
   }
   name.value = ""
   price.value = "" 
   await ipcRenderer.invoke('add', obj)   
}



ipcRenderer.on('products', (event, results) => {
   let template = ""
   const list = results
   list.forEach(element => {
      template+=`
         <tr>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td>
              <button class="btn btn-danger"
                id="btndelete"
                value="${element.id}"> 
                delete
              </button>
             </td>
             
             <td>
               <button class="btn btn-info"
                id="btnedit"
                value="${element.id}"> 
                update
              </button>
           
            </td>
         </tr>
      ` 
   });
     
   mylist.innerHTML = template
   
   if(list.length > 0){
      btndelete = document.getElementById("btndelete")
      btnedit = document.getElementById("btnedit")
      if(btndelete!=null){
         btndelete.onclick = renderdeleteproduct
         btnedit.onclick = rendergetproduct
      }
   }
   
    
});





async function renderdeleteproduct(e)
{
   const obj = { id: e.target.value}
   await ipcRenderer.invoke('delete', obj)    
}

function rendergetproduct(e){
   
   const obj = { id: e.srcElement.id }
   ipcRenderer.invoke("get_one" , obj)

}

/*ipcRenderer.on('product',(event, result) => {
   idproduct.value = result.id
   name.value = result.name
   price.value = result.price
});*/

function renderUpdateProduct()
{
  const obj = {
     id: idproduct.value,
     name: name.value,
     price: price.value 
  }
  console.log(obj)
}