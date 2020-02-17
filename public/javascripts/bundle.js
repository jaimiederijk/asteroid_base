(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// var mainmenu = require('./mainmenu.js');

var indexedDB = require('./indexedDB.js');


indexedDB();

},{"./indexedDB.js":2}],2:[function(require,module,exports){
let db;

module.exports = function (n) {

  window.onload = ()=> {
    let req = window.indexedDB.open('gamesave', 1);

    req.onerror = function() {
      console.log('db failed to open');
    };

    req.onsucces = function() {
      console.log('db opened succesfully');

      db = req.result;

      displayData();
    };

    req.onupgradeneeded = function(e) {
      // Grab a reference to the opened databases
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdHMvYnVpbGRlci5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9pbmRleGVkREIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIHZhciBtYWlubWVudSA9IHJlcXVpcmUoJy4vbWFpbm1lbnUuanMnKTtcblxudmFyIGluZGV4ZWREQiA9IHJlcXVpcmUoJy4vaW5kZXhlZERCLmpzJyk7XG5cblxuaW5kZXhlZERCKCk7XG4iLCJsZXQgZGI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG4pIHtcblxuICB3aW5kb3cub25sb2FkID0gKCk9PiB7XG4gICAgbGV0IHJlcSA9IHdpbmRvdy5pbmRleGVkREIub3BlbignZ2FtZXNhdmUnLCAxKTtcblxuICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGIgZmFpbGVkIHRvIG9wZW4nKTtcbiAgICB9O1xuXG4gICAgcmVxLm9uc3VjY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGIgb3BlbmVkIHN1Y2Nlc2Z1bGx5Jyk7XG5cbiAgICAgIGRiID0gcmVxLnJlc3VsdDtcblxuICAgICAgZGlzcGxheURhdGEoKTtcbiAgICB9O1xuXG4gICAgcmVxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIEdyYWIgYSByZWZlcmVuY2UgdG8gdGhlIG9wZW5lZCBkYXRhYmFzZXNcbiAgICAgIGxldCBkYiA9IGUudGFyZ2V0LnJlc3VsdDtcblxuICAgICAgLy8gQ3JlYXRlIGFuIG9iamVjdFN0b3JlIHRvIHN0b3JlIG91ciBub3RlcyBpbiAoYmFzaWNhbGx5IGxpa2UgYSBzaW5nbGUgdGFibGUpXG4gICAgICAvLyBpbmNsdWRpbmcgYSBhdXRvLWluY3JlbWVudGluZyBrZXlcbiAgICAgIGxldCBvYmplY3RTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKCdnYW1lc2F2ZScsIHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDp0cnVlIH0pO1xuXG4gICAgICAvLyBEZWZpbmUgd2hhdCBkYXRhIGl0ZW1zIHRoZSBvYmplY3RTdG9yZSB3aWxsIGNvbnRhaW5cbiAgICAgIG9iamVjdFN0b3JlLmNyZWF0ZUluZGV4KCd0aXRsZScsICd0aXRsZScsIHsgdW5pcXVlOiBmYWxzZSB9KTtcbiAgICAgIG9iamVjdFN0b3JlLmNyZWF0ZUluZGV4KCdib2R5JywgJ2JvZHknLCB7IHVuaXF1ZTogZmFsc2UgfSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKCdEYXRhYmFzZSBzZXR1cCBjb21wbGV0ZScpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGREYXRhKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgbGV0IG5ld0l0ZW0gPSB7dGl0bGU6XCJkXCIgLCBib2R5OiBcIiBkXCJ9XG5cbiAgICAgIGxldCB0cmFuc2FjdGlvbiA9IGRiLnRyYW5zYWN0aW9uKFsnZ2FtZXNhdmUnXSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICBsZXQgb2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSgnZ2FtZXNhdmUnKTtcblxuICAgICAgbGV0IHJlcSA9IG9iamVjdFN0b3JlLmFkZChuZXdJdGVtKTtcblxuICAgICAgcmVxLm9uc3VjY2VzID0gKCkgPT4ge1xuICAgICAgICAvLyB0aXRsZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIC8vIGJvZHlJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgfTtcblxuICAgICAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RyYW5zYWN0aW9uIGNvbXBsZXRlZDogZGIgbW9kIGZpbmlzaGVkJyk7XG5cbiAgICAgICAgZGlzcGxheURhdGEoKTtcbiAgICAgIH1cbiAgICAgIHRyYW5zYWN0aW9uLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0cmFuc2FjdGlvbiBlcnJvcicpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZGlzcGxheURhdGEoKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGlzcGxheURhdGEnKTtcbiAgICB9O1xuXG4gIH07XG59O1xuIl19
