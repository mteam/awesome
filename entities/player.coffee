class Player extends Awesome.Entity
    @include 'Collisions', 'Gravity', 'Walking', 'Jumping', 'Death',
                'Crouching', 'Controls', 'WalkingAnimation'
    
    @tag 'visible', 'player'
    
    $z: 1
    $walkAnimationSpeed: 3

    constructor: ->
        super

        #bar = @scene.getEntitiesByTag('attentionBar')[0]
        #bar.bind 'full', => @die()

    die: ->
        @scene.showDeathScreen()
