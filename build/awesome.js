(function() {
  var AObject, FakeArray, entityIdCounter, movementRects;
  var __slice = Array.prototype.slice, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  _.mixin({
    startsWith: function(string, what) {
      return string.slice(0, what.length) === what;
    }
  });
  this.Awesome = {
    Entities: {},
    Modules: {},
    Rendering: {},
    Collisions: {}
  };
  Awesome.Object = AObject = (function() {
    AObject.array = function(name) {
      if (this.prototype.hasOwnProperty(name)) {
        return this.prototype[name];
      } else {
        if (this.prototype[name] != null) {
          return this.prototype[name] = _.clone(this.prototype[name]);
        } else {
          return this.prototype[name] = [];
        }
      }
    };
    AObject.origArray = function(name) {
      if (!this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = [];
      }
      return this.prototype[name];
    };
    AObject.object = function(name) {
      if (this.prototype.hasOwnProperty(name)) {
        return this.prototype[name];
      } else {
        if (this.prototype[name] != null) {
          return this.prototype[name] = _.clone(this.prototype[name]);
        } else {
          return this.prototype[name] = {};
        }
      }
    };
    AObject.include = function() {
      var key, module, modules, property, _i, _len, _ref, _ref2, _ref3, _results;
      modules = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = modules.length; _i < _len; _i++) {
        module = modules[_i];
        if (_.isString(module)) {
          module = Awesome.Modules[module];
        }
        _ref = module.classProperties;
        for (key in _ref) {
          property = _ref[key];
          this[key] = property;
        }
        _ref2 = module.instanceProperties;
        for (key in _ref2) {
          property = _ref2[key];
          this.prototype[key] = property;
        }
        if ((_ref3 = module.initClass) != null) {
          _ref3.apply(this);
        }
        _results.push(this.origArray('modules').push(module));
      }
      return _results;
    };
    function AObject() {
      var module, _i, _len, _ref, _ref2;
      if (this.modules != null) {
        _ref = this.modules;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          module = _ref[_i];
          if ((_ref2 = module.initInstance) != null) {
            _ref2.apply(this);
          }
        }
      }
    }
    Object.defineProperty(AObject.prototype, 'attrs', {
      get: function() {
        var _ref;
        return (_ref = this._attrContainer) != null ? _ref : this._attrContainer = new Awesome.AttributeContainer(this);
      }
    });
    return AObject;
  })();
  Awesome.Collisions.Rect = (function() {
    function Rect() {}
    Object.defineProperties(Rect.prototype, {
      wx: {
        get: function() {
          return this.w + this.x;
        }
      },
      hy: {
        get: function() {
          return this.h + this.y;
        }
      },
      mw: {
        get: function() {
          return this.x + this.w / 2;
        }
      },
      mh: {
        get: function() {
          return this.y + this.h / 2;
        }
      }
    });
    return Rect;
  })();
  Awesome.Collisions.EntityRect = (function() {
    __extends(EntityRect, Awesome.Collisions.Rect);
    function EntityRect(entity) {
      this.entity = entity;
    }
    Object.defineProperties(EntityRect.prototype, {
      x: {
        get: function() {
          return this.entity.attrs.position[0];
        }
      },
      y: {
        get: function() {
          return this.entity.attrs.position[1];
        }
      },
      w: {
        get: function() {
          return this.entity.attrs.size[0];
        }
      },
      h: {
        get: function() {
          return this.entity.attrs.size[1];
        }
      }
    });
    return EntityRect;
  })();
  movementRects = {};
  Awesome.Collisions.MovementRect = (function() {
    __extends(MovementRect, Awesome.Collisions.EntityRect);
    MovementRect.fromEntity = function(entity, x, y) {
      var rect, _name, _ref;
      rect = (_ref = movementRects[_name = entity.id]) != null ? _ref : movementRects[_name] = new this(entity, x, y);
      rect.mx = x;
      rect.my = y;
      return rect;
    };
    function MovementRect(entity, mx, my) {
      this.mx = mx;
      this.my = my;
      MovementRect.__super__.constructor.call(this, entity);
    }
    Object.defineProperties(MovementRect.prototype, {
      x: {
        get: function() {
          return this.entity.attrs.position[0] + this.mx;
        }
      },
      y: {
        get: function() {
          return this.entity.attrs.position[1] + this.my;
        }
      }
    });
    return MovementRect;
  })();
  Awesome.Collisions.Detector = (function() {
    __extends(Detector, Awesome.Object);
    function Detector() {
      Detector.__super__.constructor.apply(this, arguments);
    }
    Detector.prototype.detect = function(rect, other) {
      var overlapX, overlapY, side, upperSide, _ref, _ref2;
      _ref = this.isCollidingFromLeft(rect, other) ? ['left', rect.wx - other.x] : this.isCollidingFromRight(rect, other) ? ['right', other.wx - rect.x] : [null, 0], side = _ref[0], overlapX = _ref[1];
      _ref2 = this.isCollidingFromTop(rect, other) ? ['top', rect.hy - other.y] : this.isCollidingFromBottom(rect, other) ? ['bottom', other.hy - rect.y] : [null, 0], upperSide = _ref2[0], overlapY = _ref2[1];
      if (side && upperSide) {
        return {
          part: [upperSide, side],
          overlap: [overlapX, overlapY],
          direction: overlapX > overlapY ? upperSide : side
        };
      } else {
        return null;
      }
    };
    Detector.prototype.isCollidingFromLeft = function(rect, other) {
      return rect.wx > other.x && rect.mw < other.mw;
    };
    Detector.prototype.isCollidingFromRight = function(rect, other) {
      return rect.x < other.wx && rect.mw >= other.mw;
    };
    Detector.prototype.isCollidingFromTop = function(rect, other) {
      return rect.hy > other.y && rect.mh < other.mh;
    };
    Detector.prototype.isCollidingFromBottom = function(rect, other) {
      return rect.y < other.hy && rect.mh >= other.mh;
    };
    return Detector;
  })();
  Awesome.Module = (function() {
    __extends(Module, Awesome.Object);
    function Module(klass) {
      this.klass = klass;
    }
    Object.defineProperties(Module.prototype, {
      classProperties: {
        get: function() {
          var name, properties, property, _ref;
          properties = {};
          _ref = this.klass;
          for (name in _ref) {
            if (!__hasProp.call(_ref, name)) continue;
            property = _ref[name];
            if (name !== 'init' && name !== '__super__') {
              properties[name] = property;
            }
          }
          return properties;
        }
      },
      instanceProperties: {
        get: function() {
          var name, properties, property, _ref;
          properties = {};
          _ref = this.klass.prototype;
          for (name in _ref) {
            property = _ref[name];
            if (name !== 'constructor') {
              properties[name] = property;
            }
          }
          return properties;
        }
      },
      initClass: {
        get: function() {
          return this.klass.init;
        }
      },
      initInstance: {
        get: function() {
          return this.klass.prototype.constructor;
        }
      }
    });
    return Module;
  })();
  Awesome.module = function(name, klass) {
    var module;
    module = new Awesome.Module(klass);
    return Awesome.Modules[name] = module;
  };
  Awesome.module('Events', (function() {
    function _Class() {}
    _Class.bind = function(event, fn) {
      var _base, _ref;
      if ((_ref = (_base = this.object('classEvents'))[event]) == null) {
        _base[event] = [];
      }
      return this.object('classEvents')[event].push(fn);
    };
    _Class.prototype.bind = function(event, fn) {
      var _base, _ref, _ref2;
      if ((_ref = this.events) == null) {
        this.events = {};
      }
      if ((_ref2 = (_base = this.events)[event]) == null) {
        _base[event] = [];
      }
      this.events[event].push(fn);
      return this;
    };
    _Class.prototype.unbind = function(event, fn) {
      var events, index, _ref;
      if ((_ref = this.events) == null) {
        this.events = {};
      }
      events = this.events[event];
      if (events != null) {
        index = events.indexOf(fn);
        if (index > -1) {
          delete events[index];
        }
      }
      return this;
    };
    _Class.prototype.trigger = function() {
      var args, event, events, fn, _i, _len, _ref;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((_ref = this.events) == null) {
        this.events = {};
      }
      events = [];
      if (this.events[event] != null) {
        events = events.concat(this.events[event]);
      }
      if ((this.classEvents != null) && (this.classEvents[event] != null)) {
        events = events.concat(this.classEvents[event]);
      }
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        fn = events[_i];
        if (_(fn).isFunction()) {
          fn.apply(this, args);
        }
      }
      return this;
    };
    _Class.prototype.logEvent = function(event) {
      return this.bind(event, function() {
        return console.log(event);
      });
    };
    return _Class;
  })());
  Awesome.module('Gravity', (function() {
    function _Class() {}
    _Class.init = function() {
      return this.bind('tick', this.prototype.tick);
    };
    _Class.prototype.gravity = 0.4;
    _Class.prototype.tick = function() {
      var collisions, _ref;
      if ((_ref = this.gravitySpeed) == null) {
        this.gravitySpeed = 0;
      }
      collisions = this.colliding({
        "with": 'static',
        from: 'top'
      });
      if (collisions.length) {
        if (this.gravitySpeed > 0) {
          this.gravitySpeed = 0;
          this.attrs.position[1] -= collisions[0].overlap[1] - 0.1;
          return this.trigger('fall');
        }
      } else {
        this.attrs.position[1] += this.gravitySpeed;
        if (!(this.gravitySpeed > 50)) {
          return this.gravitySpeed += this.gravity;
        }
      }
    };
    return _Class;
  })());
  Awesome.module('Collisions', (function() {
    function _Class() {}
    _Class.prototype.detector = new Awesome.Collisions.Detector;
    _Class.prototype.colliding = function(_arg) {
      var collision, collisions, directions, entities, entity, movement, tag, _i, _len, _ref;
      tag = _arg["with"], directions = _arg.from, movement = _arg.movement;
      if (tag != null) {
        entities = this.scene.getEntitiesByTag(tag);
      } else {
        entities = this.scene.entities;
      }
      if (!_.isArray(directions)) {
        directions = [directions];
      }
      collisions = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entity = entities[_i];
        collision = this.detector.detect(this.getRect(), entity.getRect());
        if (collision && (collision.direction != null ? (_ref = collision.direction, __indexOf.call(directions, _ref) >= 0) : true)) {
          collisions.push(collision);
        }
      }
      return collisions;
    };
    return _Class;
  })());
  Awesome.module('Jumping', (function() {
    function _Class() {}
    _Class.init = function() {
      this.bind('tick', this.prototype.tick);
      return this.bind('fall', this.prototype.stopJumping);
    };
    _Class.prototype.$jump = 7;
    _Class.prototype.jump = function() {
      this.jumping = true;
      return this.trigger('jump');
    };
    _Class.prototype.stopJumping = function() {
      return this.jumping = false;
    };
    _Class.prototype.tick = function() {
      var collisions;
      if (this.jumping) {
        collisions = this.colliding({
          "with": 'static',
          from: 'bottom'
        });
        if (collisions.length) {
          return this.stopJumping();
        } else {
          return this.attrs.position[1] -= this.attrs.jump;
        }
      }
    };
    return _Class;
  })());
  Awesome.module('Crouching', (function() {
    function _Class() {}
    _Class.init = function() {
      return this.bind('jump', this.prototype.standUp);
    };
    _Class.prototype.crouch = function() {
      var move;
      if (!this.crouching) {
        this.crouching = true;
        move = this.attrs.size[1] /= 2;
        return this.attrs.position[1] += move;
      }
    };
    _Class.prototype.standUp = function() {
      var move;
      if (this.crouching) {
        this.crouching = false;
        move = this.attrs.size[1] *= 2;
        return this.attrs.position[1] -= move / 2;
      }
    };
    return _Class;
  })());
  Awesome.module('Walking', (function() {
    function _Class() {}
    _Class.init = function() {
      return this.bind('tick', this.prototype.tick);
    };
    _Class.prototype.$speed = 5;
    _Class.prototype.$direction = 'right';
    _Class.prototype.startWalking = function(direction) {
      switch (direction) {
        case 'left':
          this.walking = 'left';
          this.attrs.direction = 'left';
          return this.trigger('startWalking', this.walking);
        case 'right':
          this.walking = 'right';
          this.attrs.direction = 'right';
          return this.trigger('startWalking', this.walking);
      }
    };
    _Class.prototype.stopWalking = function() {
      this.walking = false;
      return this.trigger('stopWalking');
    };
    _Class.prototype.tick = function() {
      if (this.walking) {
        if (this.walking === 'left') {
          this.attrs.position[0] -= this.attrs.speed;
        }
        if (this.walking === 'right') {
          return this.attrs.position[0] += this.attrs.speed;
        }
      }
    };
    return _Class;
  })());
  Awesome.module('Controls', (function() {
    function _Class() {
      this.keyUp = __bind(this.keyUp, this);
      this.keyDown = __bind(this.keyDown, this);      window.addEventListener('keydown', this.keyDown, false);
      window.addEventListener('keyup', this.keyUp, false);
    }
    _Class.prototype.keyDown = function(e) {
      switch (e.keyCode) {
        case 37:
          return this.startWalking('left');
        case 39:
          return this.startWalking('right');
        case 38:
          return this.jump();
        case 40:
          return this.crouch();
      }
    };
    _Class.prototype.keyUp = function(e) {
      switch (e.keyCode) {
        case 37:
        case 39:
          return this.stopWalking();
        case 40:
          return this.standUp();
      }
    };
    return _Class;
  })());
  FakeArray = (function() {
    function FakeArray(realArray, callback) {
      var key, value, _len, _ref;
      this.realArray = realArray;
      this.callback = callback;
      _ref = this.realArray;
      for (key = 0, _len = _ref.length; key < _len; key++) {
        value = _ref[key];
        this.addIndex(key);
        this[key] = value;
      }
    }
    FakeArray.prototype.addIndex = function(index) {
      return Object.defineProperty(this, index, {
        get: function() {
          return this.realArray[index];
        },
        set: function(value) {
          this.realArray[index] = value;
          return this.callback(index, value, this);
        }
      });
    };
    return FakeArray;
  })();
  Awesome.AttributeContainer = (function() {
    __extends(AttributeContainer, Awesome.Object);
    AttributeContainer.include('Events');
    function AttributeContainer(object) {
      var name, properties, property;
      properties = {};
      Object.defineProperties(this, {
        object: {
          get: function() {
            return object;
          }
        },
        properties: {
          get: function() {
            return properties;
          }
        }
      });
      for (name in object) {
        property = object[name];
        if (_(name).startsWith('$')) {
          this.set(name.substr(1), property);
        }
      }
    }
    AttributeContainer.prototype.set = function(name, value) {
      if (this[name] == null) {
        this.setupProperty(name);
      }
      return this[name] = value;
    };
    AttributeContainer.prototype.setupProperty = function(name) {
      return Object.defineProperty(this, name, {
        get: function() {
          return this.properties[name];
        },
        set: function(value) {
          this.properties[name] = _.isArray(value) ? new FakeArray(_.clone(value), __bind(function(index, newValue, array) {
            return this.trigger('change', name, array);
          }, this)) : value;
          return this.trigger('change', name, this.properties[name]);
        },
        enumerable: true
      });
    };
    return AttributeContainer;
  })();
  entityIdCounter = 0;
  Awesome.Entity = (function() {
    __extends(Entity, Awesome.Object);
    Entity.include('Events');
    Entity.tag = function() {
      var tag, tags, _i, _len, _results;
      tags = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = tags.length; _i < _len; _i++) {
        tag = tags[_i];
        _results.push(this.array('tags').push(tag));
      }
      return _results;
    };
    Entity.prototype.tagged = function(tag) {
      if (this.tags != null) {
        return __indexOf.call(this.tags, tag) >= 0;
      } else {
        return false;
      }
    };
    function Entity(scene) {
      this.scene = scene;
      Entity.__super__.constructor.apply(this, arguments);
      this.id = entityIdCounter++;
      this.renderer = this.getRenderer();
      this.scene.game.timer.bind('tick', __bind(function() {
        return this.trigger('tick');
      }, this));
    }
    Entity.prototype.getRenderer = function() {
      return new Awesome.Rendering.EntityRenderer(this);
    };
    Entity.prototype.getRect = function() {
      var _ref;
      return (_ref = this.rect) != null ? _ref : this.rect = new Awesome.Collisions.EntityRect(this);
    };
    return Entity;
  })();
  Awesome.Timer = (function() {
    __extends(Timer, Awesome.Object);
    Timer.include('Events');
    function Timer(fps) {
      this.fps = fps != null ? fps : 60;
      this.tick = __bind(this.tick, this);
    }
    Timer.prototype.tick = function() {
      return this.trigger('tick');
    };
    Timer.prototype.start = function() {
      return this.timer = window.setInterval(this.tick, 1000 / this.fps);
    };
    Timer.prototype.stop = function() {
      return window.clearInterval(this.timer);
    };
    return Timer;
  })();
  Awesome.Scene = (function() {
    __extends(Scene, Awesome.Object);
    Scene.include('Events');
    Scene.add = function(entity, properties) {
      return this.array('classEntities').push({
        entity: entity,
        properties: properties
      });
    };
    function Scene(game, name) {
      var entity, properties, _i, _len, _ref, _ref2, _ref3;
      this.game = game;
      this.name = name;
      if (!this.size) {
        this.size = this.game.size;
      }
      this.renderer = new Awesome.Rendering.SceneRenderer(this);
      this.entities = {};
      if (this.classEntities != null) {
        _ref = this.classEntities;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          _ref2 = _ref[_i], entity = _ref2.entity, properties = _ref2.properties;
          this.add(entity, properties);
        }
      }
      if ((_ref3 = this.attrs.map) != null) {
        _ref3.addEntitiesToScene(this);
      }
      if (this.run != null) {
        this.run();
      }
    }
    Scene.prototype.add = function(entity, properties) {
      var instance, name, value;
      instance = new entity(this);
      if (properties != null) {
        for (name in properties) {
          value = properties[name];
          instance.attrs.set(name, value);
        }
      }
      this.entities[instance.id] = instance;
      return instance;
    };
    Scene.prototype.follow = function(entity) {
      return this.renderer.follow(entity);
    };
    Scene.prototype.getEntitiesByTag = function(tag) {
      var entity, id, _ref, _results;
      _ref = this.entities;
      _results = [];
      for (id in _ref) {
        entity = _ref[id];
        if (entity.tagged(tag)) {
          _results.push(entity);
        }
      }
      return _results;
    };
    return Scene;
  })();
  Awesome.Game = (function() {
    __extends(Game, Awesome.Object);
    Game.addScene = function(name, scene) {
      return this.object('scenes')[name] = scene;
    };
    function Game() {
      this.renderer = new Awesome.Rendering.GameRenderer(this);
      this.timer = new Awesome.Timer;
      this.timer.start();
    }
    Game.prototype.run = function(name) {
      var instance, scene;
      scene = this.scenes[name];
      instance = new scene(this, name);
      return this.runningScene = instance;
    };
    return Game;
  })();
  Awesome.Map = (function() {
    __extends(Map, Awesome.Object);
    function Map() {
      Map.__super__.constructor.apply(this, arguments);
    }
    Map.add = function(entity, properties) {
      return this.array('entities').push({
        entity: entity,
        properties: properties
      });
    };
    Map.addEntitiesToScene = function(scene) {
      var entity, properties, _i, _len, _ref, _ref2, _results;
      _ref = this.array('entities');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref2 = _ref[_i], entity = _ref2.entity, properties = _ref2.properties;
        _results.push(scene.add(entity, properties));
      }
      return _results;
    };
    return Map;
  })();
  Awesome.Rendering.EntityRenderer = (function() {
    __extends(EntityRenderer, Awesome.Object);
    function EntityRenderer(entity) {
      this.entity = entity;
      this.set = __bind(this.set, this);
      this.createElement();
      this.appendToScene();
      this.setupStyles();
      this.bind();
    }
    EntityRenderer.prototype.createElement = function() {
      this.el = document.createElement('div');
      return this.el.id = "entity_" + this.entity.id;
    };
    EntityRenderer.prototype.appendToScene = function() {
      return this.entity.scene.renderer.appendElement(this.el);
    };
    EntityRenderer.prototype.setupStyles = function() {
      var name, value, _ref, _results;
      this.el.style.position = 'absolute';
      _ref = this.entity.attrs;
      _results = [];
      for (name in _ref) {
        value = _ref[name];
        _results.push(this.set(name, value));
      }
      return _results;
    };
    EntityRenderer.prototype.bind = function() {
      return this.entity.attrs.bind('change', this.set);
    };
    EntityRenderer.prototype.set = function(name, value) {
      var _ref;
      if (value == null) {
        return;
      }
      if (name === 'position') {
        this.setTitle(value);
      }
      return _.extend(this.el.style, (_ref = this.css[name]) != null ? _ref.call(this.entity, value) : void 0);
    };
    EntityRenderer.prototype.setTitle = function(pos) {
      if (pos != null) {
        return this.el.title = "[" + pos[0] + ", " + pos[1] + "]";
      }
    };
    EntityRenderer.prototype.css = {
      position: function(p) {
        return {
          left: p[0] + "px",
          top: p[1] + "px"
        };
      },
      size: function(s) {
        return {
          width: s[0] + "px",
          height: s[1] + "px"
        };
      },
      color: function(c) {
        return {
          backgroundColor: c
        };
      },
      z: function(z) {
        return {
          zIndex: z
        };
      }
    };
    return EntityRenderer;
  })();
  Awesome.Rendering.SceneRenderer = (function() {
    __extends(SceneRenderer, Awesome.Object);
    function SceneRenderer(scene) {
      this.scene = scene;
      this.createElement();
      this.appendToGame();
    }
    SceneRenderer.prototype.createElement = function() {
      this.createWrapper();
      return this.createScene();
    };
    SceneRenderer.prototype.createWrapper = function() {
      this.wrapper = document.createElement('div');
      this.wrapper.id = "scene_" + this.scene.name;
      return _.extend(this.wrapper.style, {
        width: "100%",
        height: "100%",
        position: "relative"
      });
    };
    SceneRenderer.prototype.createScene = function() {
      this.sceneEl = document.createElement('div');
      this.wrapper.appendChild(this.sceneEl);
      return _.extend(this.sceneEl.style, {
        width: this.scene.attrs.size[0] + "px",
        height: this.scene.attrs.size[1] + "px",
        left: "0px",
        top: "0px",
        position: "absolute",
        overflow: "hidden"
      });
    };
    SceneRenderer.prototype.appendToGame = function() {
      return this.scene.game.renderer.appendElement(this.wrapper);
    };
    SceneRenderer.prototype.appendElement = function(element) {
      return this.sceneEl.appendChild(element);
    };
    SceneRenderer.prototype.appendElementToWrapper = function(element) {
      return this.wrapper.appendChild(element);
    };
    SceneRenderer.prototype.follow = function(entity) {
      return entity.attrs.bind('change', __bind(function(name, value) {
        var left, top;
        if (name !== 'position') {
          return;
        }
        left = this.scene.game.attrs.size[0] / 2 - value[0];
        top = this.scene.game.attrs.size[1] / 2 - value[1];
        this.sceneEl.style.left = "" + left + "px";
        return this.sceneEl.style.top = "" + top + "px";
      }, this));
    };
    return SceneRenderer;
  })();
  Awesome.Rendering.GameRenderer = (function() {
    __extends(GameRenderer, Awesome.Object);
    function GameRenderer(game) {
      this.game = game;
      this.createElement();
      this.appendElementToBody();
    }
    GameRenderer.prototype.createElement = function() {
      this.el = document.createElement('div');
      this.el.id = this.game.attrs.name;
      return _.extend(this.el.style, {
        width: this.game.attrs.size[0] + "px",
        height: this.game.attrs.size[1] + "px",
        overflow: 'hidden',
        position: 'relative'
      });
    };
    GameRenderer.prototype.appendElementToBody = function() {
      var append, bind, el;
      el = this.el;
      append = function() {
        return document.body.appendChild(el);
      };
      bind = window.addEventListener || window.attachEvent;
      if (document.body != null) {
        return append();
      } else {
        return bind('load', append, false);
      }
    };
    GameRenderer.prototype.appendElement = function(element) {
      return this.el.appendChild(element);
    };
    return GameRenderer;
  })();
}).call(this);
