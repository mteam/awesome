class Laboratory extends Level
    name: 'laboratory'

    @Land: class Land extends Awesome.Entity
        $background: 'laboratory/map/land.png'
        $bgRepeat: 'x'
        $z: 0

        @tag 'static'

    @FlyingLand: class FlyingLand extends Awesome.Entity
        $background: ['laboratory/map/1.png', 'laboratory/map/2.png', 'laboratory/map/3.png']
        $z: 0

        @tag 'static'
        
        rendererClass: FlyingLandRenderer
    
    @Teleport: class Teleport extends Awesome.Entity
        $background: 'laboratory/obstacles/teleport.png'
        $size: [60, 90]
        $z: 2

        @tag 'visible'
    
    @Grass: class Grass extends Awesome.Entity
        $background: 'laboratory/obstacles/grass.png'
        $size: [50, 50]
        $z: 2

        @tag 'visible'
    
    @Brain: class Brain extends Enemy
        $size: [60, 100]
        $walkingAnimation:
            normal:
                left: ['laboratory/monsters/brainL1.png', 'laboratory/monsters/brainL2.png']
                right: ['laboratory/monsters/brainR1.png', 'laboratory/monsters/brainR2.png']
            following:
                left: ['laboratory/monsters/brainL1.png', 'laboratory/monsters/brainL2.png']
                right: ['laboratory/monsters/brainR1.png', 'laboratory/monsters/brainR2.png']
    
    @Creeper: class Creeper extends Enemy
        $size: [60, 100]
        $walkingAnimation:
            normal:
                left: ['laboratory/monsters/creeperL1.png', 'laboratory/monsters/creeperL2.png']
                right: ['laboratory/monsters/creeperR1.png', 'laboratory/monsters/creeperR2.png']
            following:
                left: ['laboratory/monsters/creeperL1.png', 'laboratory/monsters/creeperL2.png']
                right: ['laboratory/monsters/creeperR1.png', 'laboratory/monsters/creeperR2.png']
    
    @Pacman: class Pacman extends Enemy
        $size: [60, 60]
        $walkAnimationSpeed: 10
        $walkingAnimation:
            normal:
                left: ['laboratory/monsters/pacmanL1.png', 'laboratory/monsters/pacmanL2.png']
                right: ['laboratory/monsters/pacmanR1.png', 'laboratory/monsters/pacmanR2.png']
            following:
                left: ['laboratory/monsters/pacmanL1.png', 'laboratory/monsters/pacmanL2.png']
                right: ['laboratory/monsters/pacmanR1.png', 'laboratory/monsters/pacmanR2.png']
    
    @Zombie: class Zombie extends Enemy
        $size: [60, 90]
        $walkAnimationSpeed: 3
        $walkingAnimation:
            normal:
                left: ['laboratory/monsters/zombieL1.png', 'laboratory/monsters/zombieL2.png']
                right: ['laboratory/monsters/zombieR1.png', 'laboratory/monsters/zombieR2.png']
            following:
                left: ['laboratory/monsters/zombieSL1.png', 'laboratory/monsters/zombieSL2.png']
                right: ['laboratory/monsters/zombieSR1.png', 'laboratory/monsters/zombieSR2.png']
    
    @Map: class Map extends Awesome.Map
        @add Land, position: [0, 350], size: [1300, 50]

        @add Zombie, position: [100, 10], direction: 'right'
        @add Creeper, position: [700, 250], direction: 'left'

        @add FlyingLand, position: [400, 300], size: [100, 20]
        @add FlyingLand, position: [500, 240], size: [100, 20]
        @add FlyingLand, position: [600, 200], size: [400, 20]

        @add Pacman, position: [900, 140], direction: 'left', randomSomething: 36

        @add Grass, position: [700, 150]
        @add FlyingLand, position: [625, 140], size: [50, 20]

        @add Grass, position: [1100, 300]

        @add FlyingLand, position: [1300, 280], size: [100, 20]
        @add Land, position: [1400, 350], size: [200, 50]
        @add FlyingLand, position: [1550, 300], size: [400, 20]
        @add Land, position: [1900, 350], size: [800, 50]
        @add Brain, position: [1700, 200], direction: 'left', randomSomething: 48
        @add Brain, position: [1800, 200], direction: 'right', randomSomething: 48

        @add FlyingLand, position: [2200, 300], size: [50, 20]
        @add FlyingLand, position: [2300, 250], size: [50, 20]
        @add FlyingLand, position: [2400, 200], size: [400, 20]

        @add FlyingLand, position: [2900, 300], size: [100, 20]

        @add Land, position: [3150, 350], size: [1800, 50]

        @add Zombie, position: [2600, 260], direction: 'right', randomSomething: 96
        @add Zombie, position: [3300, 260], direction: 'left', randomSomething: 96

        @add FlyingLand, position: [3300, 300], size: [50, 20]
        @add FlyingLand, position: [3400, 250], size: [50, 20]
        @add FlyingLand, position: [3500, 200], size: [400, 20]

        @add Teleport, position: [3600, 260]

        @add Creeper, position: [3700, 250], direction: 'right', randomSomething: 96
        @add Zombie, position: [3770, 250], direction: 'right', randomSomething: 96
        @add Pacman, position: [3840, 250], direction: 'right', randomSomething: 96

        @add End, position: [4500, 260]
    
    $size: [5000, 400]
    $background: 'laboratory.png'
    $map: @Map

    run: ->
        super

        @player.attrs.position = [300, 150]
        @playAudio 'pinky_and_the_brain_opening.mp3'

    runNextScene: ->
        @game.run 'winScreen'
