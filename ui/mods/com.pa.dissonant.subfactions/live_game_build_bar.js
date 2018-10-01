var subfactionsLoaded;

if ( ! subfactionsLoaded )
{

    subfactionsLoaded = true;

    function subfactions()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'subfactions live_game_build_bar.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        if (model.BuildSet && model.BuildSet.tabsTemplate) {
            model.BuildSet.tabsTemplate = model.BuildSet.tabsTemplate.concat([
                ['factory_f', '!LOC:factory', true],
                ['combat_f', '!LOC:combat', true],
                ['utility_f', '!LOC:utility', true],
                ['vehicle_f', '!LOC:vehicle'],
                ['bot_f', '!LOC:bot'],
                ['air_f', '!LOC:air'],
                ['sea_f', '!LOC:sea'],
                ['orbital_f', '!LOC:orbital', true],
                ['orbital_structure_f', 'orbital structure', true]
            ]);
        }
		
 ko.computed(function() {
            var buildSet = model.buildSet();
            if (!buildSet)
                return;
            var hotkeys = model.hotkeys();
            var groups = buildSet.tabsByGroup()

            setTimeout(function() {
                // Get tab hotkeys
                _.forEach(buildSet.tabs(), function(tab) {
                    var baseTab = tab.group().replace('_f', '')
                    if (!tab.label()) {
                        tab.label(groups[baseTab].label())
                    }
                    tab.hotkey(hotkeys['tab_' + baseTab] || '');

                    tab.buildGroup = tab.buildGroup || ko.observable(baseTab)
                    tab.buildGroup(baseTab)
                });
            }, 0)
        })
        
        handlers.start_build_sequence = model.startBuildSequence = function(params) {
            var group = params.group;
            var locked = params.locked;

            var tabs = model.buildSet().tabs().filter(function(tab) {
                return tab.visible() && tab.buildGroup() == group
            })
            if (tabs.length < 1) return
            group = tabs[0].group()

            model.activeBuildGroup(group);
            if (locked)
                model.activeBuildGroupLocked(locked);
        };
        
    }

    try
    {
        subfactions();
    }
    catch (e)
    {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}
		//i'm sorry for butchering your code, PRoeleert.   -Disso