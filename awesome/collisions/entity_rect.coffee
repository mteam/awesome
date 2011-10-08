class Awesome.Collisions.EntityRect extends Awesome.Collisions.Rect
    constructor: (@entity) ->
    
    Object.defineProperties this::,
        x: { get: -> @entity.attrs.position[0] }
        y: { get: -> @entity.attrs.position[1] }
        w: { get: -> @entity.attrs.size[0] }
        h: { get: -> @entity.attrs.size[1] }
