class Enemy extends Awesome.Entity
    @include 'Collisions', 'Gravity', 'Walking', 'AI', 'Sight'
    
    @tag 'visible'

    $color: 'red'
    $size: [40, 80]
    $z: 1
