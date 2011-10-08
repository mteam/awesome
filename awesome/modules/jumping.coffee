Awesome.module 'Jumping', class
    @init: ->
        @bind 'tick', @::tick
        @bind 'fall', @::stopJumping
    
    $jump: 7

    jump: ->
        @jumping = true
        @trigger 'jump'
    
    stopJumping: ->
        @jumping = false
    
    tick: ->
        if @jumping
            collisions = @colliding with: 'static', from: 'bottom'
            if collisions.length
                @stopJumping()
            else
                @attrs.position[1] -= @attrs.jump
        