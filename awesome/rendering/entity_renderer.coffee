class Awesome.Rendering.EntityRenderer extends Awesome.Object
    constructor: (@entity) ->
        @changes = []

        @createElement()
        @setElementId()
        @appendToScene()
        @setupStyles()
        @bind()
        @flush()
    
    createElement: ->
        @el = document.createElement 'div'
    
    setElementId: ->
        @el.id = "entity_#{@entity.id}"

    appendToScene: ->
        @entity.scene.renderer.appendElement @el
    
    setupStyles: ->
        @el.style.position = 'absolute'

        for name, value of @entity.attrs
            @set name, value
    
    bind: ->
        @entity.attrs.bind 'change', @addNewChange
    
    addNewChange: (name, value) =>
        @changes.push name unless name in @changes
    
    flush: =>
        return if @dead

        for name in @changes
            @set name, @entity.attrs[name]
        
        @changes = []
        
        _.requestAnimationFrame @flush
    
    set: (name, value) =>
        return unless value?

        @setTitle value if name is 'position'

        _.extend @el.style, @getCssValue(name, value)
    
    setTitle: (pos) ->
        if pos?
            @el.title = "[#{pos[0]}, #{pos[1]}]"
    
    remove: ->
        delete @el
        @dead = true
    
    getCssValue: (name, value) ->
        @css[name]?.call @entity, value
    
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
        background: (b) ->
            backgroundImage: "url(../images/#{b})"
        bgRepeat: (r) ->
            backgroundRepeat:
                switch r
                    when 'x' then 'repeat-x'
                    when 'y' then 'repeat-y'
                    when 'no' then 'no-repeat'

        
