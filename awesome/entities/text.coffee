class Awesome.Entities.Text extends Awesome.Entity
    @Renderer: class TextRenderer extends Awesome.Rendering.EntityRenderer
        set: (name, value) ->
            unless name is 'text'
                super
            else
                @el.innerHTML = value
        
        _.extend @object('css'),
            fontSize: (s) ->
                fontSize: s + "px"
            align: (a) ->
                textAlign: a

    rendererClass: @Renderer
