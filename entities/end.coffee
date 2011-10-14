class End extends Awesome.Entity
    $size: [50, 100]
    $color: 'pink'

    @include 'Collisions'

    constructor: ->
        super

        @bind 'tick', @tick
    
    tick: ->
        collisions = @colliding with: 'player'
        if collisions.length
            @scene.runNextScene()
