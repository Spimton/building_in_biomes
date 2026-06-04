effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_vitality}] health_boost 3 4 true
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear levitation
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear slowness
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear weakness
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear poison
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear wither
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear infested
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear hunger
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear darkness
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear blindness
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear nausea
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_resonance}] clear mining_fatigue
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_flight}] slow_falling 5 0 true
effect @e[hasitem={location=slot.weapon.mainhand,item=spimton:totem_of_flight}] levitation 1 1 true
execute as @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_enfeeblement}] at @s run effect @e[r=4] weakness 2 5 false
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_enfeeblement}] clear weakness
execute as @e[hasitem={location=slot.weapon.mainhand,item=spimton:totem_of_enfeeblement}] at @s run effect @e[r=4] slowness 2 5 false
effect @e[hasitem={location=slot.weapon.mainhand,item=spimton:totem_of_enfeeblement}] clear slowness
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_vision}] invisibility 5 1 true
effect @e[hasitem={location=slot.weapon.mainhand,item=spimton:totem_of_vision}] night_vision 15 1 true
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_poison}] clear fatal_poison
effect @e[hasitem={location=slot.weapon.offhand,item=spimton:totem_of_poison}] clear poison
execute at @e[hasitem={location=slot.weapon.mainhand,item=spimton:totem_of_poison}] run effect @e[r=10] clear fatal_poison
execute at @e[hasitem={location=slot.weapon.mainhand,item=spimton:totem_of_poison}] run effect @e[r=10] clear poison
effect @e[hasitem={location=slot.weapon.mainhand,item=spimton:totem_of_luxury}] village_hero 1 0 true