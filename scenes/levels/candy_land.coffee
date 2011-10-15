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

        @Renderer: class FlyingLandRenderer extends Awesome.Rendering.EntityRenderer
            createElement: ->
                super

                @el.left = document.createElement 'div'
                @el.middle = document.createElement 'div'
                @el.right = document.createElement 'div'

                @el.appendChild @el.left
                @el.appendChild @el.middle
                @el.appendChild @el.right
            
            setupStyles: ->
                super
                
                @el.left.style.float = @el.middle.style.float = @el.right.style.float = "left"

            set: (name, value) ->
                unless name is 'background'
                    super
                else
                    _.extend @el.left.style, @getCssValue('background', value[0])
                    _.extend @el.middle.style, @getCssValue('background', value[1])
                    _.extend @el.right.style, @getCssValue('background', value[2])
            
            _.extend @object('css'),
                size: (s) ->
                    el = @renderer.el

                    el.left.style.width = el.right.style.width =
                        el.left.style.height = el.right.style.height = s[1] + "px"
                    
                    el.middle.style.width = s[0] - 40 + "px"
                    el.middle.style.height = s[1] + "px"

                    width: s[0] + "px"
                    height: s[1] + "px"
        
        rendererClass: @Renderer
    
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
        @add CandyLand.Land, position: [0, 350], size: [5000, 40]
        @add CandyLand.FlyingLand, position: [200, 300], size: [100, 20]
        @add CandyLand.FlyingLand, position: [320, 250], size: [100, 20]
        @add CandyLand.FlyingLand, position: [440, 200], size: [1500, 20]

        @add CandyLand.Tree, position: [600, 260]
        @add CandyLand.TallGrass, position: [1200, 300]
        @add CandyLand.Rock, position: [1000, 300]

        @add Dadcane, position: [1300, 250], direction: 'left'
        @add Fanmallow, position: [1400, 250], direction: 'left'
        @add Grankie, position: [1500, 250], direction: 'left'

        @add End, position: [4500, 250]
    
    $size: [5000, 400]
    $map: @Map

    runNextScene: ->
        @game.run 'tralalalandia', @playerClass
