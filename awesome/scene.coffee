class Awesome.Scene extends Awesome.Object
    @include 'Events'

    @add: (entity, properties) ->
        @array('classEntities').push {entity, properties}
    
    constructor: (@game, @name, args) ->
        @attrs.size = @game.attrs.size unless @attrs.size
        @renderer = new Awesome.Rendering.SceneRenderer this
        @entities = {}

        if @classEntities?
            for {entity, properties} in @classEntities
                @add entity, properties
        
        @attrs.map?.addEntitiesToScene this

        @run args... if @run?
    
    add: (entity, properties) ->
        instance = new entity this

        if properties?
            for name, value of properties
                instance.attrs.set name, value
        
        @entities[instance.id] = instance
        
        instance
    
    follow: (entity) ->
        @renderer.follow entity
    
    getEntitiesByTag: (tag) ->
        entity for id, entity of @entities when entity.tagged tag
    
    remove: ->
        @game.timer.clearEvents()
        @renderer.remove()
        entity.remove() for id, entity of @entities

    playAudio: (name) ->
        return if name is @game.playingAudioName

        @game.audio.pause() if @game.audio?

        @game.audio = new Audio
        @game.audio.src = "../music/#{name}"
        @game.audio.loop = true
        @game.audio.play()

        @game.playingAudioName = name

