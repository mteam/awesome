class Player extends Awesome.Entity
    @include 'Collisions', 'Gravity', 'Walking', 'Jumping',
                'Crouching', 'Controls'
    
    $z: 1
