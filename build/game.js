var AttentionBar, CandyLand, End, Enemy, FailScreen, FlyingLandRenderer, Game, Geek, Hotass, Laboratory, Level, Loader, Manual, Menu, Pirate, Player, PlayerChooser, SightRect, Team, Tralalalandia, WinScreen, game;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Awesome.module('AI', (function() {
  function _Class() {}
  _Class.prototype.$randomSomething = 12;
  _Class.init = function() {
    this.bind('tick', this.prototype.tick);
    this.bind('playerSpotted', this.prototype.playerSpotted);
    return this.bind('playerGone', this.prototype.playerGone);
  };
  _Class.prototype.playerSpotted = function() {
    return this.startWalking(this.attrs.direction);
  };
  _Class.prototype.playerGone = function() {
    return this.stopWalking();
  };
  _Class.prototype.tick = function() {
    var _ref;
    if ((_ref = this.walkingCycleCounter) == null) {
      this.walkingCycleCounter = 0;
    }
    if (!this.spotted) {
      this.walkingCycleCounter++;
      if (this.walkingCycleCounter > 10) {
        this.walkingCycleCounter = 0;
        return this.walkingCycleChange();
      }
    }
  };
  _Class.prototype.walkingCycleChange = function() {
    switch (Math.ceil(Math.random() * this.attrs.randomSomething)) {
      case 1:
        this.stopWalking();
        return this.startWalking('left');
      case 2:
        this.stopWalking();
        return this.startWalking('right');
      default:
        return this.stopWalking();
    }
  };
  return _Class;
})());
SightRect = (function() {
  __extends(SightRect, Awesome.Collisions.Rect);
  function SightRect(entity, w, direction) {
    this.w = w;
    this.direction = direction;
    this.entity = entity.getRect();
  }
  Object.defineProperties(SightRect.prototype, {
    x: {
      get: function() {
        if (this.direction === 'left') {
          return this.entity.x - this.w;
        } else if (this.direction === 'right') {
          return this.entity.wx;
        }
      }
    },
    y: {
      get: function() {
        return this.entity.y;
      }
    },
    h: {
      get: function() {
        return this.entity.h;
      }
    }
  });
  return SightRect;
})();
Awesome.module('Sight', (function() {
  function _Class() {}
  _Class.prototype.$sight = 300;
  _Class.init = function() {
    return this.bind('tick', this.prototype.tick);
  };
  _Class.prototype.tick = function() {
    var bar, isPlayer, seenEntities;
    seenEntities = this.getSeenEntities(this.attrs.direction);
    bar = this.scene.getEntitiesByTag('attentionBar')[0];
    isPlayer = function(entity) {
      return entity.entity instanceof Player;
    };
    if (_.any(seenEntities, isPlayer)) {
      if (!this.spotted) {
        this.spotted = true;
        return this.trigger('playerSpotted');
      }
    } else {
      if (this.spotted) {
        this.spotted = false;
        return this.trigger('playerGone');
      }
    }
  };
  _Class.prototype.getSeenEntities = function(direction) {
    var entitiesInSight, topSide, visible;
    entitiesInSight = this.getEntitiesInSight(direction);
    topSide = this.scene.attrs.size[1];
    visible = _.filter(entitiesInSight, function(entity) {
      var rect;
      rect = entity.rect;
      if (rect.y >= topSide) {
        return false;
      } else {
        if (rect.y < topSide) {
          topSide = rect.y;
        }
        return true;
      }
    });
    return visible;
  };
  _Class.prototype.getEntitiesInSight = function(direction) {
    var collisions, distance, entity, entityRect, id, sightRect, _ref;
    sightRect = this.getSightRect(direction);
    collisions = [];
    _ref = this.scene.entities;
    for (id in _ref) {
      entity = _ref[id];
      if (entity.tagged('visible')) {
        entityRect = entity.getRect();
        if (this.detector.detect(entityRect, sightRect)) {
          distance = direction === 'left' ? sightRect.wx - entityRect.wx : entityRect.x - sightRect.x;
          collisions.push({
            entity: entity,
            distance: distance,
            rect: entityRect
          });
        }
      }
    }
    return _(collisions).sortBy(function(collision) {
      return collision.distance;
    });
  };
  _Class.prototype.getSightRect = function(direction) {
    var _base, _ref, _ref2;
    if ((_ref = this.sightRect) == null) {
      this.sightRect = {};
    }
    return (_ref2 = (_base = this.sightRect)[direction]) != null ? _ref2 : _base[direction] = new SightRect(this, this.attrs.sight, direction);
  };
  return _Class;
})());
Awesome.module('Death', (function() {
  function _Class() {}
  _Class.init = function() {
    return this.bind('tick', this.prototype.tick);
  };
  _Class.prototype.tick = function() {
    var collisions;
    collisions = this.colliding({
      "with": 'enemy'
    });
    if (collisions.length) {
      return this.die();
    }
  };
  _Class.prototype.die = function() {};
  return _Class;
})());
Enemy = (function() {
  __extends(Enemy, Awesome.Entity);
  function Enemy() {
    Enemy.__super__.constructor.apply(this, arguments);
  }
  Enemy.include('Collisions', 'Gravity', 'Walking', 'AI', 'Sight', 'WalkingAnimation');
  Enemy.tag('visible', 'enemy');
  Enemy.prototype.$z = 3;
  Enemy.prototype.$bgRepeat = 'no';
  Enemy.prototype.$direction = 'left';
  return Enemy;
})();
End = (function() {
  __extends(End, Awesome.Entity);
  End.prototype.$size = [60, 90];
  End.prototype.$background = 'end.png';
  End.include('Collisions');
  function End() {
    End.__super__.constructor.apply(this, arguments);
    this.bind('tick', this.tick);
  }
  End.prototype.tick = function() {
    var collisions;
    collisions = this.colliding({
      "with": 'player'
    });
    if (collisions.length) {
      return this.scene.runNextScene();
    }
  };
  return End;
})();
AttentionBar = (function() {
  var AttentionBarRenderer;
  __extends(AttentionBar, Awesome.Entity);
  AttentionBar.prototype.$growSpeed = 2;
  AttentionBar.prototype.$fallSpeed = 0.2;
  AttentionBar.prototype.$position = [10, 10];
  AttentionBar.prototype.$size = [200, 10];
  AttentionBar.prototype.$z = 10;
  AttentionBar.tag('attentionBar');
  AttentionBar.Renderer = AttentionBarRenderer = (function() {
    __extends(AttentionBarRenderer, Awesome.Rendering.EntityRenderer);
    function AttentionBarRenderer() {
      AttentionBarRenderer.__super__.constructor.apply(this, arguments);
    }
    AttentionBarRenderer.prototype.setupStyles = function() {
      AttentionBarRenderer.__super__.setupStyles.apply(this, arguments);
      return this.el.style.border = "1px solid gray";
    };
    AttentionBarRenderer.prototype.appendToScene = function() {
      return this.entity.scene.renderer.appendElementToWrapper(this.el);
    };
    _.extend(AttentionBarRenderer.object('css'), {
      attention: function(a) {
        return {
          backgroundImage: "-webkit-gradient(linear, left top, right top, color-stop(" + (a / 100) + ", red), color-stop(" + (a / 100) + ", white))"
        };
      }
    });
    return AttentionBarRenderer;
  })();
  function AttentionBar() {
    AttentionBar.__super__.constructor.apply(this, arguments);
    this.bind('tick', this.tick);
    this.attrs.set('attention', 0);
  }
  AttentionBar.prototype.rendererClass = AttentionBar.Renderer;
  AttentionBar.prototype.grow = function() {
    return this.growing = true;
  };
  AttentionBar.prototype.stopGrowing = function() {
    return this.growing = false;
  };
  AttentionBar.prototype.tick = function() {
    if (this.growing && this.attrs.attention < 100) {
      if (this.attrs.attention + this.attrs.growSpeed >= 100) {
        this.attrs.attention = 100;
        this.trigger('full');
      } else {
        this.attrs.attention += this.attrs.growSpeed;
      }
    }
    if (this.attrs.attention > 0) {
      if (this.attrs.attention - this.attrs.fallSpeed <= 0) {
        return this.attrs.attention = 0;
      } else {
        return this.attrs.attention -= this.attrs.fallSpeed;
      }
    }
  };
  return AttentionBar;
}).call(this);
Menu = (function() {
  __extends(Menu, Awesome.Scene);
  function Menu() {
    Menu.__super__.constructor.apply(this, arguments);
  }
  Menu.prototype.name = 'menu';
  Menu.add(Awesome.Entities.Button, {
    text: 'Start',
    size: [100, 50],
    position: [325, 100]
  });
  Menu.add(Awesome.Entities.Button, {
    text: 'Manual',
    size: [100, 50],
    position: [325, 170]
  });
  Menu.add(Awesome.Entities.Button, {
    text: 'Team',
    size: [100, 50],
    position: [325, 240]
  });
  Menu.prototype.run = function() {
    var buttons;
    buttons = this.getEntitiesByTag('button');
    buttons[0].bind('click', __bind(function() {
      return this.game.run('playerChooser');
    }, this));
    buttons[1].bind('click', __bind(function() {
      return this.game.run('manual');
    }, this));
    buttons[2].bind('click', __bind(function() {
      return this.game.run('team');
    }, this));
    return this.playAudio('psychostick-we_ran_out_of_cd_space.mp3');
  };
  return Menu;
})();
Level = (function() {
  __extends(Level, Awesome.Scene);
  function Level() {
    Level.__super__.constructor.apply(this, arguments);
  }
  Level.prototype.showDeathScreen = function() {
    return this.game.run('failScreen', this.name, this.playerClass);
  };
  Level.prototype.run = function(playerClass) {
    this.playerClass = playerClass;
    this.player = this.add(this.playerClass, {
      position: [10, 10]
    });
    return this.follow(this.player);
  };
  Level.prototype.runNextScene = function() {};
  return Level;
})();
FailScreen = (function() {
  __extends(FailScreen, Awesome.Scene);
  function FailScreen() {
    FailScreen.__super__.constructor.apply(this, arguments);
  }
  FailScreen.prototype.name = 'failScreen';
  FailScreen.add(Awesome.Entities.Text, {
    text: 'Fail',
    position: [325, 175],
    size: [150, 50],
    fontSize: 30,
    align: 'center'
  });
  FailScreen.add(Awesome.Entities.Button, {
    text: 'Restart level',
    position: [325, 250],
    size: [150, 50]
  });
  FailScreen.add(Awesome.Entities.Button, {
    text: 'Back to menu',
    position: [325, 320],
    size: [150, 50]
  });
  FailScreen.prototype.run = function(fromScene, player) {
    var buttons;
    this.fromScene = fromScene;
    this.player = player;
    buttons = this.getEntitiesByTag('button');
    buttons[0].bind('click', __bind(function() {
      return this.game.run(fromScene, player);
    }, this));
    return buttons[1].bind('click', __bind(function() {
      return this.game.run('menu');
    }, this));
  };
  return FailScreen;
})();
PlayerChooser = (function() {
  __extends(PlayerChooser, Awesome.Scene);
  function PlayerChooser() {
    PlayerChooser.__super__.constructor.apply(this, arguments);
  }
  PlayerChooser.prototype.name = 'playerChooser';
  PlayerChooser.add(Awesome.Entities.Text, {
    size: [200, 50],
    position: [300, 100],
    text: 'Choose your villian',
    align: 'center',
    fontSize: 25
  });
  PlayerChooser.add(Awesome.Entities.Button, {
    size: [80, 120],
    position: [250, 180],
    image: 'characters/hotass/standing.png?'
  });
  PlayerChooser.add(Awesome.Entities.Button, {
    size: [80, 120],
    position: [350, 180],
    image: 'characters/geek/standing.png'
  });
  PlayerChooser.add(Awesome.Entities.Button, {
    size: [80, 120],
    position: [450, 180],
    image: 'characters/pirate/standing.png'
  });
  PlayerChooser.prototype.runLevel = function(player) {
    this.game.startTime = new Date;
    return this.game.run('candyLand', player);
  };
  PlayerChooser.prototype.run = function() {
    var buttons;
    buttons = this.getEntitiesByTag('button');
    buttons[0].bind('click', __bind(function() {
      return this.runLevel(Hotass);
    }, this));
    buttons[1].bind('click', __bind(function() {
      return this.runLevel(Geek);
    }, this));
    return buttons[2].bind('click', __bind(function() {
      return this.runLevel(Pirate);
    }, this));
  };
  return PlayerChooser;
})();
Loader = (function() {
  __extends(Loader, Awesome.Scene);
  function Loader() {
    this.newLoaded = __bind(this.newLoaded, this);
    Loader.__super__.constructor.apply(this, arguments);
  }
  Loader.prototype.name = 'loader';
  Loader.add(Awesome.Entities.Text, {
    position: [350, 175],
    size: [100, 50],
    fontSize: 30,
    align: 'center',
    text: 'Loading...'
  });
  Loader.prototype.images = ['candyland/map/1.png', 'candyland/map/2.png', 'candyland/map/3.png', 'candyland/map/land.png', 'candyland/monsters/dadcaneL1.png', 'candyland/monsters/dadcaneL2.png', 'candyland/monsters/dadcaneR1.png', 'candyland/monsters/dadcaneR2.png', 'candyland/monsters/dadcaneSL1.png', 'candyland/monsters/dadcaneSL2.png', 'candyland/monsters/dadcaneSR1.png', 'candyland/monsters/dadcaneSR2.png', 'candyland/monsters/fanmallowL1.png', 'candyland/monsters/fanmallowL2.png', 'candyland/monsters/fanmallowR1.png', 'candyland/monsters/fanmallowR2.png', 'candyland/monsters/fanmallowSL1.png', 'candyland/monsters/fanmallowSL2.png', 'candyland/monsters/fanmallowSR1.png', 'candyland/monsters/fanmallowSR2.png', 'candyland/monsters/grankieL1.png', 'candyland/monsters/grankieL2.png', 'candyland/monsters/grankieR1.png', 'candyland/monsters/grankieR2.png', 'candyland/monsters/grankieSL1.png', 'candyland/monsters/grankieSL2.png', 'candyland/monsters/grankieSR1.png', 'candyland/monsters/grankieSR2.png', 'candyland/monsters/momonutL1.png', 'candyland/monsters/momonutL2.png', 'candyland/monsters/momonutR1.png', 'candyland/monsters/momonutR2.png', 'candyland/monsters/momonutSL1.png', 'candyland/monsters/momonutSL2.png', 'candyland/monsters/momonutSR1.png', 'candyland/monsters/momonutSR2.png', 'candyland/obstacles/grass.png', 'candyland/obstacles/stone.png', 'candyland/obstacles/tree.png', 'tralalalandia/map/1.png', 'tralalalandia/map/2.png', 'tralalalandia/map/3.png', 'tralalalandia/map/land.png', 'tralalalandia/monsters/bunnyL1.png', 'tralalalandia/monsters/bunnyL2.png', 'tralalalandia/monsters/bunnyR1.png', 'tralalalandia/monsters/bunnyR2.png', 'tralalalandia/monsters/bunnySL1.png', 'tralalalandia/monsters/bunnySL2.png', 'tralalalandia/monsters/bunnySR1.png', 'tralalalandia/monsters/bunnySR2.png', 'tralalalandia/monsters/edwardL1.png', 'tralalalandia/monsters/edwardL2.png', 'tralalalandia/monsters/edwardR1.png', 'tralalalandia/monsters/edwardR2.png', 'tralalalandia/monsters/edwardSL1.png', 'tralalalandia/monsters/edwardSL2.png', 'tralalalandia/monsters/edwardSR1.png', 'tralalalandia/monsters/edwardSR2.png', 'tralalalandia/monsters/happinessL1.png', 'tralalalandia/monsters/happinessL2.png', 'tralalalandia/monsters/happinessR1.png', 'tralalalandia/monsters/happinessR2.png', 'tralalalandia/monsters/happinessSL1.png', 'tralalalandia/monsters/happinessSL2.png', 'tralalalandia/monsters/happinessSR1.png', 'tralalalandia/monsters/happinessSR2.png', 'tralalalandia/monsters/rainicornL1.png', 'tralalalandia/monsters/rainicornL2.png', 'tralalalandia/monsters/rainicornR1.png', 'tralalalandia/monsters/rainicornR2.png', 'tralalalandia/monsters/rainicornSL1.png', 'tralalalandia/monsters/rainicornSL2.png', 'tralalalandia/monsters/rainicornSR1.png', 'tralalalandia/monsters/rainicornSR2.png', 'tralalalandia/obstacles/grass.png', 'tralalalandia/obstacles/rainbow.png', 'laboratory/map/1.png', 'laboratory/map/2.png', 'laboratory/map/3.png', 'laboratory/map/land.png', 'laboratory/monsters/brainL1.png', 'laboratory/monsters/brainL2.png', 'laboratory/monsters/brainR1.png', 'laboratory/monsters/brainR2.png', 'laboratory/monsters/creeperL1.png', 'laboratory/monsters/creeperL2.png', 'laboratory/monsters/creeperR1.png', 'laboratory/monsters/creeperR2.png', 'laboratory/monsters/pacmanL1.png', 'laboratory/monsters/pacmanL2.png', 'laboratory/monsters/pacmanR1.png', 'laboratory/monsters/pacmanR2.png', 'laboratory/monsters/zombieL1.png', 'laboratory/monsters/zombieL2.png', 'laboratory/monsters/zombieR1.png', 'laboratory/monsters/zombieR2.png', 'laboratory/monsters/zombieSL1.png', 'laboratory/monsters/zombieSL2.png', 'laboratory/monsters/zombieSR1.png', 'laboratory/monsters/zombieSR2.png', 'laboratory/obstacles/grass.png', 'laboratory/obstacles/teleport.png'];
  Loader.prototype.run = function() {
    var image, img, _i, _len, _ref, _results;
    _ref = this.images;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      image = _ref[_i];
      img = new Image;
      img.addEventListener('load', this.newLoaded, false);
      _results.push(img.src = "../images/" + image);
    }
    return _results;
  };
  Loader.prototype.newLoaded = function() {
    var _ref;
    if ((_ref = this.counter) == null) {
      this.counter = 0;
    }
    this.counter++;
    if (this.counter === this.images.length) {
      return this.allLoaded();
    }
  };
  Loader.prototype.allLoaded = function() {
    return this.game.run('menu');
  };
  return Loader;
})();
Manual = (function() {
  __extends(Manual, Awesome.Scene);
  function Manual() {
    Manual.__super__.constructor.apply(this, arguments);
  }
  Manual.prototype.name = 'manual';
  Manual.add(Awesome.Entities.Button, {
    position: [350, 30],
    size: [100, 50],
    text: 'Back'
  });
  Manual.add(Awesome.Entities.Text, {
    position: [100, 100],
    size: [600, 1000],
    text: "Awesome!"
  });
  Manual.prototype.run = function() {
    var buttons;
    buttons = this.getEntitiesByTag('button');
    return buttons[0].bind('click', __bind(function() {
      return this.game.run('menu');
    }, this));
  };
  return Manual;
})();
Team = (function() {
  __extends(Team, Awesome.Scene);
  function Team() {
    Team.__super__.constructor.apply(this, arguments);
  }
  Team.prototype.name = 'team';
  Team.add(Awesome.Entities.Button, {
    position: [350, 30],
    size: [100, 50],
    text: 'Back'
  });
  Team.add(Awesome.Entities.Text, {
    position: [100, 100],
    size: [600, 1000],
    text: "Awesome!"
  });
  Team.prototype.run = function() {
    var buttons;
    buttons = this.getEntitiesByTag('button');
    return buttons[0].bind('click', __bind(function() {
      return this.game.run('menu');
    }, this));
  };
  return Team;
})();
WinScreen = (function() {
  __extends(WinScreen, Awesome.Scene);
  function WinScreen() {
    WinScreen.__super__.constructor.apply(this, arguments);
  }
  WinScreen.prototype.name = 'winScreen';
  WinScreen.add(Awesome.Entities.Text, {
    position: [350, 100],
    size: [100, 50],
    align: 'center',
    fontSize: 30,
    text: "Win"
  });
  WinScreen.add(Awesome.Entities.Text, {
    position: [200, 200],
    size: [400, 50],
    align: 'center',
    fontSize: 25,
    text: "You've destroyed the world in "
  });
  WinScreen.prototype.run = function() {
    var diff, minutes, seconds, texts;
    texts = this.getEntitiesByTag('text');
    diff = (new Date).getTime() - this.game.startTime.getTime();
    diff /= 1000;
    diff = Math.floor(diff);
    minutes = Math.floor(diff / 60);
    seconds = diff - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : "" + seconds;
    texts[1].attrs.text += "" + minutes + ":" + seconds;
    return this.playAudio('rem-end_of_the_world.mp3');
  };
  return WinScreen;
})();
FlyingLandRenderer = (function() {
  __extends(FlyingLandRenderer, Awesome.Rendering.EntityRenderer);
  function FlyingLandRenderer() {
    FlyingLandRenderer.__super__.constructor.apply(this, arguments);
  }
  FlyingLandRenderer.prototype.createElement = function() {
    FlyingLandRenderer.__super__.createElement.apply(this, arguments);
    this.el.left = document.createElement('div');
    this.el.middle = document.createElement('div');
    this.el.right = document.createElement('div');
    this.el.appendChild(this.el.left);
    this.el.appendChild(this.el.middle);
    return this.el.appendChild(this.el.right);
  };
  FlyingLandRenderer.prototype.setupStyles = function() {
    FlyingLandRenderer.__super__.setupStyles.apply(this, arguments);
    return this.el.left.style.float = this.el.middle.style.float = this.el.right.style.float = "left";
  };
  FlyingLandRenderer.prototype.set = function(name, value) {
    if (name !== 'background') {
      return FlyingLandRenderer.__super__.set.apply(this, arguments);
    } else {
      _.extend(this.el.left.style, this.getCssValue('background', value[0]));
      _.extend(this.el.middle.style, this.getCssValue('background', value[1]));
      return _.extend(this.el.right.style, this.getCssValue('background', value[2]));
    }
  };
  _.extend(FlyingLandRenderer.object('css'), {
    size: function(s) {
      var el;
      el = this.renderer.el;
      el.left.style.width = el.right.style.width = el.left.style.height = el.right.style.height = s[1] + "px";
      el.middle.style.width = s[0] - 40 + "px";
      el.middle.style.height = s[1] + "px";
      return {
        width: s[0] + "px",
        height: s[1] + "px"
      };
    }
  });
  return FlyingLandRenderer;
})();
CandyLand = (function() {
  var Dadcane, Fanmallow, FlyingLand, Grankie, Land, Map, Momonut, Rock, TallGrass, Tree;
  __extends(CandyLand, Level);
  function CandyLand() {
    CandyLand.__super__.constructor.apply(this, arguments);
  }
  CandyLand.prototype.name = 'candyLand';
  CandyLand.Land = Land = (function() {
    __extends(Land, Awesome.Entity);
    function Land() {
      Land.__super__.constructor.apply(this, arguments);
    }
    Land.prototype.$background = 'candyland/map/land.png';
    Land.prototype.$bgRepeat = 'x';
    Land.prototype.$z = 0;
    Land.tag('static');
    return Land;
  })();
  CandyLand.FlyingLand = FlyingLand = (function() {
    __extends(FlyingLand, Awesome.Entity);
    function FlyingLand() {
      FlyingLand.__super__.constructor.apply(this, arguments);
    }
    FlyingLand.prototype.$background = ['candyland/map/1.png', 'candyland/map/2.png', 'candyland/map/3.png'];
    FlyingLand.prototype.$z = 0;
    FlyingLand.tag('static');
    FlyingLand.prototype.rendererClass = FlyingLandRenderer;
    return FlyingLand;
  })();
  CandyLand.Tree = Tree = (function() {
    __extends(Tree, Awesome.Entity);
    function Tree() {
      Tree.__super__.constructor.apply(this, arguments);
    }
    Tree.prototype.$background = 'candyland/obstacles/tree.png';
    Tree.prototype.$size = [80, 90];
    Tree.prototype.$z = 2;
    Tree.tag('visible');
    return Tree;
  })();
  CandyLand.TallGrass = TallGrass = (function() {
    __extends(TallGrass, Awesome.Entity);
    function TallGrass() {
      TallGrass.__super__.constructor.apply(this, arguments);
    }
    TallGrass.prototype.$background = 'candyland/obstacles/grass.png';
    TallGrass.prototype.$size = [50, 50];
    TallGrass.prototype.$z = 2;
    TallGrass.tag('visible');
    return TallGrass;
  })();
  CandyLand.Rock = Rock = (function() {
    __extends(Rock, Awesome.Entity);
    function Rock() {
      Rock.__super__.constructor.apply(this, arguments);
    }
    Rock.prototype.$background = 'candyland/obstacles/stone.png';
    Rock.prototype.$size = [50, 50];
    Rock.prototype.$z = 2;
    Rock.tag('visible');
    return Rock;
  })();
  CandyLand.Dadcane = Dadcane = (function() {
    __extends(Dadcane, Enemy);
    function Dadcane() {
      Dadcane.__super__.constructor.apply(this, arguments);
    }
    Dadcane.prototype.$size = [60, 100];
    Dadcane.prototype.$walkingAnimation = {
      normal: {
        left: ['candyland/monsters/dadcaneL1.png', 'candyland/monsters/dadcaneL2.png'],
        right: ['candyland/monsters/dadcaneR1.png', 'candyland/monsters/dadcaneR2.png']
      },
      following: {
        left: ['candyland/monsters/dadcaneSL1.png', 'candyland/monsters/dadcaneSL2.png'],
        right: ['candyland/monsters/dadcaneSR1.png', 'candyland/monsters/dadcaneSR2.png']
      }
    };
    return Dadcane;
  })();
  CandyLand.Fanmallow = Fanmallow = (function() {
    __extends(Fanmallow, Enemy);
    function Fanmallow() {
      Fanmallow.__super__.constructor.apply(this, arguments);
    }
    Fanmallow.prototype.$size = [40, 60];
    Fanmallow.prototype.$walkingAnimation = {
      normal: {
        left: ['candyland/monsters/fanmallowL1.png', 'candyland/monsters/fanmallowL2.png'],
        right: ['candyland/monsters/fanmallowR1.png', 'candyland/monsters/fanmallowR2.png']
      },
      following: {
        left: ['candyland/monsters/fanmallowSL1.png', 'candyland/monsters/fanmallowSL2.png'],
        right: ['candyland/monsters/fanmallowSR1.png', 'candyland/monsters/fanmallowSR2.png']
      }
    };
    return Fanmallow;
  })();
  CandyLand.Grankie = Grankie = (function() {
    __extends(Grankie, Enemy);
    function Grankie() {
      Grankie.__super__.constructor.apply(this, arguments);
    }
    Grankie.prototype.$size = [60, 80];
    Grankie.prototype.$walkingAnimation = {
      normal: {
        left: ['candyland/monsters/grankieL1.png', 'candyland/monsters/grankieL2.png'],
        right: ['candyland/monsters/grankieR1.png', 'candyland/monsters/grankieR2.png']
      },
      following: {
        left: ['candyland/monsters/grankieSL1.png', 'candyland/monsters/grankieSL2.png'],
        right: ['candyland/monsters/grankieSR1.png', 'candyland/monsters/grankieSR2.png']
      }
    };
    return Grankie;
  })();
  CandyLand.Momonut = Momonut = (function() {
    __extends(Momonut, Enemy);
    function Momonut() {
      Momonut.__super__.constructor.apply(this, arguments);
    }
    Momonut.prototype.$size = [60, 80];
    Momonut.prototype.$walkingAnimation = {
      normal: {
        left: ['candyland/monsters/momonutL1.png', 'candyland/monsters/momonutL2.png'],
        right: ['candyland/monsters/momonutR1.png', 'candyland/monsters/momonutR2.png']
      },
      following: {
        left: ['candyland/monsters/momonutSL1.png', 'candyland/monsters/momonutSL2.png'],
        right: ['candyland/monsters/momonutSR1.png', 'candyland/monsters/momonutSR2.png']
      }
    };
    return Momonut;
  })();
  CandyLand.Map = Map = (function() {
    __extends(Map, Awesome.Map);
    function Map() {
      Map.__super__.constructor.apply(this, arguments);
    }
    Map.add(Land, {
      position: [0, 350],
      size: [5000, 50]
    });
    Map.add(FlyingLand, {
      position: [200, 300],
      size: [100, 20]
    });
    Map.add(FlyingLand, {
      position: [320, 260],
      size: [100, 20]
    });
    Map.add(FlyingLand, {
      position: [440, 200],
      size: [1500, 20]
    });
    Map.add(Tree, {
      position: [500, 260]
    });
    Map.add(FlyingLand, {
      position: [800, 150],
      size: [100, 20]
    });
    Map.add(FlyingLand, {
      position: [650, 100],
      size: [100, 20]
    });
    Map.add(Dadcane, {
      position: [800, 250],
      direction: 'left'
    });
    Map.add(Momonut, {
      position: [900, 250],
      direction: 'right'
    });
    Map.add(Rock, {
      position: [1000, 150]
    });
    Map.add(Grankie, {
      position: [1200, 100],
      direction: 'right'
    });
    Map.add(Fanmallow, {
      position: [1200, 250],
      direction: 'left'
    });
    Map.add(Grankie, {
      position: [1400, 250],
      direction: 'left'
    });
    Map.add(TallGrass, {
      position: [1500, 150]
    });
    Map.add(Tree, {
      position: [1750, 110]
    });
    Map.add(FlyingLand, {
      position: [2200, 280],
      size: [280, 20]
    });
    Map.add(Tree, {
      position: [2300, 190]
    });
    Map.add(FlyingLand, {
      position: [2600, 200],
      size: [600, 20]
    });
    Map.add(Dadcane, {
      position: [2800, 100],
      direction: 'right'
    });
    Map.add(Momonut, {
      position: [2940, 120],
      direction: 'left'
    });
    Map.add(TallGrass, {
      position: [2800, 300]
    });
    Map.add(TallGrass, {
      position: [2950, 300]
    });
    Map.add(Rock, {
      position: [3400, 300]
    });
    Map.add(FlyingLand, {
      position: [3600, 300],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3670, 160],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3670, 260],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3740, 220],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3810, 180],
      size: [500, 20]
    });
    Map.add(Fanmallow, {
      position: [4000, 100],
      direction: 'left'
    });
    Map.add(FlyingLand, {
      position: [4200, 220],
      size: [1000, 20]
    });
    Map.add(Fanmallow, {
      position: [4500, 150],
      direction: 'left'
    });
    Map.add(End, {
      position: [4800, 130]
    });
    return Map;
  })();
  CandyLand.prototype.$size = [5000, 400];
  CandyLand.prototype.$map = CandyLand.Map;
  CandyLand.prototype.run = function() {
    CandyLand.__super__.run.apply(this, arguments);
    return this.playAudio('recess_monkey-marshmallow_farm.mp3');
  };
  CandyLand.prototype.runNextScene = function() {
    return this.game.run('tralalalandia', this.playerClass);
  };
  return CandyLand;
}).call(this);
Tralalalandia = (function() {
  var Bunny, Edward, FlyingLand, Happiness, Land, Map, Rainbow, Rainicorn, TallGrass;
  __extends(Tralalalandia, Level);
  function Tralalalandia() {
    Tralalalandia.__super__.constructor.apply(this, arguments);
  }
  Tralalalandia.prototype.name = 'tralalalandia';
  Tralalalandia.FlyingLand = FlyingLand = (function() {
    __extends(FlyingLand, Awesome.Entity);
    function FlyingLand() {
      FlyingLand.__super__.constructor.apply(this, arguments);
    }
    FlyingLand.prototype.$background = ['tralalalandia/map/1.png', 'tralalalandia/map/2.png', 'tralalalandia/map/3.png'];
    FlyingLand.prototype.$z = 0;
    FlyingLand.tag('static');
    FlyingLand.prototype.rendererClass = FlyingLandRenderer;
    return FlyingLand;
  })();
  Tralalalandia.Land = Land = (function() {
    __extends(Land, Awesome.Entity);
    function Land() {
      Land.__super__.constructor.apply(this, arguments);
    }
    Land.prototype.$background = 'tralalalandia/map/land.png';
    Land.prototype.$bgRepeat = 'x';
    Land.prototype.$z = 0;
    Land.tag('static');
    return Land;
  })();
  Tralalalandia.TallGrass = TallGrass = (function() {
    __extends(TallGrass, Awesome.Entity);
    function TallGrass() {
      TallGrass.__super__.constructor.apply(this, arguments);
    }
    TallGrass.prototype.$background = 'tralalalandia/obstacles/grass.png';
    TallGrass.prototype.$size = [50, 50];
    TallGrass.prototype.$z = 2;
    TallGrass.tag('visible');
    return TallGrass;
  })();
  Tralalalandia.Rainbow = Rainbow = (function() {
    __extends(Rainbow, Awesome.Entity);
    function Rainbow() {
      Rainbow.__super__.constructor.apply(this, arguments);
    }
    Rainbow.prototype.$background = 'tralalalandia/obstacles/rainbow.png';
    Rainbow.prototype.$size = [80, 90];
    Rainbow.prototype.$z = 2;
    Rainbow.tag('visible');
    return Rainbow;
  })();
  Tralalalandia.Bunny = Bunny = (function() {
    __extends(Bunny, Enemy);
    function Bunny() {
      Bunny.__super__.constructor.apply(this, arguments);
    }
    Bunny.prototype.$size = [50, 70];
    Bunny.prototype.$walkingAnimation = {
      normal: {
        left: ['tralalalandia/monsters/bunnyL1.png', 'tralalalandia/monsters/bunnyL2.png'],
        right: ['tralalalandia/monsters/bunnyR1.png', 'tralalalandia/monsters/bunnyR2.png']
      },
      following: {
        left: ['tralalalandia/monsters/bunnySL1.png', 'tralalalandia/monsters/bunnySL2.png'],
        right: ['tralalalandia/monsters/bunnySR1.png', 'tralalalandia/monsters/bunnySR2.png']
      }
    };
    return Bunny;
  })();
  Tralalalandia.Edward = Edward = (function() {
    __extends(Edward, Enemy);
    function Edward() {
      Edward.__super__.constructor.apply(this, arguments);
    }
    Edward.prototype.$size = [60, 90];
    Edward.prototype.$walkingAnimation = {
      normal: {
        left: ['tralalalandia/monsters/edwardL1.png', 'tralalalandia/monsters/edwardL2.png'],
        right: ['tralalalandia/monsters/edwardR1.png', 'tralalalandia/monsters/edwardR2.png']
      },
      following: {
        left: ['tralalalandia/monsters/edwardSL1.png', 'tralalalandia/monsters/edwardSL2.png'],
        right: ['tralalalandia/monsters/edwardSR1.png', 'tralalalandia/monsters/edwardSR2.png']
      }
    };
    return Edward;
  })();
  Tralalalandia.Happiness = Happiness = (function() {
    __extends(Happiness, Enemy);
    function Happiness() {
      Happiness.__super__.constructor.apply(this, arguments);
    }
    Happiness.prototype.$size = [50, 50];
    Happiness.prototype.$walkingAnimation = {
      normal: {
        left: ['tralalalandia/monsters/happinessL1.png', 'tralalalandia/monsters/happinessL2.png'],
        right: ['tralalalandia/monsters/happinessR1.png', 'tralalalandia/monsters/happinessR2.png']
      },
      following: {
        left: ['tralalalandia/monsters/happinessSL1.png', 'tralalalandia/monsters/happinessSL2.png'],
        right: ['tralalalandia/monsters/happinessSR1.png', 'tralalalandia/monsters/happinessSR2.png']
      }
    };
    return Happiness;
  })();
  Tralalalandia.Rainicorn = Rainicorn = (function() {
    __extends(Rainicorn, Enemy);
    function Rainicorn() {
      Rainicorn.__super__.constructor.apply(this, arguments);
    }
    Rainicorn.prototype.$size = [100, 70];
    Rainicorn.prototype.$walkingAnimation = {
      normal: {
        left: ['tralalalandia/monsters/rainicornL1.png', 'tralalalandia/monsters/rainicornL2.png'],
        right: ['tralalalandia/monsters/rainicornR1.png', 'tralalalandia/monsters/rainicornR2.png']
      },
      following: {
        left: ['tralalalandia/monsters/rainicornSL1.png', 'tralalalandia/monsters/rainicornSL2.png'],
        right: ['tralalalandia/monsters/rainicornSR1.png', 'tralalalandia/monsters/rainicornSR2.png']
      }
    };
    return Rainicorn;
  })();
  Tralalalandia.Map = Map = (function() {
    __extends(Map, Awesome.Map);
    function Map() {
      Map.__super__.constructor.apply(this, arguments);
    }
    Map.add(Land, {
      position: [0, 350],
      size: [5000, 50]
    });
    Map.add(FlyingLand, {
      position: [200, 300],
      size: [1000, 20]
    });
    Map.add(TallGrass, {
      position: [300, 250]
    });
    Map.add(TallGrass, {
      position: [500, 250]
    });
    Map.add(TallGrass, {
      position: [700, 250]
    });
    Map.add(TallGrass, {
      position: [900, 250]
    });
    Map.add(FlyingLand, {
      position: [700, 240],
      size: [100, 20]
    });
    Map.add(Bunny, {
      position: [370, 280],
      direction: 'right'
    });
    Map.add(Edward, {
      position: [570, 260],
      direction: 'right'
    });
    Map.add(Rainicorn, {
      position: [770, 280],
      direction: 'right'
    });
    Map.add(Rainbow, {
      position: [1300, 260]
    });
    Map.add(FlyingLand, {
      position: [1450, 300],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [1600, 300],
      size: [300, 20]
    });
    Map.add(Happiness, {
      position: [1625, 200],
      direction: 'left',
      randomSomething: 48
    });
    Map.add(Happiness, {
      position: [1925, 200],
      direction: 'left',
      randomSomething: 48
    });
    Map.add(TallGrass, {
      position: [2200, 300]
    });
    Map.add(FlyingLand, {
      position: [2300, 300],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [2400, 250],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [2500, 200],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [2700, 200],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [2900, 200],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3100, 200],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3300, 200],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3500, 250],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3690, 200],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3900, 250],
      size: [300, 20]
    });
    Map.add(Bunny, {
      position: [2800, 280]
    });
    Map.add(Edward, {
      position: [3000, 260]
    });
    Map.add(Rainicorn, {
      position: [3300, 280]
    });
    Map.add(Happiness, {
      position: [3500, 300]
    });
    Map.add(Edward, {
      position: [3800, 260]
    });
    Map.add(Rainbow, {
      position: [4300, 260]
    });
    Map.add(TallGrass, {
      position: [4500, 300]
    });
    Map.add(End, {
      position: [4700, 260]
    });
    return Map;
  })();
  Tralalalandia.prototype.$size = [5000, 400];
  Tralalalandia.prototype.$map = Tralalalandia.Map;
  Tralalalandia.prototype.run = function() {
    Tralalalandia.__super__.run.apply(this, arguments);
    return this.playAudio('bobby_mcferrin-dont_worry_be_happy.mp3');
  };
  Tralalalandia.prototype.runNextScene = function() {
    return this.game.run('laboratory', this.playerClass);
  };
  return Tralalalandia;
}).call(this);
Laboratory = (function() {
  var Brain, Creeper, FlyingLand, Grass, Land, Map, Pacman, Teleport, Zombie;
  __extends(Laboratory, Level);
  function Laboratory() {
    Laboratory.__super__.constructor.apply(this, arguments);
  }
  Laboratory.prototype.name = 'laboratory';
  Laboratory.Land = Land = (function() {
    __extends(Land, Awesome.Entity);
    function Land() {
      Land.__super__.constructor.apply(this, arguments);
    }
    Land.prototype.$background = 'laboratory/map/land.png';
    Land.prototype.$bgRepeat = 'x';
    Land.prototype.$z = 0;
    Land.tag('static');
    return Land;
  })();
  Laboratory.FlyingLand = FlyingLand = (function() {
    __extends(FlyingLand, Awesome.Entity);
    function FlyingLand() {
      FlyingLand.__super__.constructor.apply(this, arguments);
    }
    FlyingLand.prototype.$background = ['laboratory/map/1.png', 'laboratory/map/2.png', 'laboratory/map/3.png'];
    FlyingLand.prototype.$z = 0;
    FlyingLand.tag('static');
    FlyingLand.prototype.rendererClass = FlyingLandRenderer;
    return FlyingLand;
  })();
  Laboratory.Teleport = Teleport = (function() {
    __extends(Teleport, Awesome.Entity);
    function Teleport() {
      Teleport.__super__.constructor.apply(this, arguments);
    }
    Teleport.prototype.$background = 'laboratory/obstacles/teleport.png';
    Teleport.prototype.$size = [60, 90];
    Teleport.prototype.$z = 2;
    Teleport.tag('visible');
    return Teleport;
  })();
  Laboratory.Grass = Grass = (function() {
    __extends(Grass, Awesome.Entity);
    function Grass() {
      Grass.__super__.constructor.apply(this, arguments);
    }
    Grass.prototype.$background = 'laboratory/obstacles/grass.png';
    Grass.prototype.$size = [50, 50];
    Grass.prototype.$z = 2;
    Grass.tag('visible');
    return Grass;
  })();
  Laboratory.Brain = Brain = (function() {
    __extends(Brain, Enemy);
    function Brain() {
      Brain.__super__.constructor.apply(this, arguments);
    }
    Brain.prototype.$size = [60, 100];
    Brain.prototype.$walkingAnimation = {
      normal: {
        left: ['laboratory/monsters/brainL1.png', 'laboratory/monsters/brainL2.png'],
        right: ['laboratory/monsters/brainR1.png', 'laboratory/monsters/brainR2.png']
      },
      following: {
        left: ['laboratory/monsters/brainL1.png', 'laboratory/monsters/brainL2.png'],
        right: ['laboratory/monsters/brainR1.png', 'laboratory/monsters/brainR2.png']
      }
    };
    return Brain;
  })();
  Laboratory.Creeper = Creeper = (function() {
    __extends(Creeper, Enemy);
    function Creeper() {
      Creeper.__super__.constructor.apply(this, arguments);
    }
    Creeper.prototype.$size = [60, 100];
    Creeper.prototype.$walkingAnimation = {
      normal: {
        left: ['laboratory/monsters/creeperL1.png', 'laboratory/monsters/creeperL2.png'],
        right: ['laboratory/monsters/creeperR1.png', 'laboratory/monsters/creeperR2.png']
      },
      following: {
        left: ['laboratory/monsters/creeperL1.png', 'laboratory/monsters/creeperL2.png'],
        right: ['laboratory/monsters/creeperR1.png', 'laboratory/monsters/creeperR2.png']
      }
    };
    return Creeper;
  })();
  Laboratory.Pacman = Pacman = (function() {
    __extends(Pacman, Enemy);
    function Pacman() {
      Pacman.__super__.constructor.apply(this, arguments);
    }
    Pacman.prototype.$size = [60, 60];
    Pacman.prototype.$walkAnimationSpeed = 10;
    Pacman.prototype.$walkingAnimation = {
      normal: {
        left: ['laboratory/monsters/pacmanL1.png', 'laboratory/monsters/pacmanL2.png'],
        right: ['laboratory/monsters/pacmanR1.png', 'laboratory/monsters/pacmanR2.png']
      },
      following: {
        left: ['laboratory/monsters/pacmanL1.png', 'laboratory/monsters/pacmanL2.png'],
        right: ['laboratory/monsters/pacmanR1.png', 'laboratory/monsters/pacmanR2.png']
      }
    };
    return Pacman;
  })();
  Laboratory.Zombie = Zombie = (function() {
    __extends(Zombie, Enemy);
    function Zombie() {
      Zombie.__super__.constructor.apply(this, arguments);
    }
    Zombie.prototype.$size = [60, 90];
    Zombie.prototype.$walkAnimationSpeed = 3;
    Zombie.prototype.$walkingAnimation = {
      normal: {
        left: ['laboratory/monsters/zombieL1.png', 'laboratory/monsters/zombieL2.png'],
        right: ['laboratory/monsters/zombieR1.png', 'laboratory/monsters/zombieR2.png']
      },
      following: {
        left: ['laboratory/monsters/zombieSL1.png', 'laboratory/monsters/zombieSL2.png'],
        right: ['laboratory/monsters/zombieSR1.png', 'laboratory/monsters/zombieSR2.png']
      }
    };
    return Zombie;
  })();
  Laboratory.Map = Map = (function() {
    __extends(Map, Awesome.Map);
    function Map() {
      Map.__super__.constructor.apply(this, arguments);
    }
    Map.add(Land, {
      position: [0, 350],
      size: [1300, 50]
    });
    Map.add(Zombie, {
      position: [100, 10],
      direction: 'right'
    });
    Map.add(Creeper, {
      position: [700, 250],
      direction: 'left'
    });
    Map.add(FlyingLand, {
      position: [400, 300],
      size: [100, 20]
    });
    Map.add(FlyingLand, {
      position: [500, 240],
      size: [100, 20]
    });
    Map.add(FlyingLand, {
      position: [600, 200],
      size: [400, 20]
    });
    Map.add(Pacman, {
      position: [900, 140],
      direction: 'left',
      randomSomething: 36
    });
    Map.add(Grass, {
      position: [700, 150]
    });
    Map.add(FlyingLand, {
      position: [625, 140],
      size: [50, 20]
    });
    Map.add(Grass, {
      position: [1100, 300]
    });
    Map.add(FlyingLand, {
      position: [1300, 280],
      size: [100, 20]
    });
    Map.add(Land, {
      position: [1400, 350],
      size: [200, 50]
    });
    Map.add(FlyingLand, {
      position: [1550, 300],
      size: [400, 20]
    });
    Map.add(Land, {
      position: [1900, 350],
      size: [800, 50]
    });
    Map.add(Brain, {
      position: [1700, 200],
      direction: 'left',
      randomSomething: 48
    });
    Map.add(Brain, {
      position: [1800, 200],
      direction: 'right',
      randomSomething: 48
    });
    Map.add(FlyingLand, {
      position: [2200, 300],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [2300, 250],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [2400, 200],
      size: [400, 20]
    });
    Map.add(FlyingLand, {
      position: [2900, 300],
      size: [100, 20]
    });
    Map.add(Land, {
      position: [3150, 350],
      size: [1800, 50]
    });
    Map.add(Zombie, {
      position: [2600, 260],
      direction: 'right',
      randomSomething: 96
    });
    Map.add(Zombie, {
      position: [3300, 260],
      direction: 'left',
      randomSomething: 96
    });
    Map.add(FlyingLand, {
      position: [3300, 300],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3400, 250],
      size: [50, 20]
    });
    Map.add(FlyingLand, {
      position: [3500, 200],
      size: [400, 20]
    });
    Map.add(Teleport, {
      position: [3600, 260]
    });
    Map.add(Creeper, {
      position: [3700, 250],
      direction: 'right',
      randomSomething: 96
    });
    Map.add(Zombie, {
      position: [3770, 250],
      direction: 'right',
      randomSomething: 96
    });
    Map.add(Pacman, {
      position: [3840, 250],
      direction: 'right',
      randomSomething: 96
    });
    Map.add(End, {
      position: [4500, 260]
    });
    return Map;
  })();
  Laboratory.prototype.$size = [5000, 400];
  Laboratory.prototype.$color = '#A6A6A6';
  Laboratory.prototype.$map = Laboratory.Map;
  Laboratory.prototype.run = function() {
    Laboratory.__super__.run.apply(this, arguments);
    this.player.attrs.position = [300, 150];
    return this.playAudio('pinky_and_the_brain_opening.mp3');
  };
  Laboratory.prototype.runNextScene = function() {
    return this.game.run('winScreen');
  };
  return Laboratory;
}).call(this);
Player = (function() {
  __extends(Player, Awesome.Entity);
  Player.include('Collisions', 'Gravity', 'Walking', 'Jumping', 'Death', 'Crouching', 'Controls', 'WalkingAnimation');
  Player.tag('visible', 'player');
  Player.prototype.$z = 1;
  Player.prototype.$walkAnimationSpeed = 3;
  function Player() {
    Player.__super__.constructor.apply(this, arguments);
  }
  Player.prototype.die = function() {
    return this.scene.showDeathScreen();
  };
  return Player;
})();
Geek = (function() {
  __extends(Geek, Player);
  function Geek() {
    Geek.__super__.constructor.apply(this, arguments);
  }
  Geek.prototype.$size = [60, 100];
  Geek.prototype.$walkingAnimation = {
    standing: 'characters/geek/standing.png',
    crouching: 'characters/geek/crouching.png?',
    normal: {
      left: ['characters/geek/walkingL1.png', 'characters/geek/walkingL2.png'],
      right: ['characters/geek/walkingR1.png', 'characters/geek/walkingR2.png']
    }
  };
  return Geek;
})();
Hotass = (function() {
  __extends(Hotass, Player);
  function Hotass() {
    Hotass.__super__.constructor.apply(this, arguments);
  }
  Hotass.prototype.$size = [60, 100];
  Hotass.prototype.$walkingAnimation = {
    standing: 'characters/hotass/standing.png?',
    crouching: 'characters/hotass/crouching.png?',
    normal: {
      left: ['characters/hotass/walkingL1.png', 'characters/hotass/walkingL2.png'],
      right: ['characters/hotass/walkingR1.png', 'characters/hotass/walkingR2.png']
    }
  };
  return Hotass;
})();
Pirate = (function() {
  __extends(Pirate, Player);
  function Pirate() {
    Pirate.__super__.constructor.apply(this, arguments);
  }
  Pirate.prototype.$size = [60, 100];
  Pirate.prototype.$walkingAnimation = {
    standing: 'characters/pirate/standing.png',
    crouching: 'characters/pirate/crouching.png?',
    normal: {
      left: ['characters/pirate/walkingL1.png', 'characters/pirate/walkingL2.png'],
      right: ['characters/pirate/walkingR1.png', 'characters/pirate/walkingR2.png']
    }
  };
  return Pirate;
})();
Game = (function() {
  __extends(Game, Awesome.Game);
  function Game() {
    Game.__super__.constructor.apply(this, arguments);
  }
  Game.prototype.$name = 'awesome';
  Game.prototype.$size = [800, 400];
  Game.addScene(Loader);
  Game.addScene(Menu);
  Game.addScene(Manual);
  Game.addScene(Team);
  Game.addScene(CandyLand);
  Game.addScene(Tralalalandia);
  Game.addScene(Laboratory);
  Game.addScene(FailScreen);
  Game.addScene(WinScreen);
  Game.addScene(PlayerChooser);
  return Game;
})();
game = new Game;
game.run('loader');