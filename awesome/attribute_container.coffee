class FakeArray
    constructor: (@realArray, @callback) ->
        for value, key in @realArray
            @addIndex key
            @[key] = value
    
    addIndex: (index) ->
        Object.defineProperty this, index,
            get: -> @realArray[index]
            set: (value) ->
                @realArray[index] = value
                @callback index, value, this

class Awesome.AttributeContainer extends Awesome.Object
    @include 'Events'

    constructor: (object) ->
        properties = {}
        Object.defineProperties this,
            object: { get: -> object }
            properties: { get: -> properties }
        
        for name, property of object when _(name).startsWith '$'
            @set name.substr(1), property
    
    set: (name, value) ->
        @setupProperty name unless @hasOwnProperty name
        @[name] = value
    
    setupProperty: (name) ->
        Object.defineProperty this, name,
            get: -> @properties[name]
            
            set: (value) ->
                @properties[name] =
                    if _.isArray value
                        new FakeArray _.clone(value), (index, newValue, array) =>
                            @trigger 'change', name, array
                    else value
                
                @trigger 'change', name, @properties[name]
            
            enumerable: yes
