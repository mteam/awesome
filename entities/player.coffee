class Player extends Awesome.Entity
    @include 'Collisions', 'Gravity', 'Walking', 'Jumping',
                'Crouching', 'Controls'
    
    @tag 'visible'
    
    $z: 1
