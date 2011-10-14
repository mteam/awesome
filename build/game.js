var AttentionBar, CandyLand, End, Enemy, FailScreen, Game, Hotass, Laboratory, Level, Menu, Ninja, Pirate, Player, PlayerChooser, SightRect, Tralalalandia, game;
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
      if (!bar.growing) {
        return bar.grow();
      }
    } else {
      if (bar.growing) {
        return bar.stopGrowing();
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
  Enemy.include('Collisions', 'Gravity', 'Walking', 'AI', 'Sight');
  Enemy.tag('visible', 'enemy');
  Enemy.prototype.$color = 'red';
  Enemy.prototype.$size = [40, 80];
  Enemy.prototype.$z = 1;
  return Enemy;
})();
End = (function() {
  __extends(End, Awesome.Entity);
  End.prototype.$size = [50, 100];
  End.prototype.$color = 'pink';
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
  __extends(AttentionBar, Awesome.Entity);
  AttentionBar.prototype.$growSpeed = 2;
  AttentionBar.prototype.$fallSpeed = 0.2;
  AttentionBar.prototype.$position = [10, 10];
  AttentionBar.prototype.$size = [200, 10];
  AttentionBar.prototype.$z = 10;
  AttentionBar.tag('attentionBar');
  function AttentionBar() {
    AttentionBar.__super__.constructor.apply(this, arguments);
    this.bind('tick', this.tick);
    this.attrs.set('attention', 0);
  }
  AttentionBar.prototype.getRenderer = function() {
    return new AttentionBar.Renderer(this);
  };
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
})();
AttentionBar.Renderer = (function() {
  __extends(Renderer, Awesome.Rendering.EntityRenderer);
  function Renderer() {
    Renderer.__super__.constructor.apply(this, arguments);
  }
  Renderer.prototype.setupStyles = function() {
    Renderer.__super__.setupStyles.apply(this, arguments);
    return this.el.style.border = "1px solid gray";
  };
  Renderer.prototype.appendToScene = function() {
    return this.entity.scene.renderer.appendElementToWrapper(this.el);
  };
  _(Renderer.object('css')).extend({
    attention: function(a) {
      return {
        backgroundImage: "-webkit-gradient(linear, left top, right top, color-stop(" + (a / 100) + ", red), color-stop(" + (a / 100) + ", white))"
      };
    }
  });
  return Renderer;
})();
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
    return this.getEntitiesByTag('button')[0].bind('click', __bind(function() {
      return this.game.run('playerChooser');
    }, this));
  };
  return Menu;
})();
Level = (function() {
  __extends(Level, Awesome.Scene);
  function Level() {
    Level.__super__.constructor.apply(this, arguments);
  }
  Level.add(AttentionBar);
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
    image: 'characters/Hotass/standing.png'
  });
  PlayerChooser.add(Awesome.Entities.Button, {
    size: [80, 120],
    position: [350, 180],
    image: 'characters/Ninja/standing.png'
  });
  PlayerChooser.add(Awesome.Entities.Button, {
    size: [80, 120],
    position: [450, 180],
    image: 'characters/Pirate/standing.png'
  });
  PlayerChooser.prototype.runLevel = function(player) {
    return this.game.run('candyLand', player);
  };
  PlayerChooser.prototype.run = function() {
    var buttons;
    buttons = this.getEntitiesByTag('button');
    buttons[0].bind('click', __bind(function() {
      return this.runLevel(Hotass);
    }, this));
    buttons[1].bind('click', __bind(function() {
      return this.runLevel(Ninja);
    }, this));
    return buttons[2].bind('click', __bind(function() {
      return this.runLevel(Pirate);
    }, this));
  };
  return PlayerChooser;
})();
CandyLand = (function() {
  var FlyingLand, Land, Map, Rock, TallGrass, Tree;
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
    Land.prototype.$background = 'candyland/Map/land.png?1';
    Land.prototype.$bgRepeat = 'x';
    Land.prototype.$z = 0;
    Land.tag('static');
    return Land;
  })();
  CandyLand.FlyingLand = FlyingLand = (function() {
    var FlyingLandRenderer;
    __extends(FlyingLand, Awesome.Entity);
    function FlyingLand() {
      FlyingLand.__super__.constructor.apply(this, arguments);
    }
    FlyingLand.prototype.$background = ['candyland/Map/1.png', 'candyland/Map/2.png', 'candyland/Map/3.png'];
    FlyingLand.prototype.$z = 0;
    FlyingLand.tag('static');
    FlyingLand.Renderer = FlyingLandRenderer = (function() {
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
    FlyingLand.prototype.getRenderer = function() {
      return new FlyingLand.Renderer(this);
    };
    return FlyingLand;
  }).call(this);
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
  CandyLand.Map = Map = (function() {
    __extends(Map, Awesome.Map);
    function Map() {
      Map.__super__.constructor.apply(this, arguments);
    }
    Map.add(CandyLand.Land, {
      position: [0, 350],
      size: [5000, 40]
    });
    Map.add(CandyLand.FlyingLand, {
      position: [200, 300],
      size: [100, 20]
    });
    Map.add(CandyLand.FlyingLand, {
      position: [320, 250],
      size: [100, 20]
    });
    Map.add(CandyLand.FlyingLand, {
      position: [440, 200],
      size: [1000, 20]
    });
    Map.add(CandyLand.Tree, {
      position: [600, 260]
    });
    Map.add(CandyLand.TallGrass, {
      position: [1200, 300]
    });
    Map.add(CandyLand.Rock, {
      position: [1000, 300]
    });
    Map.add(Enemy, {
      position: [1300, 250],
      direction: 'left'
    });
    Map.add(End, {
      position: [4500, 250]
    });
    return Map;
  })();
  CandyLand.prototype.$size = [5000, 400];
  CandyLand.prototype.$map = CandyLand.Map;
  CandyLand.prototype.runNextScene = function() {
    return this.game.run('tralalalandia', this.playerClass);
  };
  return CandyLand;
}).call(this);
Tralalalandia = (function() {
  __extends(Tralalalandia, Level);
  function Tralalalandia() {
    Tralalalandia.__super__.constructor.apply(this, arguments);
  }
  Tralalalandia.prototype.name = 'tralalalandia';
  Tralalalandia.prototype.runNextScene = function() {
    return this.game.run('laboratory', this.playerClass);
  };
  return Tralalalandia;
})();
Laboratory = (function() {
  __extends(Laboratory, Level);
  function Laboratory() {
    Laboratory.__super__.constructor.apply(this, arguments);
  }
  Laboratory.prototype.name = 'laboratory';
  Laboratory.prototype.runNextScene = function() {
    return this.game.run('winScreen');
  };
  return Laboratory;
})();
Player = (function() {
  __extends(Player, Awesome.Entity);
  Player.include('Collisions', 'Gravity', 'Walking', 'Jumping', 'Death', 'Crouching', 'Controls');
  Player.tag('visible', 'player');
  Player.prototype.$z = 1;
  function Player() {
    var bar;
    Player.__super__.constructor.apply(this, arguments);
    bar = this.scene.getEntitiesByTag('attentionBar')[0];
    bar.bind('full', __bind(function() {
      return this.die();
    }, this));
  }
  Player.prototype.die = function() {
    return this.scene.showDeathScreen();
  };
  return Player;
})();
Ninja = (function() {
  __extends(Ninja, Player);
  function Ninja() {
    Ninja.__super__.constructor.apply(this, arguments);
  }
  Ninja.prototype.$size = [40, 80];
  Ninja.prototype.$color = 'black';
  return Ninja;
})();
Hotass = (function() {
  __extends(Hotass, Player);
  function Hotass() {
    Hotass.__super__.constructor.apply(this, arguments);
  }
  Hotass.prototype.$size = [40, 80];
  Hotass.prototype.$color = 'blue';
  return Hotass;
})();
Pirate = (function() {
  __extends(Pirate, Player);
  function Pirate() {
    Pirate.__super__.constructor.apply(this, arguments);
  }
  Pirate.prototype.$size = [40, 80];
  Pirate.prototype.$color = 'brown';
  return Pirate;
})();
Game = (function() {
  __extends(Game, Awesome.Game);
  function Game() {
    Game.__super__.constructor.apply(this, arguments);
  }
  Game.prototype.$name = 'awesome';
  Game.prototype.$size = [800, 400];
  Game.addScene(Menu);
  Game.addScene(CandyLand);
  Game.addScene(Tralalalandia);
  Game.addScene(Laboratory);
  Game.addScene(FailScreen);
  Game.addScene(PlayerChooser);
  return Game;
})();
game = new Game;
game.run('menu');