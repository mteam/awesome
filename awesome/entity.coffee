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
        @setupRenderer()
        @scene.game.timer.bind 'tick', => @trigger 'tick'
    
    setupRenderer: ->
        @renderer = new @rendererClass this
    
    rendererClass: Awesome.Rendering.EntityRenderer
    
    getRect: ->
        @rect ?= new Awesome.Collisions.EntityRect this
    
    remove: ->
