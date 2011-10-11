class Enemy extends Awesome.Entity
    @include 'Collisions', 'Gravity', 'Walking', 'AI', 'Sight'
    
    @tag 'visible', 'enemy'

    $color: 'red'
    $size: [40, 80]
    $z: 1
