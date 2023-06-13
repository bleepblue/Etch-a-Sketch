let size = 16;
let click = false;
let isMouseDown = false;
let color = "#000000"
let eraser = false;
let rainbow = false;
let opacityOn = false;
let colorMode = true;
document.querySelector('#colorMode').style.backgroundColor="grey";
document.querySelector('.hover').style.cssText="font-weight:bold;font-size:30px";
document.querySelector('label').innerText = `${size} x ${size}`;
document.querySelector('.hoverClick').addEventListener('click', (e)=>{
   if (click) {
      document.querySelector('.click').style.cssText="";
      document.querySelector('.hover').style.cssText="font-weight:bold;font-size:32px";
      click = false;
   } else {
      document.querySelector('.hover').style.cssText="";
      document.querySelector('.click').style.cssText="font-weight:bold;font-size:32px";
      click = true;
   }
});
creategrid();

function creategrid () {
   document.querySelector('.etch').innerHTML="";
   let div;
   let frag = document.createDocumentFragment();
   for (i=0;i<(size*size);i++) {
      div = document.createElement('div');
      div.className = "square";
      div.style.cssText = `width:${750/size}px;height:${750/size}px`;
      div.addEventListener('mouseover', (e)=>{
         if (opacityOn && !click) {
           let tempOpacity = Number(e.target.style.opacity);
           tempOpacity += 0.1;
           e.target.style.opacity = tempOpacity;
         };
         if (!click && !eraser && !rainbow) {
         e.target.classList.add("activeSquare");
         e.target.style.backgroundColor = color;
         } else if (!click && eraser) {
            e.target.style.backgroundColor = "white";
         } else if (!click && rainbow) {
            e.target.style.backgroundColor = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1`;
         }
      });
      div.addEventListener('mouseover', (e)=>{
         if (opacityOn && click && isMouseDown) {
            let tempOpacity = Number(e.target.style.opacity);
           tempOpacity += 0.1;
           e.target.style.opacity = tempOpacity; 
         };
         if (click && isMouseDown && !eraser && !rainbow) {
            e.target.classList.add("activeSquare");
            e.target.style.backgroundColor = color;
         } else if (click && isMouseDown && eraser) {
            e.target.style.backgroundColor = "white";
         } else if (click && isMouseDown && rainbow) {
            e.target.style.backgroundColor = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1`;
         }
      });
      div.addEventListener('mousedown', (e)=>{
         if (opacityOn && click) {
            let tempOpacity = Number(e.target.style.opacity);
           tempOpacity += 0.1;
           e.target.style.opacity = tempOpacity; 
         };
         if (click && !eraser && !rainbow) {
            e.target.classList.add("activeSquare");
            e.target.style.backgroundColor = color;
         } else if (click && eraser) {
            e.target.style.backgroundColor = "white";
         } else if (click && rainbow) {
            e.target.style.backgroundColor = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1`;
         }
      });
      div.draggable=false;
      frag.appendChild(div);
   };
   document.querySelector('.etch').appendChild(frag);
};


document.querySelector('#etchSize').addEventListener('input', (e)=>{
   size = e.target.value;
   document.querySelector('label').innerText = `${size} x ${size}`;
   creategrid();
});


window.addEventListener('mousedown', ()=>{
   isMouseDown = true;
});
window.addEventListener('mouseup', ()=>{
   isMouseDown = false;
});

document.querySelector('#colorPicker').addEventListener('input', (e)=>{
   color = e.target.value;
   colorMode = true;
   document.querySelector('#colorMode').style.backgroundColor="grey";
   eraser = false;
   document.querySelector('#eraser').style.backgroundColor="white";
   rainbow = false;
   document.querySelector('#rainbow').style.backgroundColor="white";

});

document.querySelector('#clear').addEventListener('click',creategrid);

document.querySelector('#eraser').addEventListener('click', (e)=>{
   if (eraser) {
      eraser = false;
      e.target.style.backgroundColor="initial";
      colorMode = true;
   } else {
      eraser = true;
      e.target.style.backgroundColor="grey";
      rainbow = false;
      document.querySelector('#rainbow').style.backgroundColor="initial";
      colorMode = false;
      document.querySelector('#colorMode').style.backgroundColor="white";

   }
});

document.querySelector('#rainbow').addEventListener('click', (e) => {
   if (rainbow) {
      rainbow = false;
      e.target.style.backgroundColor="initial"; 
      colorMode = true;    
   } else {
      rainbow = true;
      e.target.style.backgroundColor="grey";
      eraser = false;
      document.querySelector('#eraser').style.backgroundColor="initial";
      opacityOn = false;
      document.querySelector('#shader').style.backgroundColor="initial";
      colorMode = false;
      document.querySelector('#colorMode').style.backgroundColor="white";
   }
});

document.querySelector('#shader').addEventListener('click', (e) => {
   if (opacityOn) {
      opacityOn = false;
      e.target.style.backgroundColor="initial";     
   } else {
      opacityOn = true;
      e.target.style.backgroundColor="grey";
      rainbow = false;
      document.querySelector('#rainbow').style.backgroundColor="initial";
      if (!eraser) {
         colorMode = true;
         document.querySelector('#colorMode').style.backgroundColor="grey";
         
      }
   }
});

document.querySelector('#colorMode').addEventListener('click', (e)=>{
   if (!colorMode) {
      colorMode = true;
      eraser = false;
      document.querySelector('#eraser').style.backgroundColor="white";
      rainbow = false; 
      document.querySelector('#rainbow').style.backgroundColor="white";
      e.target.style.backgroundColor="grey";
      

   }
});

/*

TO IMPLEMENT: 
   bug: dragging still fucked - add eventlisteners on the wee divs for dragstart and dragover. also make sure that ismousedown ends after the dragging finishes.
   eraser should remove 'active square' class
   add eraser shading
DONE   hover / code - one enlarges and emboldens when active
   bugs: why does 'initial' not set button background color back to, uh, the initial? can simply set to actual background color instead
   can streamline code mayhaps

*/
