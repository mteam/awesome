class Loader extends Awesome.Scene
    name: 'loader'

    @add Awesome.Entities.Text,
        position: [350, 175]
        size: [100, 50]
        fontSize: 30
        align: 'center'
        text: 'Loading...'
    
    images: [
        'candyland/map/1.png', 'candyland/map/2.png', 'candyland/map/3.png',
        'candyland/map/land.png',
        'candyland/monsters/dadcaneL1.png', 'candyland/monsters/dadcaneL2.png',
        'candyland/monsters/dadcaneR1.png', 'candyland/monsters/dadcaneR2.png',
        'candyland/monsters/dadcaneSL1.png', 'candyland/monsters/dadcaneSL2.png',
        'candyland/monsters/dadcaneSR1.png', 'candyland/monsters/dadcaneSR2.png',
        'candyland/monsters/fanmallowL1.png', 'candyland/monsters/fanmallowL2.png',
        'candyland/monsters/fanmallowR1.png', 'candyland/monsters/fanmallowR2.png',
        'candyland/monsters/fanmallowSL1.png', 'candyland/monsters/fanmallowSL2.png',
        'candyland/monsters/fanmallowSR1.png', 'candyland/monsters/fanmallowSR2.png',
        'candyland/monsters/grankieL1.png', 'candyland/monsters/grankieL2.png',
        'candyland/monsters/grankieR1.png', 'candyland/monsters/grankieR2.png',
        'candyland/monsters/grankieSL1.png', 'candyland/monsters/grankieSL2.png',
        'candyland/monsters/grankieSR1.png', 'candyland/monsters/grankieSR2.png',
        'candyland/monsters/momonutL1.png', 'candyland/monsters/momonutL2.png',
        'candyland/monsters/momonutR1.png', 'candyland/monsters/momonutR2.png',
        'candyland/monsters/momonutSL1.png', 'candyland/monsters/momonutSL2.png',
        'candyland/monsters/momonutSR1.png', 'candyland/monsters/momonutSR2.png',
        'candyland/obstacles/grass.png', 'candyland/obstacles/stone.png',
        'candyland/obstacles/tree.png',

        'tralalalandia/map/1.png', 'tralalalandia/map/2.png', 'tralalalandia/map/3.png',
        'tralalalandia/map/land.png',
        'tralalalandia/monsters/bunnyL1.png', 'tralalalandia/monsters/bunnyL2.png',
        'tralalalandia/monsters/bunnyR1.png', 'tralalalandia/monsters/bunnyR2.png',
        'tralalalandia/monsters/bunnySL1.png', 'tralalalandia/monsters/bunnySL2.png',
        'tralalalandia/monsters/bunnySR1.png', 'tralalalandia/monsters/bunnySR2.png',
        'tralalalandia/monsters/edwardL1.png', 'tralalalandia/monsters/edwardL2.png',
        'tralalalandia/monsters/edwardR1.png', 'tralalalandia/monsters/edwardR2.png',
        'tralalalandia/monsters/edwardSL1.png', 'tralalalandia/monsters/edwardSL2.png',
        'tralalalandia/monsters/edwardSR1.png', 'tralalalandia/monsters/edwardSR2.png',
        'tralalalandia/monsters/happinessL1.png', 'tralalalandia/monsters/happinessL2.png',
        'tralalalandia/monsters/happinessR1.png', 'tralalalandia/monsters/happinessR2.png',
        'tralalalandia/monsters/happinessSL1.png', 'tralalalandia/monsters/happinessSL2.png',
        'tralalalandia/monsters/happinessSR1.png', 'tralalalandia/monsters/happinessSR2.png',
        'tralalalandia/monsters/rainicornL1.png', 'tralalalandia/monsters/rainicornL2.png',
        'tralalalandia/monsters/rainicornR1.png', 'tralalalandia/monsters/rainicornR2.png',
        'tralalalandia/monsters/rainicornSL1.png', 'tralalalandia/monsters/rainicornSL2.png',
        'tralalalandia/monsters/rainicornSR1.png', 'tralalalandia/monsters/rainicornSR2.png',
        'tralalalandia/obstacles/grass.png', 'tralalalandia/obstacles/rainbow.png',

        'laboratory/map/1.png', 'laboratory/map/2.png', 'laboratory/map/3.png',
        'laboratory/map/land.png',
        'laboratory/monsters/brainL1.png', 'laboratory/monsters/brainL2.png',
        'laboratory/monsters/brainR1.png', 'laboratory/monsters/brainR2.png',
        'laboratory/monsters/creeperL1.png', 'laboratory/monsters/creeperL2.png',
        'laboratory/monsters/creeperR1.png', 'laboratory/monsters/creeperR2.png',
        'laboratory/monsters/pacmanL1.png', 'laboratory/monsters/pacmanL2.png',
        'laboratory/monsters/pacmanR1.png', 'laboratory/monsters/pacmanR2.png',
        'laboratory/monsters/zombieL1.png', 'laboratory/monsters/zombieL2.png',
        'laboratory/monsters/zombieR1.png', 'laboratory/monsters/zombieR2.png',
        'laboratory/monsters/zombieSL1.png', 'laboratory/monsters/zombieSL2.png',
        'laboratory/monsters/zombieSR1.png', 'laboratory/monsters/zombieSR2.png',
        'laboratory/obstacles/grass.png', 'laboratory/obstacles/teleport.png',
    ]
    
    run: ->
        for image in @images
            img = new Image
            img.addEventListener 'load', @newLoaded, false
            img.src = "../images/#{image}"
    
    newLoaded: =>
        @counter ?= 0

        @counter++

        @allLoaded() if @counter is @images.length
    
    allLoaded: ->
        @game.run 'menu'

        