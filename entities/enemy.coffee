class Enemy extends Awesome.Entity
    @include 'Collisions', 'Gravity', 'Walking', 'AI', 'Sight', 'WalkingAnimation'
    
    @tag 'visible', 'enemy'

    $z: 3
    $bgRepeat: 'no'
    $direction: 'left'
