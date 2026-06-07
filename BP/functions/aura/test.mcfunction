execute at @e[type=spimton:fireball_spawner] run particle minecraft:mobflame_single ~ ~ ~
execute at @e[type=spimton:solar_flare] run particle minecraft:mobflame_single ~ ~ ~
execute at @e[type=spimton:fireball_friendly] run particle minecraft:mobflame_single ~ ~ ~
execute at @e[type=spimton:fireball_friendly_bigg] run particle minecraft:mobflame_single ~ ~ ~
execute at @e[type=spimton:fireball_friendly_antigravity] run particle minecraft:mobflame_single ~ ~ ~
execute at @e[type=spimton:rune_fire] run particle minecraft:lava_particle ~ ~ ~
execute at @e[type=spimton:pbd] run effect @e[r=3] poison 10 0 true
execute at @e[type=spimton:pbd] run effect @e[r=3] slowness 10 0 true
execute at @e[type=spimton:ht_pbd] run effect @e[r=3] fatal_poison 10 1 true
execute at @e[type=spimton:ht_pbd] run effect @e[r=3] slowness 10 3 true
execute at @e[type=spimton:blitzer] run particle spimton:firewarp ~ ~ ~
execute at @e[type=spimton:sacred_spear] run particle minecraft:basic_flame_particle ~ ~ ~
execute at @e[type=spimton:sacred_spear_fast] run particle minecraft:dragon_breath_trail ~ ~ ~
execute at @e[type=spimton:shadowp] run particle minecraft:basic_smoke_particle ~ ~ ~
execute at @e[type=spimton:crither] run particle minecraft:basic_smoke_particle ~ ~1 ~
execute at @e[type=spimton:crither_clone] run particle minecraft:basic_smoke_particle ~ ~1 ~
execute at @e[type=spimton:crimson_king, tag=offensive] run particle minecraft:basic_flame_particle ^0.2 ^1.8 ^0.2
execute at @e[type=spimton:crimson_king, tag=defensive] run particle minecraft:blue_flame_particle ^0.2 ^1.8 ^0.2
execute at @e[type=lightning_bolt] if entity @e[r=1,type=!lightning_bolt] run effect @e[type=spimton:justice_champion] regeneration 1 3 true
execute as @e[type=spimton:bronze_golem] if entity @s[scores={bronze_ammo=0}] run event entity @s spimton:no_ammo
execute as @e[type=spimton:bronze_golem] unless entity @s[scores={bronze_ammo=0}] run event entity @s spimton:has_ammo
execute at @e[type=spimton:goulden_laser] run particle minecraft:dragon_breath_trail ~ ~ ~
execute at @e[type=spimton:obliterator_laser] run particle spimton:green_flame_burst ~ ~ ~
execute at @e[type=spimton:obliterator_shooter] run particle spimton:green_flame_burst ~ ~ ~
execute at @e[type=spimton:obliterator_flame] run particle minecraft:basic_flame_particle ~ ~ ~
execute at @e[type=spimton:soul_bolt] run particle spimton:soul_trail ~ ~ ~