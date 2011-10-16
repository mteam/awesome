class Manual extends Awesome.Scene
    name: 'manual'

    @add Awesome.Entities.Button, position: [350, 30], size: [100, 50], text: 'Back'
    @add Awesome.Entities.Text, { position: [100, 100], size: [600, 1000], text: """
        Awesome!
    """ }

    run: ->
        buttons = @getEntitiesByTag('button')
        buttons[0].bind 'click', => @game.run 'menu'
