class Player extends Awesome.Entity
    @include 'Collisions', 'Gravity', 'Walking', 'Jumping', 'Death',
                'Crouching', 'Controls'
    
    @tag 'visible'
    
    $z: 1
