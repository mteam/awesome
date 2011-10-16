class Tralalalandia extends Level
    name: 'tralalalandia'

    @FlyingLand: class FlyingLand extends Awesome.Entity
        $background: ['tralalalandia/map/1.png', 'tralalalandia/map/2.png', 'tralalalandia/map/3.png']
        $z: 0

        @tag 'static'
        
        rendererClass: FlyingLandRenderer
    
    @Land: class Land extends Awesome.Entity
        $background: 'tralalalandia/map/land.png'
        $bgRepeat: 'x'
        $z: 0

        @tag 'static'
    
    @TallGrass: class TallGrass extends Awesome.Entity
        $background: 'tralalalandia/obstacles/grass.png'
        $size: [50, 50]
        $z: 2

        @tag 'visible'
    
    @Rainbow: class Rainbow extends Awesome.Entity
        $background: 'tralalalandia/obstacles/rainbow.png'
        $size: [80, 90]
        $z: 2

        @tag 'visible'
    
    @Bunny: class Bunny extends Enemy
        $size: [50, 70]
        $walkingAnimation:
            normal:
                left: ['tralalalandia/monsters/bunnyL1.png', 'tralalalandia/monsters/bunnyL2.png']
                right: ['tralalalandia/monsters/bunnyR1.png', 'tralalalandia/monsters/bunnyR2.png']
            following:
                left: ['tralalalandia/monsters/bunnySL1.png', 'tralalalandia/monsters/bunnySL2.png']
                right: ['tralalalandia/monsters/bunnySR1.png', 'tralalalandia/monsters/bunnySR2.png']
    
    @Edward: class Edward extends Enemy
        $size: [60, 90]
        $walkingAnimation:
            normal:
                left: ['tralalalandia/monsters/edwardL1.png', 'tralalalandia/monsters/edwardL2.png']
                right: ['tralalalandia/monsters/edwardR1.png', 'tralalalandia/monsters/edwardR2.png']
            following:
                left: ['tralalalandia/monsters/edwardSL1.png', 'tralalalandia/monsters/edwardSL2.png']
                right: ['tralalalandia/monsters/edwardSR1.png', 'tralalalandia/monsters/edwardSR2.png']
    
    @Happiness: class Happiness extends Enemy
        $size: [50, 50]
        $walkingAnimation:
            normal:
                left: ['tralalalandia/monsters/happinessL1.png', 'tralalalandia/monsters/happinessL2.png']
                right: ['tralalalandia/monsters/happinessR1.png', 'tralalalandia/monsters/happinessR2.png']
            following:
                left: ['tralalalandia/monsters/happinessSL1.png', 'tralalalandia/monsters/happinessSL2.png']
                right: ['tralalalandia/monsters/happinessSR1.png', 'tralalalandia/monsters/happinessSR2.png']
    
    @Rainicorn: class Rainicorn extends Enemy
        $size: [100, 70]
        $walkingAnimation:
            normal:
                left: ['tralalalandia/monsters/rainicornL1.png', 'tralalalandia/monsters/rainicornL2.png']
                right: ['tralalalandia/monsters/rainicornR1.png', 'tralalalandia/monsters/rainicornR2.png']
            following:
                left: ['tralalalandia/monsters/rainicornSL1.png', 'tralalalandia/monsters/rainicornSL2.png']
                right: ['tralalalandia/monsters/rainicornSR1.png', 'tralalalandia/monsters/rainicornSR2.png']
    
    @Map: class Map extends Awesome.Map
        @add Land, position: [0, 350], size: [5000, 50]

        @add FlyingLand, position: [200, 300], size: [1000, 20]
        @add TallGrass, position: [300, 250]
        @add TallGrass, position: [500, 250]
        @add TallGrass, position: [700, 250]
        @add TallGrass, position: [900, 250]

        @add FlyingLand, position: [700, 240], size: [100, 20]

        @add Bunny, position: [370, 280], direction: 'right'
        @add Edward, position: [570, 260], direction: 'right'
        @add Rainicorn, position: [770, 280], direction: 'right'

        @add Rainbow, position: [1300, 260]

        @add FlyingLand, position: [1450, 300], size: [50, 20]
        @add FlyingLand, position: [1600, 300], size: [300, 20]

        @add Happiness, position: [1625, 200], direction: 'left', randomSomething: 48
        @add Happiness, position: [1925, 200], direction: 'left', randomSomething: 48

        @add TallGrass, position: [2200, 300]

        @add FlyingLand, position: [2300, 300], size: [50, 20]
        @add FlyingLand, position: [2400, 250], size: [50, 20]
        @add FlyingLand, position: [2500, 200], size: [50, 20]
        @add FlyingLand, position: [2700, 200], size: [50, 20]
        @add FlyingLand, position: [2900, 200], size: [50, 20]
        @add FlyingLand, position: [3100, 200], size: [50, 20]
        @add FlyingLand, position: [3300, 200], size: [50, 20]

        @add FlyingLand, position: [3500, 250], size: [50, 20]
        @add FlyingLand, position: [3690, 200], size: [50, 20]
        @add FlyingLand, position: [3900, 250], size: [300, 20]

        @add Bunny, position: [2800, 280]
        @add Edward, position: [3000, 260]
        @add Rainicorn, position: [3300, 280]
        @add Happiness, position: [3500, 300]
        @add Edward, position: [3800, 260]

        @add Rainbow, position: [4300, 260]
        @add TallGrass, position: [4500, 300]

        @add End, position: [4700, 260]
    
    $size: [5000, 400]
    $map: @Map

    run: ->
        super

        @playAudio 'bobby_mcferin-dont_worry_be_happy.mp3'

    runNextScene: ->
        @game.run 'laboratory', @playerClass
