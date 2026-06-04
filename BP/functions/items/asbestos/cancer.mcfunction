effect @e[scores={asbestos=199}] slowness infinite 1 true
scoreboard players set @e[scores={asbestos=200}] asbestos 0
effect @e[scores={cancer=3}] wither infinite 4 true
scoreboard players set @e[scores={cancer=3}] cancer 0
scoreboard objectives add asbpoison dummy "Asbestos Poisoning Treshold"
scoreboard players set @a asbpoison 200
execute as @e if score @s asbestos >= @r asbpoison run scoreboard players set @s asbestos 1
execute as @e if score @s asbestos >= @r asbpoison run effect @s slowness infinite 1 true
execute at @e[type=spimton:cancer_giver] run scoreboard players add @e[r=2] asbestos 1
effect @e[scores={asbestos=200}] slowness infinite 1 true
effect @e[scores={pharaohcursespimton=!0}] blindness 11 1 true
effect @e[scores={pharaohcursespimton=!0}] nausea 11 1 true
execute at @e[scores={cannate=!0}] anchored eyes run particle spimton:piss ~ ~0.1 ~
execute as @e[scores={cannate=!0}] run effect @s clear invisibility
execute at @e[scores={pharaohcursespimton=!0}] anchored eyes run loot spawn ^ ^ ^0.5 loot "entities/pharaohcurse"