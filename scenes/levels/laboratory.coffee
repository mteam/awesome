class Laboratory extends Level
    name: 'laboratory'

    runNextScene: ->
        @game.run 'winScreen'
