class Awesome.Game extends Awesome.Object
    @addScene: (scene) ->
        @object('scenes')[scene::name] = scene

    constructor: ->
        @renderer = new Awesome.Rendering.GameRenderer this
        @timer = new Awesome.Timer
        @timer.start()

    run: (name, args...) ->
        @runningScene.remove() if @runningScene?

        scene = @scenes[name]
        instance = new scene this, name, args
        @runningScene = instance
