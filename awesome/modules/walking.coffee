Awesome.module 'Walking', class
    @init: ->
        @bind 'tick', @::tick
    
    $speed: 5
    
    startWalking: (direction) ->
        switch direction
            when 'left'
                @walking = 'left'
                @trigger 'startWalking', @walking
            when 'right'
                @walking = 'right'
                @trigger 'startWalking', @walking
    
    stopWalking: ->
        @walking = false
        @trigger 'stopWalking'
    
    tick: ->
        if @walking
            # collisions = @colliding with: 'static', from: ['left', 'right']
            # if collisions.length
            #     if @walking is 'left'
            #         @attrs.position[0] += collisions[0].overlap[0]
            #     if @walking is 'right'
            #         @attrs.position[0] -= collisions[0].overlap[0]
            #     @stopWalking()
            # else
            if @walking is 'left'
                @attrs.position[0] -= @attrs.speed
            if @walking is 'right'
                @attrs.position[0] += @attrs.speed
