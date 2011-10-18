Awesome.module 'Controls', class
    constructor: ->
        window.addEventListener 'keydown', @keyDown, false
        window.addEventListener 'keyup', @keyUp, false
        @pressed = {}
    
    keyDown: (e) =>
        if not @pressed[e.keyCode]
            switch e.keyCode
                when 37 then @startWalking 'left'
                when 39 then @startWalking 'right'
                when 38 then @jump()
                when 40 then @crouch()
            @pressed[e.keyCode] = true
    
    keyUp: (e) =>
        switch e.keyCode
            when 37, 39 then @stopWalking()
            when 40 then @standUp()
        @pressed[e.keyCode] = false
