const { ipcRenderer } = require('electron')

let mylist;
let name;
let price;
let btnform;
document.addEventListener("DOMContentLoaded", function() {
   mylist = document.getElementById("mylist") 
   btnform = document.getElementById("btnform")
   name = document.getElementById("name")
   price = document.getElementById("price")
   btnform.onclick = renderAddProduct

   renderGetProducts() 
})

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
         </tr>
      ` 
   });
     
   mylist.innerHTML = template
   name.value = ""
   price.value = "" 
 })


