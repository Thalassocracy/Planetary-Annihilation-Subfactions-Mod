//START - moar code taken from Legion for purple commander select
var subfactionsLoaded;

if (!subfactionsLoaded) {

    subfactionsLoaded = true;

    function loadSubfactions() {

        var subfactionsEnabled;

        model.enableSubfactions = function () {

            if (subfactionsEnabled) {
                return;
            }

            subfactionsEnabled = true;

            loadCSS('coui://ui/mods/com.pa.dissonant.subfactions/css/subf_commander_picker.css');

            var foundationcommander = ['pa/units/commanders/raptor_nemicus/raptor_nemicus.json'];

            model.isNotFoundation = function (commander, isEmpty) {
              if (!isEmpty) {
                return !_.includes(foundationcommander, commander);
              }
              else {
                return true;
              }
            }
            
            model.isMLA = function (commander, isEmpty) {
              if (!isEmpty) {
                return !_.includes(foundationcommander, commander);
              }
            }

            //Style Commander Picker Legion
            $('#commander-picker .div-commander-picker-item.btn_std_ix').attr("data-bind", "css: {foundationcommander:!model.isNotFoundation($data)}, click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'");
            $('#ai-commander-picker .div-commander-picker-item.btn_std_ix').attr("data-bind", "css: {foundationcommander: !model.isNotFoundation($data)}, click: function () { model.setAICommander(model.selectedAI(), $data) }, click_sound: 'default', rollover_sound: 'default'");
            
            $('.slot-player').attr("data-bind", "css: {foundationslot: !model.isNotFoundation($data.commander(),$data.isEmpty()), mlaslot: model.isMLA($data.commander(),$data.isEmpty()), ready: isReady, loading: isLoading}");
        }
        
        model.enableSubfactions();
    }

    try {
        loadSubfactions();
    } catch (e) {
        console.error(e);
    }
}
//END


model.localChatMessage(loc("!LOC:Subfaction Mod"), loc("!LOC:currently a work in progress. To play as Foundation, select Nemicus."));

/* START - Button to set AI to Foundation (from Quitch)
* 
* This code is taken from Legion Expansion
* It might need duplicating in a client mod or else can break if the player accesses the system menu before the lobby UI finishes loading
* Or maybe that got patched by the Community features - I'm honestly not sure
* I've not idea what patched lobby.js is and the Legion Expansion doesn't appear to have one either so it might be legacy
* Stops the Legion CSS from being properly applied to Legion army rows - cosmetic, but you should probably fix that
*
*/

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

// END - Button to set AI to Foundation


