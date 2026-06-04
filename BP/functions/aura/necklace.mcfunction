effect @e[hasitem={location=slot.armor.chest,item=spimton:galena_necklace}] slowness 3 1 true
effect @e[tag=novelty:spimton:galena_necklace] slowness 3 1 true
effect @e[hasitem={location=slot.armor.chest,item=spimton:might_necklace}] jump_boost 3 2 true
effect @e[hasitem={location=slot.armor.chest,item=spimton:might_necklace}] strength 3 2 true
execute at @e[hasitem={location=slot.armor.chest,item=spimton:chilling_necklace}] run effect @e[r=5] slowness 1 0 true
effect @e[hasitem={location=slot.armor.chest,item=spimton:chilling_necklace}] clear slowness
effect @e[tag=novelty:spimton:might_necklace] jump_boost 3 2 true
effect @e[tag=novelty:spimton:might_necklace] strength 3 2 true
execute at @e[tag=novelty:spimton:chilling_necklace] run effect @e[r=5] slowness 1 0 true
effect @e[tag=novelty:spimton:chilling_necklace] clear slowness