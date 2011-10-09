var AttentionBar, CandyLand, Enemy, Game, Level, Menu, Ninja, Player, game;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Menu = (function() {
  __extends(Menu, Awesome.Scene);
  function Menu() {
    Menu.__super__.constructor.apply(this, arguments);
  }
  Menu.add(Awesome.Entities.Text, {
    text: 'Run'
  });
  return Menu;
})();
Level = (function() {
  __extends(Level, Awesome.Scene);
  function Level() {
    Level.__super__.constructor.apply(this, arguments);
  }
  return Level;
})();
Awesome.module('AI', (function() {
  function _Class() {}
  return _Class;
})());
Enemy = (function() {
  __extends(Enemy, Awesome.Entity);
  function Enemy() {
    Enemy.__super__.constructor.apply(this, arguments);
  }
  Enemy.include('Collisions', 'Gravity', 'Walking', 'AI');
  Enemy.prototype.$color = 'red';
  Enemy.prototype.$size = [40, 80];
  Enemy.prototype.$z = 1;
  return Enemy;
})();
AttentionBar = (function() {
  __extends(AttentionBar, Awesome.Entity);
  AttentionBar.prototype.$growSpeed = 0.5;
  AttentionBar.prototype.$fallSpeed = 0.2;
  AttentionBar.prototype.$position = [10, 10];
  AttentionBar.prototype.$size = [200, 10];
  AttentionBar.prototype.$z = 10;
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
CandyLand = (function() {
  var Grass, Map, Rock, TallGrass, Tree;
  __extends(CandyLand, Level);
  function CandyLand() {
    CandyLand.__super__.constructor.apply(this, arguments);
  }
  CandyLand.Grass = Grass = (function() {
    __extends(Grass, Awesome.Entity);
    function Grass() {
      Grass.__super__.constructor.apply(this, arguments);
    }
    Grass.prototype.$color = 'green';
    Grass.prototype.$z = 0;
    Grass.tag('static');
    return Grass;
  })();
  CandyLand.Tree = Tree = (function() {
    __extends(Tree, Awesome.Entity);
    function Tree() {
      Tree.__super__.constructor.apply(this, arguments);
    }
    Tree.prototype.$color = 'saddlebrown';
    Tree.prototype.$size = [50, 150];
    Tree.prototype.$z = 2;
    Tree.tag('hideout');
    return Tree;
  })();
  CandyLand.TallGrass = TallGrass = (function() {
    __extends(TallGrass, Awesome.Entity);
    function TallGrass() {
      TallGrass.__super__.constructor.apply(this, arguments);
    }
    TallGrass.prototype.$color = 'lawngreen';
    TallGrass.prototype.$size = [50, 50];
    TallGrass.prototype.$z = 2;
    TallGrass.tag('hideout');
    return TallGrass;
  })();
  CandyLand.Rock = Rock = (function() {
    __extends(Rock, Awesome.Entity);
    function Rock() {
      Rock.__super__.constructor.apply(this, arguments);
    }
    Rock.prototype.$color = 'gray';
    Rock.prototype.$size = [50, 50];
    Rock.prototype.$z = 2;
    Rock.tag('hideout');
    return Rock;
  })();
  CandyLand.Map = Map = (function() {
    __extends(Map, Awesome.Map);
    function Map() {
      Map.__super__.constructor.apply(this, arguments);
    }
    Map.add(CandyLand.Grass, {
      position: [0, 350],
      size: [5000, 50]
    });
    Map.add(CandyLand.Grass, {
      position: [200, 300],
      size: [100, 20]
    });
    Map.add(CandyLand.Grass, {
      position: [320, 250],
      size: [100, 20]
    });
    Map.add(CandyLand.Grass, {
      position: [440, 200],
      size: [100, 20]
    });
    Map.add(CandyLand.Tree, {
      position: [600, 200]
    });
    Map.add(CandyLand.TallGrass, {
      position: [800, 300]
    });
    Map.add(CandyLand.Rock, {
      position: [1000, 300]
    });
    Map.add(Enemy, {
      position: [1300, 10]
    });
    return Map;
  })();
  CandyLand.prototype.$size = [5000, 400];
  CandyLand.prototype.$map = CandyLand.Map;
  CandyLand.add(AttentionBar);
  CandyLand.prototype.run = function() {
    this.player = this.add(Ninja, {
      position: [10, 10]
    });
    return this.follow(this.player);
  };
  return CandyLand;
}).call(this);
Player = (function() {
  __extends(Player, Awesome.Entity);
  function Player() {
    Player.__super__.constructor.apply(this, arguments);
  }
  Player.include('Collisions', 'Gravity', 'Walking', 'Jumping', 'Crouching', 'Controls');
  Player.prototype.$z = 1;
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
Game = (function() {
  __extends(Game, Awesome.Game);
  function Game() {
    Game.__super__.constructor.apply(this, arguments);
  }
  Game.prototype.$name = 'awesome';
  Game.prototype.$size = [800, 400];
  Game.addScene('menu', Menu);
  Game.addScene('candyLand', CandyLand);
  return Game;
})();
game = new Game;
game.run('candyLand');