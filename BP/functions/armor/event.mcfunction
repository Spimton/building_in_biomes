event entity @e[hasitem={location=slot.armor.feet,item=spimton:event_feet_piglin_ranged},type=piglin] spawn_adult_ranged
event entity @e[hasitem={location=slot.armor.feet,item=spimton:event_feet_piglin_melee},type=piglin] spawn_adult_melee
event entity @e[hasitem={location=slot.armor.feet,item=spimton:event_feet_comma_targe},type=spimton:piglin_commando] spimton:convert_to_melee
replaceitem entity @e[hasitem={location=slot.armor.feet,item=spimton:event_feet_piglin_ranged},type=piglin] slot.armor.feet 0 air
replaceitem entity @e[hasitem={location=slot.armor.feet,item=spimton:event_feet_piglin_melee},type=piglin] slot.armor.feet 0 air
replaceitem entity @e[hasitem={location=slot.armor.feet,item=spimton:event_feet_comma_targe},type=spimton:piglin_commando] slot.armor.feet 0 air