// var mainmenu = require('./mainmenu.js');

var indexedDB = require('./indexedDB.js');
// var http = require("./services/http");
var systemView = require('./SystemView.vue');

//http.getNewSystem();




new Vue({
  render: h => h(systemView)
}).$mount('#systemview');

indexedDB();
