Awesome.module 'Walking', class
    @init: ->
        @bind 'tick', @::tick
    
    $speed: 8
    $direction: 'right'
    
    startWalking: (direction) ->
        switch direction
            when 'left'
                @walking = 'left'
                @attrs.direction = 'left'
                @trigger 'startWalking', @walking
            when 'right'
                @walking = 'right'
                @attrs.direction = 'right'
                @trigger 'startWalking', @walking
    
    stopWalking: ->
        @walking = false
        @trigger 'stopWalking'
    
    tick: ->
        if @walking
            if @walking is 'left'
                @attrs.position[0] -= @attrs.speed
            if @walking is 'right'
                @attrs.position[0] += @attrs.speed
