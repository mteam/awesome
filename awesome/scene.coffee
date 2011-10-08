class Awesome.Scene extends Awesome.Object
    @include 'Events'

    @add: (entity, properties) ->
        @array('classEntities').push {entity, properties}
    
    constructor: (@game, @name) ->
        @size = @game.size unless @size
        @renderer = new Awesome.Rendering.SceneRenderer this
        @entities = {}

        if @classEntities?
            for {entity, properties} in @classEntities
                @add entity, properties
        
        @attrs.map?.addEntitiesToScene this

        @run() if @run?
    
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

