Awesome.module 'WalkingAnimation', class
    @init: ->
        @bind 'tick', @::tick
        @bind 'startWalking', @::startWalkingAnimation
        @bind 'stopWalking', @::stopWalkingAnimation
        @bind 'playerSpotted', @::setSpottedWalkingAnimation
        @bind 'playerGone', @::setNormalWalkingAnimation
        @bind 'crouch', @::setCrouchingAnimation
        @bind 'standUp', @::setNormalWalkingAnimation
    
    constructor: ->
        @setNormalWalkingAnimation()
        @resetAnimation()
    
    startWalkingAnimation: (direction) ->
        @resetAnimation direction
    
    resetAnimation: (direction = @attrs.direction) ->
        return if @crouching
        @attrs.set 'background', @attrs.walkingAnimation.standing || @walkingAnimations[direction][1]            
    
    stopWalkingAnimation: ->
        @resetAnimation()
        
    setSpottedWalkingAnimation: ->
        @walkingAnimations = @attrs.walkingAnimation.following
    
    setNormalWalkingAnimation: ->
        @walkingAnimations = @attrs.walkingAnimation.normal
        @resetAnimation()
    
    setCrouchingAnimation: ->
        @attrs.background = @attrs.walkingAnimation.crouching
    
    tick: ->
        if @walking and not @crouching
            index = @getAnimationIndex()
            @attrs.background = @walkingAnimations[@attrs.direction][index]

    getAnimationIndex: ->
        @animIndex ?= 0
        @maxAnimIndex ?= @attrs.walkingAnimation.normal.left.length - 1
        @animCounter ?= 0

        if @animCounter > (@attrs.walkAnimationSpeed || 1)
            if @animIndex + 1 > @maxAnimIndex
                @animIndex = 0
            else
                @animIndex++
            @animCounter = 0
        else
            @animCounter++ 
        
        @animIndex
            
