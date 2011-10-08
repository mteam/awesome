Awesome.module 'Collisions', class
    detector: new Awesome.Collisions.Detector

    colliding: ({with: tag, from: directions, movement}) ->
        entities = @scene.getEntitiesByTag tag
        directions = [directions] unless _.isArray directions

        collisions = []

        for entity in entities
            collision = @detector.detect @getRect(), entity.getRect()
            
            if collision and (if collision.direction? then collision.direction in directions else true)
                collisions.push collision
        
        collisions
