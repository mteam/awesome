awesome-scripts =   awesome/underscore.coffee awesome/awesome.coffee awesome/object.coffee \
					awesome/collisions/rect.coffee \
					awesome/collisions/entity_rect.coffee awesome/collisions/movement_rect.coffee \
					awesome/collisions/detector.coffee \
					awesome/module.coffee awesome/modules/events.coffee \
					awesome/modules/gravity.coffee awesome/modules/collisions.coffee \
					awesome/modules/jumping.coffee awesome/modules/crouching.coffee \
					awesome/modules/walking.coffee awesome/modules/controls.coffee \
					awesome/modules/walking_animation.coffee \
					awesome/rendering/entity_renderer.coffee awesome/rendering/scene_renderer.coffee \
                    awesome/rendering/game_renderer.coffee \
					awesome/attribute_container.coffee awesome/entity.coffee awesome/timer.coffee \
                    awesome/scene.coffee awesome/game.coffee awesome/map.coffee \
                    awesome/entities/text.coffee \
                    awesome/entities/button.coffee

game-scripts =      modules/ai.coffee modules/sight.coffee modules/death.coffee \
					entities/enemy.coffee entities/end.coffee entities/attention_bar.coffee \
					scenes/menu.coffee scenes/level.coffee scenes/fail_screen.coffee \
					scenes/player_chooser.coffee \
					scenes/levels/candy_land.coffee scenes/levels/tralalalandia.coffee \
					scenes/levels/laboratory.coffee \
					entities/player.coffee entities/ninja.coffee entities/hotass.coffee \
					entities/pirate.coffee \
					game.coffee bootstrap.coffee

all: build/awesome.js build/game.js

build/awesome.js: $(awesome-scripts)
	coffee -j build/awesome.js -c $(awesome-scripts)

build/game.js: $(game-scripts)
	coffee -bj build/game.js -c $(game-scripts)
