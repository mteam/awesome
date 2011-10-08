class Awesome.Rendering.GameRenderer extends Awesome.Object
    constructor: (@game) ->
        @createElement()
        @appendElementToBody()
    
    createElement: ->
        @el = document.createElement 'div'
        @el.id = @game.attrs.name
        _.extend @el.style,
            width: @game.attrs.size[0] + "px"
            height: @game.attrs.size[1] + "px"
            overflow: 'hidden'
            position: 'relative'
    
    appendElementToBody: ->
        el = @el
        append = -> document.body.appendChild el
        bind = window.addEventListener || window.attachEvent

        if document.body?
            append()
        else
            bind 'load', append, false
