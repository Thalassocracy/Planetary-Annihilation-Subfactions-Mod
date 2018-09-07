if (model.BuildSet && model.BuildSet.tabsTemplate) {
            model.BuildSet.tabsTemplate = model.BuildSet.tabsTemplate.concat([
                ['factorf', '!LOC:factory', true],
                ['combatf', '!LOC:combat', true],
                ['utilityf', '!LOC:utility', true],
                ['vehiclef', '!LOC:vehicle'],
                ['botf', '!LOC:bot'],
                ['airf', '!LOC:air'],
                ['seaf', '!LOC:sea'],
                ['orbitalf', '!LOC:orbital', true],
                ['orbital_structuref', 'orbital structure', true]
            ]);
        }