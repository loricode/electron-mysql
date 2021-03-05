const { ipcRenderer } = require('electron')

let mylist;
document.addEventListener("DOMContentLoaded", function() {
   mylist = document.getElementById("mylist") 
  
   renderGetProducts() 
})

async function renderGetProducts() 
{
   await ipcRenderer.invoke('get')   
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

 })


