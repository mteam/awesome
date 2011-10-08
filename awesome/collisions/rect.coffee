class Awesome.Collisions.Rect
    Object.defineProperties this::,
        wx: { get: -> @w + @x }
        hy: { get: -> @h + @y }
        mw: { get: -> @x + @w / 2 }
        mh: { get: -> @y + @h / 2 }
