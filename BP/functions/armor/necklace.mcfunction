
execute as @r if entity @s[scores={count=0}] run kill @s
execute as @r if entity @s[scores={countbool=1}] run scoreboard players remove @s count 1