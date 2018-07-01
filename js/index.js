
let serviceReg = () =>{
  if(!navigator.serviceWorker) return;
  navigator.serviceWorker.register('js/sw.js').then(reg =>{
    console.log("successfully register service worker", reg.waiting, reg.installing, reg.active);
  }).catch(err => {
    console.log("failed for register service worker", err);
  });
}


console.log("servive worker controller state", navigator.serviceWorker.controller);





let we;
function changeText(id) { 
    //id.innerHTML = "Ooops!";
    console.log(id);
    we = id;
}