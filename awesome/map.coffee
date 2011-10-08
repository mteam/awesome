class Awesome.Map extends Awesome.Object
    @add: (entity, properties) ->
        @array('entities').push {entity, properties}
    
    @addEntitiesToScene: (scene) ->
        for {entity, properties} in @array('entities')
            scene.add entity, properties
