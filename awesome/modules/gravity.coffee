Awesome.module 'Gravity', class
    @init: ->
        @bind 'tick', @::tick
    
    gravity: 1.2
    
    tick: ->
        @gravitySpeed ?= 0

        collisions = @colliding with: 'static', from: 'top'
        if collisions.length
            if @gravitySpeed > 0
                @gravitySpeed = 0
                @attrs.position[1] -= collisions[0].overlap[1] - 0.1
                @trigger 'fall'
        else
            @attrs.position[1] += @gravitySpeed
            @gravitySpeed += @gravity unless @gravitySpeed > 50
