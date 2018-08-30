model.localChatMessage(loc("!LOC:Subfaction Mod"), loc("!LOC:currently a work in progress. To play as Foundation, select Nemicus (orbital and ragnarok missing). Some icons are missing."));


var foundationcommanders = ["/pa/units/commanders/raptor_nemicus/raptor_nemicus.json"];
var vanillacommanders = ["/pa/units/commanders/quad_osiris/quad_osiris.json", "/pa/units/commanders/imperial_delta/imperial_delta.json"];

model.isNotFoundation = function (commander, isEmpty) {
  if (!isEmpty) {
    return !_.includes(foundationcommanders, commander);
  }
  else {
    return true;
  }
}

model.isMLA = function (commander, isEmpty) {
  if (!isEmpty) {
    return !_.includes(foundationcommanders, commander);
  }
}

model.changeFoundationAI = function (playerid) {
  //console.log("change to foundation");
  model.send_message('set_ai_commander', {
    id: playerid,
    ai_commander: foundationcommanders[_.random(foundationcommanders.length - 1)]
  });
}

model.changeVanillaAI = function (playerid) {
  //console.log("change to vanilla");
  model.send_message('set_ai_commander', {
    id: playerid,
    ai_commander: vanillacommanders[_.random(vanillacommanders.length - 1)]
  });
}

//NEED PATCHED lobby.js
//To Foundation Button
$('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai() && model.isNotFoundation(slot.commander()),click: function() { model.changeFoundationAI(slot.playerId());}"><loc>To Foundation</loc></div>');
//To Vanilla Button
$('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai() && !model.isNotFoundation(slot.commander()),click: function() { model.changeVanillaAI(slot.playerId());}"><loc>To MLA</loc></div>');
locUpdateDocument();
//ENDOF NEED PATCHED lobby.js