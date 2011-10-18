class Manual extends Awesome.Scene
    name: 'manual'

    @add Awesome.Entities.ImgButton, position: [350, 30], size: [150, 50], image: 'backtomenu.png'
    @add Awesome.Entities.Text, { position: [200, 150], size: [400, 1000], text: """
        <p>
            You want to destroy the world, because your parents, Mr. Cane and Mrs. Donut, told you that
            you are adopted.
        </p>
        <p>
            There are three levels - Candy Land, Tralalalandia and Laboratory. In each there are 4 types of
            monsters that want to kill you.
        </p>
        <p>
            When they notice you, they will run after you. However, you can hide behind things by crouching
            (down arrow) or run from them.
        </p>
        <p>
            Good luck.
        </p>
    """ }

    $background: 'menu.png'

    run: ->
        buttons = @getEntitiesByTag('button')
        buttons[0].bind 'click', => @game.run 'menu'
