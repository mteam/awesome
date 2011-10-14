class Game extends Awesome.Game
    $name: 'awesome'
    $size: [800, 400]

    @addScene 'menu', Menu
    @addScene 'candyLand', CandyLand
    @addScene 'deathScreen', DeathScreen
    @addScene 'playerChooser', PlayerChooser
