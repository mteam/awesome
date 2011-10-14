class PlayerChooser extends Awesome.Scene
    name: 'playerChooser'

    @add Awesome.Entities.Text,
        size: [200, 50], position: [300, 100],
        text: 'Choose your villian', align: 'center', fontSize: 25
    
    @add Awesome.Entities.Button, size: [80, 120], position: [250, 180], image: 'characters/Hotass/standing.png'
    @add Awesome.Entities.Button, size: [80, 120], position: [350, 180], image: 'characters/Ninja/standing.png'
    @add Awesome.Entities.Button, { size: [80, 120], position: [450, 180], image: 'characters/Pirate/standing.png' }

    runLevel: (player) ->
        @game.run 'candyLand', player

    run: ->
        buttons = @getEntitiesByTag 'button'
        buttons[0].bind 'click', => @runLevel Hotass
        buttons[1].bind 'click', => @runLevel Ninja
        buttons[2].bind 'click', => @runLevel Pirate
