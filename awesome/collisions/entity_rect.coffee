class Awesome.Collisions.EntityRect extends Awesome.Collisions.Rect
    constructor: (@entity) ->
        foo = @entity.attrs
        @attrs = @entity._attrContainer.properties
    
    Object.defineProperties this::,
        x: { get: -> @attrs.position[0] }
        y: { get: -> @attrs.position[1] }
        w: { get: -> @attrs.size[0] }
        h: { get: -> @attrs.size[1] }
