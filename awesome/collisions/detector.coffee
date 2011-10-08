class Awesome.Collisions.Detector extends Awesome.Object
    detect: (rect, other) ->
        [side, overlapX] =
            if @isCollidingFromLeft rect, other
                ['left', rect.wx - other.x]
            else if @isCollidingFromRight rect, other
                ['right', other.wx - rect.x]
            else [null, 0]
        
        [upperSide, overlapY] =
            if @isCollidingFromTop rect, other
                ['top', rect.hy - other.y]
            else if @isCollidingFromBottom rect, other
                ['bottom', other.hy - rect.y]
            else [null, 0]
        
        if side and upperSide
            part: [upperSide, side]
            overlap: [overlapX, overlapY]
            direction: if overlapX > overlapY then upperSide else side
        else
            null
    
    isCollidingFromLeft: (rect, other) ->
        rect.wx > other.x and rect.mw < other.mw
    
    isCollidingFromRight: (rect, other) ->
        rect.x < other.wx and rect.mw >= other.mw
    
    isCollidingFromTop: (rect, other) ->
        rect.hy > other.y and rect.mh < other.mh
    
    isCollidingFromBottom: (rect, other) ->
        rect.y < other.hy and rect.mh >= other.mh
