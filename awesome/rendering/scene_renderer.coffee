class Awesome.Rendering.SceneRenderer extends Awesome.Object
    constructor: (@scene) ->
        @changes = []

        @createElement()
        @appendToGame()

        @sceneEl.addEventListener 'click', (e) ->
            console.log "[#{e.offsetX}, #{e.offsetY}]" if e.button is 1
        
        @flush()
    
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
        @following = entity
        entity.attrs.bind 'change', (name) =>
            @addChange name if name is 'position'
    
    addChange: (name) ->
        @changes.push name unless name in @changes
    
    flush: =>
        for change in @changes
            continue unless change is 'position'

            left = @scene.game.attrs.size[0] / 2 - @following.attrs.position[0]
            top = @scene.game.attrs.size[1] / 2 - @following.attrs.position[1]

            @sceneEl.style.left = "#{left}px"
            @sceneEl.style.top = "#{top}px"
        
        @changes = []

        _.requestAnimationFrame @flush

    
    remove: ->
        @scene.game.renderer.removeElement @wrapper
