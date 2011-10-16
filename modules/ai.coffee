Awesome.module 'AI', class
    $randomSomething: 12

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
        switch Math.ceil(Math.random() * @attrs.randomSomething)
            when 1
                @stopWalking()
                @startWalking 'left'
            when 2
                @stopWalking()
                @startWalking 'right'
            else
                @stopWalking()
