scoreboard objectives add cooldown_shriek dummy
scoreboard players add @a[tag=cooldown_shriek_basic] cooldown_shriek 1
tag @a[scores={cooldown_shriek=3600..}] remove cooldown_shriek_basic
scoreboard players set @a[scores={cooldown_shriek=3600..}] cooldown_shriek 0