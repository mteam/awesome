Awesome.module 'Collisions', class
    detector: new Awesome.Collisions.Detector

    colliding: ({with: tag, from: directions, movement}) ->
        if tag?
            entities = @scene.getEntitiesByTag tag
        else
            entities = @scene.entities
        if directions? and not _.isArray directions
            directions = [directions]

        collisions = []

        for entity in entities
            collision = @detector.detect @getRect(), entity.getRect()
            
            if collision and (if directions? then collision.direction in directions else true)
                collisions.push collision
        
        collisions
