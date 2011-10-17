Awesome.module 'Crouching', class
    @init: ->
        @bind 'jump', @::standUp

    crouch: ->
        unless @crouching
            @crouching = true
            move = @attrs.size[1] /= 2
            @attrs.position[1] += move
            @trigger 'crouch'
    
    standUp: ->
        if @crouching
            @crouching = false
            move = @attrs.size[1] *= 2
            @attrs.position[1] -= move / 2
            @trigger 'standUp'
