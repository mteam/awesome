class Awesome.Entities.Button extends Awesome.Entity
    @Renderer: class ButtonRenderer extends Awesome.Rendering.EntityRenderer
        createElement: ->
            @el = document.createElement 'button'
            window.setTimeout (=> @el.focus()), 100 # sorry
        
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
    
    getRenderer: ->
        renderer = new Button.Renderer this
        renderer.el.addEventListener 'click', => @trigger 'click'
        renderer
