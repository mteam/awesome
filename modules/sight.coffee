class SightRect extends Awesome.Collisions.Rect
    constructor: (entity, @w, @direction) ->
        @entity = entity.getRect()
    
    Object.defineProperties this::,
        x:
            get: ->
                if @direction is 'left'
                    @entity.x - @w
                else if @direction is 'right'
                    @entity.wx
        y: { get: -> @entity.y }
        h: { get: -> @entity.h }

Awesome.module 'Sight', class
    $sight: 300

    @init: ->
        @bind 'tick', @::tick
    
    tick: ->
        seenEntities = @getSeenEntities @attrs.direction
        bar = @scene.getEntitiesByTag('attentionBar')[0]
        isPlayer = (entity) -> entity.entity instanceof Player

        if _.any seenEntities, isPlayer
            unless @spotted
                @spotted = true
                @trigger 'playerSpotted'
        else
            if @spotted
                @spotted = false
                @trigger 'playerGone'

    getSeenEntities: (direction) ->
        entitiesInSight = @getEntitiesInSight direction

        topSide = @scene.attrs.size[1]

        visible = _.filter entitiesInSight, (entity) ->
            rect = entity.rect

            if rect.y >= topSide
                false
            else
                topSide = rect.y if rect.y < topSide
                true

        visible
    
    getEntitiesInSight: (direction) ->
        sightRect = @getSightRect direction
        collisions = []

        for id, entity of @scene.entities when entity.tagged 'visible'
            entityRect = entity.getRect()
            if @detector.detect entityRect, sightRect
                distance =
                    if direction is 'left'
                        sightRect.wx - entityRect.wx
                    else
                        entityRect.x - sightRect.x

                collisions.push {entity, distance, rect: entityRect}
        
        _(collisions).sortBy (collision) -> collision.distance
    
    getSightRect: (direction) ->
        @sightRect ?= {}
        @sightRect[direction] ?= new SightRect this, @attrs.sight, direction
