var express = require('express');
var router = express.Router();

var worldGen = require('../models/worldgenerator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainmenu', { title: 'Asteroid Base' });
});

router.get('/newgame', function(req, res, next) {
  res.render('gamecreator', { title: 'Asteroid Base' });
});

router.post('/newgame', (req, res, next) => {
  // console.log(req.body);
  var emptyWorld = {
    gamename:req.body.gamename,
    world: {
      systems:[]
    }
  };
  var settings = req.body.gamename;
  console.log('settings:');
  console.log(settings);
  var newSystem = worldGen(settings);

  //res.cookie('gamedata', world, { maxAge: 900000})
  //console.log(world.world.systems[0]);
  // res.send({ name: req.body.gamename })
  res.redirect('/game');

});

router.get('/getnewsystem', (req, res, next) => {
  var settings = {};
  var world = worldGen(settings);

  res.send(world);
});

router.get('/game', (req, res, next) => {

  res.render('game', {title: 'asteroidbase',gamedata:req.cookies.gamedata})
});

module.exports = router;
