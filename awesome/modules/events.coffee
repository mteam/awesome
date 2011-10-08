Awesome.module 'Events', class
    @bind: (event, fn) ->
        @object('classEvents')[event] ?= []
        @object('classEvents')[event].push fn

    bind: (event, fn) ->
        @events ?= {}
        
        @events[event] ?= []
        @events[event].push fn

        this
    
    unbind: (event, fn) ->
        @events ?= {}

        events = @events[event]
        if events?
            index = events.indexOf fn
            delete events[index] if index > -1
        
        this
    
    trigger: (event, args...) ->
        @events ?= {}
        
        events = []
        events = events.concat @events[event] if @events[event]?
        events = events.concat @classEvents[event] if @classEvents? and @classEvents[event]?
        
        fn.apply this, args for fn in events when _(fn).isFunction()
        
        this
    
    logEvent: (event) ->
        @bind event, ->
            console.log event
