class FailScreen extends Awesome.Scene
    name: 'failScreen'

    @add Awesome.Entities.Text,
        text: 'Fail',
        position: [325, 100],
        size: [150, 50],
        fontSize: 30,
        align: 'center'
    @add Awesome.Entities.ImgButton,
        image: 'restartlevel.png',
        position: [325, 150],
        size: [150, 50]
    @add Awesome.Entities.ImgButton,
        image: 'backtomenu.png',
        position: [325, 220],
        size: [150, 50]
    
    $background: 'fail.png'

    run: (@fromScene, @player) ->
        buttons = @getEntitiesByTag('button')
        buttons[0].bind 'click', => @game.run fromScene, player
        buttons[1].bind 'click', => @game.run 'menu'
