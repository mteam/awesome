movementRects = {}

class Awesome.Collisions.MovementRect extends Awesome.Collisions.EntityRect
    @fromEntity: (entity, x, y) ->
        rect = movementRects[entity.id] ?= new this entity, x, y
        rect.mx = x
        rect.my = y
        rect

    constructor: (entity, @mx, @my) ->
        super entity
    
    Object.defineProperties this::,
        x: { get: -> @entity.attrs.position[0] + @mx }
        y: { get: -> @entity.attrs.position[1] + @my }
