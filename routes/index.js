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
  console.log("sometime i cry");
  console.log(req.param);
  // console.log(req.body);
  var sys = worldGen();
  console.log("post req");
  console.log(sys);
  res.cookie('gamedata', {
    gamename:req.body.gamename,
    world: {
      richness: req.body.richness,
      systems:[
        {
          systemObjects: sys.systemObjects
        }
      ]
    },
    enemydificulty: req.body.enemydificulty
  }, { maxAge: 900000})

  // res.send({ name: req.body.gamename })
  res.redirect('/game');

});

router.get('/game', (req, res, next) => {
  console.log("gamedata:");
  console.log(req.cookies.gamedata.world.systems[0]);

  res.render('game', {title: 'asteroidbase',gamedata:req.cookies.gamedata})
});

module.exports = router;
