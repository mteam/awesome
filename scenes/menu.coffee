class Menu extends Awesome.Scene
    name: 'menu'

    @add Awesome.Entities.Button, text: 'Start', size: [100, 50], position: [325, 100]
    @add Awesome.Entities.Button, text: 'Manual', size: [100, 50], position: [325, 170]
    @add Awesome.Entities.Button, { text: 'Team', size: [100, 50], position: [325, 240] }

    run: ->
        @getEntitiesByTag('button')[0].bind 'click', => @game.run 'playerChooser'
