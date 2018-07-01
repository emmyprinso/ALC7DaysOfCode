  //create idb here
      console.log('testing idb before creating a db : ', idb);
      let dbPromise = idb.open('ALC-currenct-db', 2, upgradeDb => {
        console.log('start creating db');
        switch(upgradeDb.oldVersion) {
          case 0:
            var keyValStore = upgradeDb.createObjectStore('convertion-rate');
            keyValStore.put("{an objectwith all the pairs rate}", "single currency");
          case 1:
            upgradeDb.createObjectStore('currencies');
            //upgradeDb.createObjectStore('currencies', { keyPath: 'currencyName' });
        }
       });

    //for test purpose read that first entry
    dbPromise.then(db => {
      let tx = db.transaction('convertion-rate');
      let keyValStore = tx.objectStore('convertion-rate');
      return keyValStore.get('single currency');
    }).then(val => {
      console.log('"single currency" :', val);
  });


let serviceReg = () =>{

  if(!navigator.serviceWorker) return;
  navigator.serviceWorker
  .register('./js/sw.js')
  .then(reg =>{

    reg.addEventListener('statechange',() =>{
      if(reg.waiting){
        currenciesDisplay();
      }
    });

    reg.addEventListener('updatefound', () => {
      fetch('https://free.currencyconverterapi.com/api/v5/currencies')
      .then(response => {
        return response.json();
      })
      .then(jsonval => {
          console.log('---------------------currencies-------------');
          dbPromise.then(db => {
            let tx = db.transaction('currencies', 'readwrite');
            let currenciesStore = tx.objectStore('currencies');

         // for(const value in jsonval.results){
            currenciesStore.put(jsonval.results, 'all');


              //console.log(jsonval.results[value]);
         // }

          return tx.complete;
        }).then(() => {
         console.log('currencies updated');
         currenciesDisplay();
        });

        
      })
    .catch(err => {
      console.log('---------------------currencies fetch error-------------', err);
    });

      console.log("from the deep [installing] [waiting] [active]", reg.installing, reg.waiting, reg.active);

    });


    console.log("successfully register service worker", reg);
    currenciesDisplay();


  })
  .catch(err => {
    console.log("failed for register service worker", err);
  })

}


console.log("servive worker controller state", navigator.serviceWorker.controller);
serviceReg();






let we;
function changeText(id) { 
    //id.innerHTML = "Ooops!";
    console.log(id);
    we = id;
}


currenciesDisplay = () => {
  console.log('################################################################################################');
  dbPromise.then(db => {
    let tx = db.transaction('currencies');
    var keyValStore = tx.objectStore('currencies');
    return keyValStore.get('all');
   }).then(vals => {
    console.log(vals);
    let currenciesArray = [];
    for(const val in vals){
      currenciesArray.push(vals[val]);
      //currenciesArray.push(vals[val].currencyName);
    }
    const sortCurrencies = Array.from(currenciesArray).sort((previous, next) => {
      // Sort the currencies in Alphebetical order
      if (previous.currencyName < next.currencyName) {
          return -1;
      }
      else if (previous.currencyName > next.currencyName) {
          return 1;
      }
      return 0;
    });

        // Populate currencies
      return sortCurrencies.map(currency => {
          const option = document.createElement('option');
          option.value = currency.id;
          option.textContent = `${currency.currencyName} (${currency.id})`;
          document.querySelector('#fromCurrency').appendChild(option);
          document.querySelector('#toCurrency').appendChild(option.cloneNode(true));
      });

   });

}