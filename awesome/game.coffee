class Awesome.Game extends Awesome.Object
    @addScene: (name, scene) ->
        @object('scenes')[name] = scene

    constructor: ->
        @renderer = new Awesome.Rendering.GameRenderer this
        @timer = new Awesome.Timer
        @timer.start()

    run: (name) ->
        @runningScene.remove() if @runningScene?

        scene = @scenes[name]
        instance = new scene this, name
        @runningScene = instance