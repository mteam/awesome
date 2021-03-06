class CandyLand extends Level
    name: 'candyLand'

    @Land: class Land extends Awesome.Entity
        $background: 'candyland/map/land.png'
        $bgRepeat: 'x'
        $z: 0

        @tag 'static'

    @FlyingLand: class FlyingLand extends Awesome.Entity
        $background: ['candyland/map/1.png', 'candyland/map/2.png', 'candyland/map/3.png']
        $z: 0

        @tag 'static'
        
        rendererClass: FlyingLandRenderer
    
    @Tree: class Tree extends Awesome.Entity
        $background: 'candyland/obstacles/tree.png'
        $size: [80, 90]
        $z: 2

        @tag 'visible'
    
    @TallGrass: class TallGrass extends Awesome.Entity
        $background: 'candyland/obstacles/grass.png'
        $size: [50, 50]
        $z: 2

        @tag 'visible'
    
    @Rock: class Rock extends Awesome.Entity
        $background: 'candyland/obstacles/stone.png'
        $size: [50, 50]
        $z: 2

        @tag 'visible'
    
    @Dadcane: class Dadcane extends Enemy
        $size: [60, 100]
        $walkingAnimation:
            normal:
                left: ['candyland/monsters/dadcaneL1.png', 'candyland/monsters/dadcaneL2.png']
                right: ['candyland/monsters/dadcaneR1.png', 'candyland/monsters/dadcaneR2.png']
            following:
                left: ['candyland/monsters/dadcaneSL1.png', 'candyland/monsters/dadcaneSL2.png']
                right: ['candyland/monsters/dadcaneSR1.png', 'candyland/monsters/dadcaneSR2.png']
    
    @Fanmallow: class Fanmallow extends Enemy
        $size: [40, 60]
        $walkingAnimation:
            normal:
                left: ['candyland/monsters/fanmallowL1.png', 'candyland/monsters/fanmallowL2.png']
                right: ['candyland/monsters/fanmallowR1.png', 'candyland/monsters/fanmallowR2.png']
            following:
                left: ['candyland/monsters/fanmallowSL1.png', 'candyland/monsters/fanmallowSL2.png']
                right: ['candyland/monsters/fanmallowSR1.png', 'candyland/monsters/fanmallowSR2.png']
    
    @Grankie: class Grankie extends Enemy
        $size: [60, 80]
        $walkingAnimation:
            normal:
                left: ['candyland/monsters/grankieL1.png', 'candyland/monsters/grankieL2.png']
                right: ['candyland/monsters/grankieR1.png', 'candyland/monsters/grankieR2.png']
            following:
                left: ['candyland/monsters/grankieSL1.png', 'candyland/monsters/grankieSL2.png']
                right: ['candyland/monsters/grankieSR1.png', 'candyland/monsters/grankieSR2.png']
    
    @Momonut: class Momonut extends Enemy
        $size: [60, 80]
        $walkingAnimation:
            normal:
                left: ['candyland/monsters/momonutL1.png', 'candyland/monsters/momonutL2.png']
                right: ['candyland/monsters/momonutR1.png', 'candyland/monsters/momonutR2.png']
            following:
                left: ['candyland/monsters/momonutSL1.png', 'candyland/monsters/momonutSL2.png']
                right: ['candyland/monsters/momonutSR1.png', 'candyland/monsters/momonutSR2.png']
    
    @Map: class Map extends Awesome.Map
        @add Land, position: [0, 350], size: [5000, 50]

        @add FlyingLand, position: [200, 300], size: [100, 20] # steps
        @add FlyingLand, position: [320, 260], size: [100, 20] #

        @add FlyingLand, position: [440, 200], size: [1500, 20] # long floor

        @add Tree, position: [500, 260]

        @add FlyingLand, position: [800, 150], size: [100, 20] # steps
        @add FlyingLand, position: [650, 100], size: [100, 20] #

        @add Dadcane, position: [800, 250], direction: 'left'
        @add Momonut, position: [900, 250], direction: 'right'

        @add Rock, position: [1000, 150]
        @add Grankie, position: [1200, 100], direction: 'right'

        @add Fanmallow, position: [1200, 250], direction: 'left'
        @add Grankie, position: [1400, 250], direction: 'left'

        @add TallGrass, position: [1500, 150]
        @add Tree, position: [1750, 110]

        @add FlyingLand, position: [2200, 280], size: [280, 20]
        @add Tree, position: [2300, 190]

        @add FlyingLand, position: [2600, 200], size: [600, 20]
        @add Dadcane, position: [2800, 100], direction: 'right'
        @add Momonut, position: [2940, 120], direction: 'left'

        @add TallGrass, position: [2800, 300]
        @add TallGrass, position: [2950, 300]
        @add Rock, position: [3400, 300]

        @add FlyingLand, position: [3600, 300], size: [50, 20]
        @add FlyingLand, position: [3670, 160], size: [50, 20]
        @add FlyingLand, position: [3670, 260], size: [50, 20]
        @add FlyingLand, position: [3740, 220], size: [50, 20]
        @add FlyingLand, position: [3810, 180], size: [500, 20]
        @add Fanmallow, position: [4000, 100], direction: 'left'

        @add FlyingLand, position: [4200, 220], size: [1000, 20]
        @add Fanmallow, position: [4500, 150], direction: 'left'

        @add End, position: [4800, 130]
    
    $size: [5000, 400]
    $map: @Map
    $background: 'candy_land.png'

    run: ->
        super
        
        @playAudio 'recess_monkey-marshmallow_farm.mp3'

    runNextScene: ->
        @game.run 'tralalalandia', @playerClass
