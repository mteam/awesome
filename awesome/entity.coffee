entityIdCounter = 0

class Awesome.Entity extends Awesome.Object
    @include 'Events'

    @tag: (tags...) ->
        @array('tags').push tag for tag in tags
    
    tagged: (tag) ->
        if @tags?
            tag in @tags
        else false

    constructor: (@scene) ->
        super
        
        @id = entityIdCounter++
        @renderer = @getRenderer()
        @scene.game.timer.bind 'tick', => @trigger 'tick'
    
    getRenderer: ->
        new Awesome.Rendering.EntityRenderer this
    
    getRect: ->
        @rect ?= new Awesome.Collisions.EntityRect this
    
    remove: ->
