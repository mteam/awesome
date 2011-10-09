class Awesome.Rendering.EntityRenderer extends Awesome.Object
    constructor: (@entity) ->
        @createElement()
        @appendToScene()
        @setupStyles()
        @bind()
    
    createElement: ->
        @el = document.createElement 'div'
        @el.id = "entity_#{@entity.id}"
    
    appendToScene: ->
        @entity.scene.renderer.appendElement @el
    
    setupStyles: ->
        @el.style.position = 'absolute'

        for name, value of @entity.attrs
            @set name, value
    
    bind: ->
        @entity.attrs.bind 'change', @set
    
    set: (name, value) =>
        return unless value?

        @setTitle value if name is 'position'

        _.extend @el.style, @css[name]?.call @entity, value
    
    setTitle: (pos) ->
        if pos?
            @el.title = "[#{pos[0]}, #{pos[1]}]"
    
    css:
        position: (p) ->
            left: p[0] + "px"
            top: p[1] + "px"
        size: (s) ->
            width: s[0] + "px"
            height: s[1] + "px"
        color: (c) ->
            backgroundColor: c
        z: (z) ->
            zIndex: z

        
