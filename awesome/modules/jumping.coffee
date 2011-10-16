Awesome.module 'Jumping', class
    @init: ->
        @bind 'tick', @::tick
        @bind 'fall', @::stopJumping
    
    $jump: 8

    jump: ->
        @jumping = true
        @trigger 'jump'
    
    stopJumping: ->
        @jumping = false
    
    tick: ->
        if @jumping
            @attrs.position[1] -= @attrs.jump
        