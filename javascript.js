let size = 16;
let click = false;
let isMouseDown = false;
let color = "#000000"
let eraser = false;
let rainbow = false;
let opacityOn = false;
let colorMode = true;
document.querySelector('#colorMode').style.cssText = `background-image: linear-gradient(to right, ${color}, white)`;
document.querySelector('.colorLabel').style.cssText = `background-image: linear-gradient(to right, ${color}, white)`;
document.querySelector('.hover').style.cssText="font-weight:bold;font-size:30px";
document.querySelector('.sizing').innerText = `${size} x ${size}`;
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
         if (!opacityOn) {e.target.style.opacity = 1};
         } else if (!click && eraser) {
            e.target.style.backgroundColor = "white";
            e.target.style.opacity = 0;
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
            if (!opacityOn) {e.target.style.opacity = 1};
         } else if (click && isMouseDown && eraser) {
            e.target.style.backgroundColor = "white";
            e.target.style.opacity = 0;
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
            if (!opacityOn) {e.target.style.opacity = 1};
         } else if (click && eraser) {
            e.target.style.backgroundColor = "white";
            e.target.style.opacity = 0;
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
   document.querySelector('.sizing').innerText = `${size} x ${size}`;
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
   document.querySelector('#colorMode').style.cssText = `background-image: linear-gradient(to right, ${color}, white)`;
   document.querySelector('.colorLabel').style.cssText = `background-image: linear-gradient(to right, ${color}, white)`;
   eraser = false;
   document.querySelector('#eraser').style.backgroundColor="#e3e3e3";
   rainbow = false;
   document.querySelector('#rainbow').style.backgroundColor="#e3e3e3";

});

document.querySelector('#clear').addEventListener('click',creategrid);

document.querySelector('#eraser').addEventListener('click', (e)=>{
   if (eraser) {
      eraser = false;
      e.target.style.backgroundColor="#e3e3e3";
      colorMode = true;
   } else {
      eraser = true;
      e.target.style.backgroundColor="#b3b3b3";
      rainbow = false;
      document.querySelector('#rainbow').style.backgroundColor="#e3e3e3";
      colorMode = false;
      document.querySelector('#colorMode').style.cssText="#e3e3e3";
      document.querySelector('.colorLabel').style.cssText="#e3e3e3";

   }
});

document.querySelector('#rainbow').addEventListener('click', (e) => {
   if (rainbow) {
      rainbow = false;
      e.target.style.backgroundColor="#e3e3e3"; 
      colorMode = true;    
   } else {
      rainbow = true;
      e.target.style.backgroundColor="#b3b3b3";
      eraser = false;
      document.querySelector('#eraser').style.backgroundColor="#e3e3e3";
      opacityOn = false;
      document.querySelector('#shader').style.backgroundColor="#e3e3e3";
      colorMode = false;
      document.querySelector('#colorMode').style.cssText="#e3e3e3";
      document.querySelector('.colorLabel').style.cssText="#e3e3e3";
   }
});

document.querySelector('#shader').addEventListener('click', (e) => {
   if (opacityOn) {
      opacityOn = false;
      e.target.style.backgroundColor="#e3e3e3";     
   } else {
      opacityOn = true;
      e.target.style.backgroundColor="#b3b3b3";
      rainbow = false;
      document.querySelector('#rainbow').style.backgroundColor="#e3e3e3";
      if (!eraser) {
         colorMode = true;
         document.querySelector('#colorMode').style.backgroundColor="#b3b3b3";
         
         
      }
   }
});

document.querySelector('#colorMode').addEventListener('click', (e)=>{
   if (!colorMode) {
      colorMode = true;
      eraser = false;
      document.querySelector('#eraser').style.backgroundColor="#e3e3e3";
      rainbow = false; 
      document.querySelector('#rainbow').style.backgroundColor="#e3e3e3";
      document.querySelector('#colorMode').style.cssText = `background-image: linear-gradient(to right, ${color}, white)`;
      document.querySelector('.colorLabel').style.cssText = `background-image: linear-gradient(to right, ${color}, white)`;
      
      

   }
});


/*

TO IMPLEMENT: 
   bug: dragging still fucked - add eventlisteners on the wee divs for dragstart and dragover. also make sure that ismousedown ends after the dragging finishes.
   eraser should remove 'active square' class
   add eraser shading
DONE   hover / code - one enlarges and emboldens when active
   
   can streamline code mayhaps

*/