class AttentionBar extends Awesome.Entity
    $growSpeed: 0.5
    $fallSpeed: 0.2
    $position: [10, 10]
    $size: [200, 10]
    $z: 10

    constructor: ->
        super

        @bind 'tick', @tick
        @attrs.set 'attention', 0

    getRenderer: ->
        new AttentionBar.Renderer this
    
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



class AttentionBar.Renderer extends Awesome.Rendering.EntityRenderer    
    setupStyles: ->
        super

        @el.style.border = "1px solid gray"

    _(@object('css')).extend
        attention: (a) ->
            backgroundImage: "-webkit-gradient(linear, left top, right top, color-stop(#{a / 100}, red), color-stop(#{a / 100}, white))"
