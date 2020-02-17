let db;

module.exports = function (n) {

  window.onload = ()=> {
    let req = window.indexedDB.open('gamesave', 1);

    req.onerror = function() {
      console.log('db failed to open');
    };

    req.onsuccess = function() {
      console.log('db opened succesfully');

      db = req.result;

      displayData();
    };

    req.onupgradeneeded = function(e) {
      // Grab a reference to the opened databasesd
      let db = e.target.result;

      // Create an objectStore to store our notes in (basically like a single table)
      // including a auto-incrementing key
      let objectStore = db.createObjectStore('gamesave', { keyPath: 'id', autoIncrement:true });

      // Define what data items the objectStore will contain
      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('body', 'body', { unique: false });

      console.log('Database setup complete');
    };

    function addData(e) {
      e.preventDefault();

      let newItem = {title:"d" , body: " d"}

      let transaction = db.transaction(['gamesave'], 'readwrite');

      let objectStore = transaction.objectStore('gamesave');

      let req = objectStore.add(newItem);

      req.onsucces = () => {
        // titleInput.value = '';
        // bodyInput.value = '';
      };

      transaction.oncomplete = () => {
        console.log('transaction completed: db mod finished');

        displayData();
      }
      transaction.onerror = () => {
        console.log('transaction error');
      };
    };

    function displayData() {
      console.log('displayData');
    };

  };
};
