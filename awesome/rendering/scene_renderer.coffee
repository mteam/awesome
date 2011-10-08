class Awesome.Rendering.SceneRenderer extends Awesome.Object
    constructor: (@scene) ->
        @createElement()
        @appendToGameElement()
    
    createElement: ->
        @el = document.createElement 'div'
        @el.id = "scene_#{@scene.name}"
        _.extend @el.style,
            width: @scene.attrs.size[0] + "px"
            height: @scene.attrs.size[1] + "px"
            left: "0px"
            top: "0px"
            position: "absolute"
            overflow: "hidden"
    
    follow: (entity) ->
        entity.attrs.bind 'change', (name, value) =>
            return unless name is 'position'

            left = @scene.game.attrs.size[0] / 2 - value[0]
            top = @scene.game.attrs.size[1] / 2 - value[1]

            @el.style.left = "#{left}px"
            @el.style.top = "#{top}px"
    
    appendToGameElement: ->
        @scene.game.renderer.el.appendChild @el
