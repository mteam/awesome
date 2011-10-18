class Menu extends Awesome.Scene
    name: 'menu'

    @add Awesome.Entities.ImgButton, size: [150, 50], position: [325, 150], image: 'start.png'
    @add Awesome.Entities.ImgButton, size: [150, 50], position: [325, 220], image: 'manual.png'
    @add Awesome.Entities.ImgButton, { size: [150, 50], position: [325, 290], image: 'team.png' }

    $background: 'menu.png'

    run: ->
        buttons = @getEntitiesByTag('button')
        buttons[0].bind 'click', => @game.run 'playerChooser'
        buttons[1].bind 'click', => @game.run 'manual'
        buttons[2].bind 'click', => @game.run 'team'


        @playAudio 'psychostick-we_ran_out_of_cd_space.mp3'
