let size = 16;
document.querySelector('label').innerText = `${size} x ${size}`;

creategrid();

function creategrid () {
   document.querySelector('.etch').innerHTML="";
   let div;
   let frag = document.createDocumentFragment();
   for (i=0;i<(size*size);i++) {
      div = document.createElement('div');
      div.className = "lildiv";
      div.style.cssText = `width:${750/size}px;height:${750/size}px`;
      frag.appendChild(div);
   };
   document.querySelector('.etch').appendChild(frag);
};


document.querySelector('#etchSize').addEventListener('input', (e)=>{
   size = e.target.value;
   document.querySelector('label').innerText = `${size} x ${size}`;
   creategrid();
});


/*

TO IMPLEMENT: 
   pretty css obvs
   color picker
   darkening mode
   clear
   eraser
   rainbow mode
   hover / click mode 


*/
