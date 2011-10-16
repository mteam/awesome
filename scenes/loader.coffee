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
        'candyland/map/land.png', 'candyland/monsters/dadcaneL1.png',
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
    ]
    
    run: ->
        for image in @images
            img = new Image
            img.addEventListener 'load', @imageLoaded
            img.src = "../images/#{image}"
    
    imageLoaded: =>
        @counter ?= 0

        @counter++

        @allLoaded() if @counter is @images.length
    
    allLoaded: ->
        @game.run 'menu'

        