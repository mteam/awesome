Awesome.module 'Controls', class
    constructor: ->
        window.addEventListener 'keydown', @keyDown, false
        window.addEventListener 'keyup', @keyUp, false
    
    keyDown: (e) =>
        switch e.keyCode
            when 37 then @startWalking 'left'
            when 39 then @startWalking 'right'
            when 38 then @jump()
            when 40 then @crouch()
    
    keyUp: (e) =>
        switch e.keyCode
            when 37, 39 then @stopWalking()
            when 40 then @standUp()
