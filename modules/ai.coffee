Awesome.module 'AI', class
    @init: ->
        @bind 'tick', @::tick
        @bind 'playerSpotted', @::playerSpotted
        @bind 'playerGone', @::playerGone
    
    playerSpotted: ->
        @startWalking @attrs.direction
    
    playerGone: ->
        @stopWalking()
    
    tick: ->
        @walkingCycleCounter ?= 0

        unless @spotted
            @walkingCycleCounter++

            if @walkingCycleCounter > 10
                @walkingCycleCounter = 0
                @walkingCycleChange()

        
    walkingCycleChange: ->
        switch Math.ceil(Math.random() * 3)
            when 1
                @stopWalking()
                @startWalking 'left'
            when 2
                @stopWalking()
                @startWalking 'right'
            when 3
                @stopWalking()
