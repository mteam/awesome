requestAnimFrame =
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    (callback) ->
        window.setTimeout callback, 1000 / 60

_.mixin
    startsWith: (string, what) ->
        string.slice(0, what.length) is what
    
    requestAnimationFrame: (c) ->
        requestAnimFrame c
