class Awesome.Entities.Button extends Awesome.Entity
    @Renderer: class ButtonRenderer extends Awesome.Rendering.EntityRenderer
        createElement: ->
            @el = document.createElement 'button'
        
        setImage: (image) ->
            unless @image?
                @image = document.createElement 'img'
                @el.appendChild @image
            
            @image.src = "../images/#{image}"
        
        set: (name, value) ->
            switch name
                when 'text' then @el.innerHTML = value
                when 'image' then @setImage value
                else super
    
    @include 'Events'
    @tag 'button'

    rendererClass: @Renderer
    
    setupRenderer: ->
        super

        @renderer.el.addEventListener 'click', => @trigger 'click'
        @renderer

class Awesome.Entities.ImgButton extends Awesome.Entity
    @Renderer: class ButtonRenderer extends Awesome.Rendering.EntityRenderer
        createElement: ->
            @el = document.createElement 'img'
        
        set: (name, value) ->
            switch name
                when 'image' then @el.src = "../images/buttons/#{value}"
                else super
    
    @include 'Events'
    @tag 'button'

    rendererClass: @Renderer
    
    setupRenderer: ->
        super

        @renderer.el.addEventListener 'click', => @trigger 'click'
        @renderer
