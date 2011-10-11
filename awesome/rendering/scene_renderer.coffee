class Awesome.Rendering.SceneRenderer extends Awesome.Object
    constructor: (@scene) ->
        @createElement()
        @appendToGame()
    
    createElement: ->
        @createWrapper()
        @createScene()
    
    createWrapper: ->
        @wrapper = document.createElement 'div'
        @wrapper.id = "scene_#{@scene.name}"

        _.extend @wrapper.style,
            width: "100%"
            height: "100%"
            position: "relative"
    
    createScene: ->
        @sceneEl = document.createElement 'div'
        @wrapper.appendChild @sceneEl

        _.extend @sceneEl.style,
            width: @scene.attrs.size[0] + "px"
            height: @scene.attrs.size[1] + "px"
            left: "0px"
            top: "0px"
            position: "absolute"
            overflow: "hidden"
    
    appendToGame: ->
        @scene.game.renderer.appendElement @wrapper
    
    appendElement: (element) ->
        @sceneEl.appendChild element
    
    appendElementToWrapper: (element) ->
        @wrapper.appendChild element
    
    follow: (entity) ->
        entity.attrs.bind 'change', (name, value) =>
            return unless name is 'position'

            left = @scene.game.attrs.size[0] / 2 - value[0]
            top = @scene.game.attrs.size[1] / 2 - value[1]

            @sceneEl.style.left = "#{left}px"
            @sceneEl.style.top = "#{top}px"
    
    remove: ->
        @scene.game.renderer.removeElement @wrapper
