awesome-scripts =   awesome/underscore.coffee awesome/awesome.coffee awesome/object.coffee \
					awesome/collisions/rect.coffee \
					awesome/collisions/entity_rect.coffee awesome/collisions/movement_rect.coffee \
					awesome/collisions/detector.coffee \
					awesome/module.coffee awesome/modules/events.coffee \
					awesome/modules/gravity.coffee awesome/modules/collisions.coffee \
					awesome/modules/jumping.coffee awesome/modules/crouching.coffee \
					awesome/modules/walking.coffee awesome/modules/controls.coffee \
					awesome/attribute_container.coffee awesome/entity.coffee awesome/timer.coffee \
                    awesome/scene.coffee awesome/game.coffee awesome/map.coffee \
                    awesome/rendering/entity_renderer.coffee awesome/rendering/scene_renderer.coffee \
                    awesome/rendering/game_renderer.coffee awesome/entities/text.coffee

game-scripts =      scenes/menu.coffee scenes/level.coffee scenes/death_screen.coffee \
					modules/ai.coffee modules/sight.coffee \
					modules/death.coffee \
					entities/enemy.coffee entities/attention_bar.coffee scenes/levels/candy_land.coffee \
					entities/player.coffee entities/ninja.coffee \
					game.coffee bootstrap.coffee

all: build/awesome.js build/game.js

build/awesome.js: $(awesome-scripts)
	coffee -j build/awesome.js -c $(awesome-scripts)

build/game.js: $(game-scripts)
	coffee -bj build/game.js -c $(game-scripts)
