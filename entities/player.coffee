class Player extends Awesome.Entity
    @include 'Collisions', 'Gravity', 'Walking', 'Jumping', 'Death',
                'Crouching', 'Controls'
    
    @tag 'visible', 'player'
    
    $z: 1

    constructor: ->
        super

        bar = @scene.getEntitiesByTag('attentionBar')[0]
        bar.bind 'full', => @die()

    die: ->
        @scene.showDeathScreen()
