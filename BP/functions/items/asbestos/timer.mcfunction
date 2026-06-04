scoreboard objectives add asbestos dummy
scoreboard players add @e[hasitem= {location=slot.weapon.mainhand,item=spimton:asbestos_sheet}, scores={asbestos=!200}] asbestos 1
scoreboard objectives add cancer dummy
execute as @e if score @s asbestos >= @r asbpoison run scoreboard players add @s cancer 1
scoreboard players add @e asbestos 0
execute as @e[type=spimton:overgrown_archshaman] run execute as @s if score @s mih_time < @s mih_treshold run scoreboard players add @s mih_time 1
execute as @n[scores={mih_treshold=1200..1499}] run time add 150
execute as @n[scores={mih_treshold=1500..1799}] run time add 300
execute as @n[scores={mih_treshold=1800..2099}] run time add 450
execute as @n[scores={mih_treshold=2100..}] run time add 600
scoreboard players remove @e[scores={pharaohcursespimton=!0}] pharaohcursespimton 1
scoreboard players remove @e[scores={cannate=!0}] cannate 1