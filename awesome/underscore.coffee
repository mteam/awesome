_.mixin
    startsWith: (string, what) ->
        string.slice(0, what.length) is what
