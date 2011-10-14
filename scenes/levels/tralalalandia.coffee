class Tralalalandia extends Level
    name: 'tralalalandia'

    runNextScene: ->
        @game.run 'laboratory', @playerClass
