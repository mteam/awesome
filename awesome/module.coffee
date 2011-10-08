class Awesome.Module extends Awesome.Object
    constructor: (@klass) ->
    
    Object.defineProperties this::,
        classProperties:
            get: ->
                properties = {}
                for own name, property of @klass when name not in ['init', '__super__']
                    properties[name] = property
                properties
        
        instanceProperties:
            get: ->
                properties = {}
                for name, property of @klass.prototype when name not in ['constructor']
                    properties[name] = property
                properties
        
        initClass:
            get: -> @klass.init
        
        initInstance:
            get: -> @klass::constructor
        
Awesome.module = (name, klass) ->
    module = new Awesome.Module klass
    Awesome.Modules[name] = module
