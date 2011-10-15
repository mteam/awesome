class Level extends Awesome.Scene
    #@add AttentionBar

    showDeathScreen: ->
        @game.run 'failScreen', @name, @playerClass

    run: (@playerClass) ->
        @player = @add @playerClass, position: [10, 10]
        @follow @player
    
    runNextScene: ->
