Awesome.module 'Death', class
    @init: ->
        @bind 'tick', @::tick
    
    tick: ->
        collisions = @colliding with: 'enemy'
        if collisions.length
            @die()
    
    die: ->
