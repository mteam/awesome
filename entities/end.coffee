class End extends Awesome.Entity
    $size: [60, 90]
    $background: 'end.png'

    @include 'Collisions'

    constructor: ->
        super

        @bind 'tick', @tick
    
    tick: ->
        collisions = @colliding with: 'player'
        if collisions.length
            @scene.runNextScene()
