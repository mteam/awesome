class CandyLand extends Level
    @Grass: class Grass extends Awesome.Entity
        $color: 'green'
        $z: 0
        @tag 'static'
    
    @Tree: class Tree extends Awesome.Entity
        $color: 'saddlebrown'
        $size: [50, 150]
        $z: 2
        @tag 'visible'
    
    @TallGrass: class TallGrass extends Awesome.Entity
        $color: 'lawngreen'
        $size: [50, 50]
        $z: 2
        @tag 'visible'
    
    @Rock: class Rock extends Awesome.Entity
        $color: 'gray'
        $size: [50, 50]
        $z: 2
        @tag 'visible'

    @Map: class Map extends Awesome.Map
        @add CandyLand.Grass, position: [0, 350], size: [5000, 50]
        @add CandyLand.Grass, position: [200, 300], size: [100, 20]
        @add CandyLand.Grass, position: [320, 250], size: [100, 20]
        @add CandyLand.Grass, position: [440, 200], size: [100, 20]

        @add CandyLand.Tree, position: [600, 200]
        @add CandyLand.TallGrass, position: [1200, 300]
        @add CandyLand.Rock, position: [1000, 300]

        @add Enemy, position: [1300, 10], direction: 'left'
    
    $size: [5000, 400]
    $map: @Map

    @add AttentionBar
    
    run: ->
        @player = @add Ninja, position: [10, 10]
        @follow @player
