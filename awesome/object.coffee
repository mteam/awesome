Awesome.Object = class AObject
    @array: (name) ->
        if @::hasOwnProperty name
            @::[name]
        else
            if @::[name]?
                @::[name] = _.clone @::[name]
            else
                @::[name] = []
    
    @origArray: (name) ->
        @::[name] = [] unless @::hasOwnProperty name
        @::[name]
    
    @object: (name) ->
        if @::hasOwnProperty name # if is the object already inherited
            @::[name] # just return it
        else
            if @::[name]? # if is the object created in parent already
                @::[name] = _.clone @::[name]
            else
                @::[name] = {}
    
    @include: (modules...) ->
        for module in modules
            if _.isString module
                module = Awesome.Modules[module]
            
            for key, property of module.classProperties
                @[key] = property
            
            for key, property of module.instanceProperties
                @::[key] = property
            
            module.initClass?.apply this

            @origArray('modules').push module
    
    constructor: ->
        if @modules?
            for module in @modules
                module.initInstance?.apply this

    Object.defineProperty @::, 'attrs',
        get: -> @_attrContainer ?= new Awesome.AttributeContainer this
