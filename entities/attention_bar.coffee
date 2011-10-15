class AttentionBar extends Awesome.Entity
    $growSpeed: 2
    $fallSpeed: 0.2
    $position: [10, 10]
    $size: [200, 10]
    $z: 10

    @tag 'attentionBar'

    @Renderer: class AttentionBarRenderer extends Awesome.Rendering.EntityRenderer    
        setupStyles: ->
            super

            @el.style.border = "1px solid gray"
        
        appendToScene: ->
            @entity.scene.renderer.appendElementToWrapper @el

        _.extend @object('css'),
            attention: (a) ->
                backgroundImage: "-webkit-gradient(linear, left top, right top, color-stop(#{a / 100}, red), color-stop(#{a / 100}, white))"

    constructor: ->
        super

        @bind 'tick', @tick
        @attrs.set 'attention', 0

    rendererClass: @Renderer
    
    grow: ->
        @growing = true
    
    stopGrowing: ->
        @growing = false
    
    tick: ->
        if @growing and @attrs.attention < 100
            if @attrs.attention + @attrs.growSpeed >= 100
                @attrs.attention = 100
                @trigger 'full'
            else
                @attrs.attention += @attrs.growSpeed

        if @attrs.attention > 0
            if @attrs.attention - @attrs.fallSpeed <= 0
                @attrs.attention = 0
            else
                @attrs.attention -= @attrs.fallSpeed
