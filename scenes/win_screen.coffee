class WinScreen extends Awesome.Scene
    name: 'winScreen'

    @add Awesome.Entities.Text,
        position: [350, 100],
        size: [100, 50],
        align: 'center',
        fontSize: 30,
        text: "Win"
    
    @add Awesome.Entities.Text,
        position: [200, 200],
        size: [400, 50],
        align: 'center',
        fontSize: 25,
        text: "You've destroyed the world in "
    
    run: ->
        texts = @getEntitiesByTag 'text'
        diff = (new Date).getTime() - @game.startTime.getTime()
        diff /= 1000
        diff = Math.floor diff
        minutes = Math.floor(diff / 60)
        seconds = diff - minutes * 60
        seconds = if seconds < 10 then "0#{seconds}" else "#{seconds}"
        texts[1].attrs.text += "#{minutes}:#{seconds}"

        @playAudio 'rem-end_of_the_world.mp3'
