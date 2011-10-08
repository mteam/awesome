class Awesome.Timer extends Awesome.Object
    @include 'Events'

    constructor: (@fps = 60) ->
    
    tick: =>
        @trigger 'tick'
    
    start: ->
        @timer = window.setInterval @tick, 1000 / @fps
    
    stop: ->
        window.clearInterval @timer
  