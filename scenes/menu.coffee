class Menu extends Awesome.Scene
    name: 'menu'

    @add Awesome.Entities.Button, text: 'Start', size: [100, 50], position: [325, 100]
    @add Awesome.Entities.Button, text: 'Manual', size: [100, 50], position: [325, 170]
    @add Awesome.Entities.Button, { text: 'Team', size: [100, 50], position: [325, 240] }

    run: ->
        buttons = @getEntitiesByTag('button')
        buttons[0].bind 'click', => @game.run 'playerChooser'
        buttons[1].bind 'click', => @game.run 'manual'
        buttons[2].bind 'click', => @game.run 'team'


        @playAudio 'psychostick-we_ran_out_of_cd_space.mp3'
