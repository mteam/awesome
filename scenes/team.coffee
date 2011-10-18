class Team extends Awesome.Scene
    name: 'team'

    @add Awesome.Entities.ImgButton, position: [350, 30], size: [150, 50], image: 'backtomenu.png'
    @add Awesome.Entities.Text, { position: [200, 200], size: [400, 1000], text: """
        Programming: Michal Miškerník<br>
        Graphics: Anna-Mária Klimkovič
    """ }

    $background: 'menu.png'

    run: ->
        buttons = @getEntitiesByTag('button')
        buttons[0].bind 'click', => @game.run 'menu'
