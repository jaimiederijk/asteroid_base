(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// var mainmenu = require('./mainmenu.js');

var indexedDB = require('./indexedDB.js');
// var http = require("./services/http");
var systemView = require('./SystemView.vue');

//http.getNewSystem();




new Vue({
  render: h => h(systemView)
}).$mount('#systemview');

indexedDB();

},{"./SystemView.vue":1,"./indexedDB.js":3}],3:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdHMvU3lzdGVtVmlldy52dWUiLCJwdWJsaWMvamF2YXNjcmlwdHMvYnVpbGRlci5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9pbmRleGVkREIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIiIsIi8vIHZhciBtYWlubWVudSA9IHJlcXVpcmUoJy4vbWFpbm1lbnUuanMnKTtcblxudmFyIGluZGV4ZWREQiA9IHJlcXVpcmUoJy4vaW5kZXhlZERCLmpzJyk7XG4vLyB2YXIgaHR0cCA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL2h0dHBcIik7XG52YXIgc3lzdGVtVmlldyA9IHJlcXVpcmUoJy4vU3lzdGVtVmlldy52dWUnKTtcblxuLy9odHRwLmdldE5ld1N5c3RlbSgpO1xuXG5cblxuXG5uZXcgVnVlKHtcbiAgcmVuZGVyOiBoID0+IGgoc3lzdGVtVmlldylcbn0pLiRtb3VudCgnI3N5c3RlbXZpZXcnKTtcblxuaW5kZXhlZERCKCk7XG4iLCJsZXQgZGI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG4pIHtcblxuICB3aW5kb3cub25sb2FkID0gKCk9PiB7XG4gICAgbGV0IHJlcSA9IHdpbmRvdy5pbmRleGVkREIub3BlbignZ2FtZXNhdmUnLCAxKTtcblxuICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGIgZmFpbGVkIHRvIG9wZW4nKTtcbiAgICB9O1xuXG4gICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coJ2RiIG9wZW5lZCBzdWNjZXNmdWxseScpO1xuXG4gICAgICBkYiA9IHJlcS5yZXN1bHQ7XG5cbiAgICAgIGRpc3BsYXlEYXRhKCk7XG4gICAgfTtcblxuICAgIHJlcS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAvLyBHcmFiIGEgcmVmZXJlbmNlIHRvIHRoZSBvcGVuZWQgZGF0YWJhc2VzZFxuICAgICAgbGV0IGRiID0gZS50YXJnZXQucmVzdWx0O1xuXG4gICAgICAvLyBDcmVhdGUgYW4gb2JqZWN0U3RvcmUgdG8gc3RvcmUgb3VyIG5vdGVzIGluIChiYXNpY2FsbHkgbGlrZSBhIHNpbmdsZSB0YWJsZSlcbiAgICAgIC8vIGluY2x1ZGluZyBhIGF1dG8taW5jcmVtZW50aW5nIGtleVxuICAgICAgbGV0IG9iamVjdFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ2dhbWVzYXZlJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OnRydWUgfSk7XG5cbiAgICAgIC8vIERlZmluZSB3aGF0IGRhdGEgaXRlbXMgdGhlIG9iamVjdFN0b3JlIHdpbGwgY29udGFpblxuICAgICAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoJ3RpdGxlJywgJ3RpdGxlJywgeyB1bmlxdWU6IGZhbHNlIH0pO1xuICAgICAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoJ2JvZHknLCAnYm9keScsIHsgdW5pcXVlOiBmYWxzZSB9KTtcblxuICAgICAgY29uc29sZS5sb2coJ0RhdGFiYXNlIHNldHVwIGNvbXBsZXRlJyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZERhdGEoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBsZXQgbmV3SXRlbSA9IHt0aXRsZTpcImRcIiAsIGJvZHk6IFwiIGRcIn1cblxuICAgICAgbGV0IHRyYW5zYWN0aW9uID0gZGIudHJhbnNhY3Rpb24oWydnYW1lc2F2ZSddLCAncmVhZHdyaXRlJyk7XG5cbiAgICAgIGxldCBvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKCdnYW1lc2F2ZScpO1xuXG4gICAgICBsZXQgcmVxID0gb2JqZWN0U3RvcmUuYWRkKG5ld0l0ZW0pO1xuXG4gICAgICByZXEub25zdWNjZXMgPSAoKSA9PiB7XG4gICAgICAgIC8vIHRpdGxlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgLy8gYm9keUlucHV0LnZhbHVlID0gJyc7XG4gICAgICB9O1xuXG4gICAgICB0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndHJhbnNhY3Rpb24gY29tcGxldGVkOiBkYiBtb2QgZmluaXNoZWQnKTtcblxuICAgICAgICBkaXNwbGF5RGF0YSgpO1xuICAgICAgfVxuICAgICAgdHJhbnNhY3Rpb24ub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RyYW5zYWN0aW9uIGVycm9yJyk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5RGF0YSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkaXNwbGF5RGF0YScpO1xuICAgIH07XG5cbiAgfTtcbn07XG4iXX0=
