hbw.ui.editing.events = {

    applyAll : function() {
        hbw.ui.editing.events
        .applyMain()
        .applyOutline()
        .applySteps()
        .applybackground()
        .applyScenarios();
    },
    
    applyMain: function() {
        //
        // Clicks
        var $btn = $(hbw.ui.editing.selector.btn.editMain);
        $btn.click(function(e) {
            hbw.ui.editing.startEditing($(this), $(hbw.ui.editing.selector.box.mainInfos));
            e.preventDefault();
            e.stopPropagation();
        });

        //
        // Changes
        $(hbw.ui.editing.selector.box.mainInfos).find(':text').change(function() {
            hbw.ui.editing.refreshVisualInfos();
        });


        //
        // Callbacks
        hbw.ui.editing.callback.out.editMain = function() {
            hbw.ui.editing.mapper.updateFeatureByView(hbw.ui.editing.feature, $(hbw.ui.editing.selector.box.mainInfos));
            hbw.ui.editing.refreshVisualInfos();
        };

        //
        // Save
        $(hbw.ui.editing.selector.btn.save).click(function(e) {
            e.preventDefault();
            hbw.ui.editing.saveFeature();
            e.stopPropagation();
        });

        return hbw.ui.editing.events;
    },
    applyScenarios: function() {

        //
        // Update a scenario
        var $btn = $(hbw.ui.editing.selector.btn.editScenario);
        $btn.click(function(e) {
            hbw.ui.editing.startEditing($(this), $(hbw.ui.editing.selector.box.scenarios));
            e.preventDefault();
        });

        //
        // Callbacks
        hbw.ui.editing.callback.enter.editScenario = function($caller, $target) {
            var scenario = $caller.data('scenario');
            $target.data('scenario', scenario);
            hbw.ui.editing.populateScenarioView(scenario, $(hbw.ui.editing.selector.box.scenarios) );
        };
        hbw.ui.editing.callback.enter.addScenario = function($caller, $target) {
            var scenario = new hbw.domain.scenario;
            $target.data('scenario', scenario);
            hbw.ui.editing.populateScenarioView(scenario, $(hbw.ui.editing.selector.box.scenarios) );
        };
        hbw.ui.editing.callback.out.updateScenarioDatas = function($caller, $target) {
            var scenario =  $caller.data('scenario');
            hbw.ui.editing.mapper.updateScenarioByView(scenario, $target);
        };

        return hbw.ui.editing.events;
    },
    applybackground: function() {

        //
        // Update the background
        var $btn = $(hbw.ui.editing.selector.btn.editBackground);
        $btn.click(function(e) {
            hbw.ui.editing.startEditing($(this), $(hbw.ui.editing.selector.box.background));
            e.preventDefault();
        });

        //
        // Callbacks
        hbw.ui.editing.callback.enter.editBackground = function($caller, $target) {
            var background = hbw.ui.editing.feature.background;
            $target.data('background', background);
            hbw.ui.editing.populatebackgroundView(background, $(hbw.ui.editing.selector.box.background) );
        };
        hbw.ui.editing.callback.out.updateBackgroundDatas = function($caller, $target) {
            var background = hbw.ui.editing.feature.background;
            hbw.ui.editing.mapper.updateBackgroundByView(background, $target);
        };

        return hbw.ui.editing.events;
    },
    applySteps: function() {
        //
        // Update on changes
        $('.step:text').change(function() {
            var scenario = $(hbw.ui.editing.selector.box.scenarios).data('scenario');
            hbw.ui.editing.updateExample($(hbw.ui.editing.selector.box.examples));
        });


        //
        // Add step
        var $btn = $(hbw.ui.editing.selector.btn.addStep);
        $btn.click(function(e) {
            e.preventDefault();
            var $btn = $(this);
            var type = $btn.data('type');
            var isOutline = $btn.data('isoutline');
//            var $container = $('#box-steps-' + type);
            var $container = $btn.parents('.control-group').prev('.box-then');//$('#box-steps-' + type);
            hbw.ui.editing.addStep($container, type, isOutline);
        });




        return hbw.ui.editing.events;
    },


    applyOutline: function() {

        //
        // Add a row
        var $btn = $(hbw.ui.editing.selector.btn.addOutlineRow);
        $btn.click(function(e) {
            var $btn = $(this);
            var $table = $btn.parents('.outline-node').find('table');
            hbw.ui.editing.addOutlineRow($table, []);
            e.preventDefault();

        });

        //
        // Add a column
        var $btn = $(hbw.ui.editing.selector.btn.addOutlineColumn);
        $btn.click(function(e) {
            e.preventDefault();
            var $btn = $(this);
            var $table = $btn.parents('.outline-node').find('table');
            hbw.ui.editing.addOutlineColumn($table, '');
        });

        //
        // Remove a column
        var $btn = $(hbw.ui.editing.selector.btn.removeOutlineColumn);
        $btn.click(function(e) {
            e.preventDefault();
            var $btn = $(this);
            var $table = $btn.parents('.outline-node').find('table');
            var $td = $btn.parents('th');
            var index = $('th', $btn.parents('tr:first-child')).index($td);
            hbw.ui.editing.removeOutlineColumn($table, index);
        });

        //
        // Remove a Row
        var $btn = $(hbw.ui.editing.selector.btn.removeOutlineRow);
        $btn.click(function(e) {
            e.preventDefault();
            var $btn = $(this);
            var $table = $btn.parents('.outline-node').find('table');
            var $tr = $btn.parents('tr');
            var index = $('tr', $btn.parents('tbody')).index($tr);
            hbw.ui.editing.removeOutlineRow($table, index);
        });
        
        return hbw.ui.editing.events;
    }




};