

console.log('animations.js initialised');


const items = document.querySelectorAll('.animation');

const active = function(entries){
    entries.forEach(entry => {
        entry.target.classList.add('unloaded'); 
        if(entry.isIntersecting){
        entry.target.classList.add('inview'); 
        }else{
           // entry.target.classList.remove('inview'); 
        }
    });
}
const io2 = new IntersectionObserver(active);
 for(let i=0; i < items.length; i++){
    io2.observe(items[i]);
 }


console.log('animations.js completed');