Awesome.module 'WalkingAnimation', class
    @init: ->
        @bind 'tick', @::tick
        @bind 'startWalking', @::startWalkingAnimation
        @bind 'stopWalking', @::stopWalkingAnimation
        @bind 'playerSpotted', @::setSpottedWalkingAnimation
        @bind 'playerGone', @::setNormalWalkingAnimation
    
    constructor: ->
        @setNormalWalkingAnimation()
        @resetAnimation()
    
    startWalkingAnimation: (direction) ->
        @resetAnimation direction
    
    resetAnimation: (direction = @attrs.direction) ->
        @attrs.set 'background', @walkingAnimations[direction][1]            
    
    stopWalkingAnimation: ->
        @resetAnimation()
        
    setSpottedWalkingAnimation: ->
        @walkingAnimations = @attrs.walkingAnimation.following
    
    setNormalWalkingAnimation: ->
        @walkingAnimations = @attrs.walkingAnimation.normal
        @resetAnimation()
    
    tick: ->
        if @walking
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
            
