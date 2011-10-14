class FailScreen extends Awesome.Scene
    name: 'failScreen'

    @add Awesome.Entities.Text,
        text: 'Fail',
        position: [325, 175],
        size: [150, 50],
        fontSize: 30,
        align: 'center'
    @add Awesome.Entities.Button,
        text: 'Restart level',
        position: [325, 250],
        size: [150, 50]
    @add Awesome.Entities.Button,
        text: 'Back to menu',
        position: [325, 320],
        size: [150, 50]

    run: (@fromScene, @player) ->
        buttons = @getEntitiesByTag('button')
        buttons[0].bind 'click', => @game.run fromScene, player
        buttons[1].bind 'click', => @game.run 'menu'
