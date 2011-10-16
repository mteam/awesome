class FlyingLandRenderer extends Awesome.Rendering.EntityRenderer
    createElement: ->
        super

        @el.left = document.createElement 'div'
        @el.middle = document.createElement 'div'
        @el.right = document.createElement 'div'

        @el.appendChild @el.left
        @el.appendChild @el.middle
        @el.appendChild @el.right
    
    setupStyles: ->
        super
        
        @el.left.style.float = @el.middle.style.float = @el.right.style.float = "left"

    set: (name, value) ->
        unless name is 'background'
            super
        else
            _.extend @el.left.style, @getCssValue('background', value[0])
            _.extend @el.middle.style, @getCssValue('background', value[1])
            _.extend @el.right.style, @getCssValue('background', value[2])
    
    _.extend @object('css'),
        size: (s) ->
            el = @renderer.el

            el.left.style.width = el.right.style.width =
                el.left.style.height = el.right.style.height = s[1] + "px"
            
            el.middle.style.width = s[0] - 40 + "px"
            el.middle.style.height = s[1] + "px"

            width: s[0] + "px"
            height: s[1] + "px"