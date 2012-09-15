hbw.ui.editing.events = {

    applyAll : function() {
        hbw.ui.editing.events
        .applyMain()
        .applyOutline()
        .applySteps()
        .applybackground()
        .applyScenarios()
        .applyShortcuts()
        .applyFixes();
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
        // Remove a scenario
        var $btn = $(hbw.ui.editing.selector.btn.removeScenario);
        $btn.click(function(e) {
            var $btn = $(this);
            var scenario = $btn.parents('.scenario').data('scenario');
            hbw.ui.editing.removeScenario(scenario);        
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
            scenario.parent = hbw.ui.editing.feature;
            scenario.title = 'My New Scenario';
            $target.data('scenario', scenario);
            hbw.ui.editing.populateScenarioView(scenario, $(hbw.ui.editing.selector.box.scenarios) );
        //            hbw.ui.editing.addScenario(scenario, $target);
        };
        hbw.ui.editing.callback.out.updateScenarioDatas = function($caller, $target) {
            var scenario =  $caller.data('scenario');
            hbw.ui.editing.updateScenario(scenario, $target);
        };
        hbw.ui.editing.callback.out.addScenario = function($caller, $target) {
            var scenario =  $target.data('scenario');
            hbw.ui.editing.addScenario(scenario, $target);
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
            var $container = $btn.parents('.control-group').prev('.box-step');
            hbw.ui.editing.addStep($container, type, isOutline);
        });
        
        
        //
        // Remove step
        var $btn = $(hbw.ui.editing.selector.btn.removeStep);
        $btn.click(function(e) {
            e.preventDefault();
            var $btn = $(this);
            var $container = $btn.parents('.box-step:first');
            hbw.ui.editing.removeStep($container);
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
    },
    
    
    applyShortcuts : function() {
        
        //
        // Data of step
        $(':text', $(hbw.ui.editing.selector.input.stepAll)).keypress(function(e) {
            var $e = $(this);
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code == 13) {
                if($e.val() != '') {
                    //
                    // Step is not empty
                    if($e.parents('.box-step').next('.outline').length == 1) {
                        //
                        // Step contains outline elements
                        $e.parents('.box-step').next('.outline').find(':text:first').focus();
                    } else {
                        //
                        // Step is standard
                        var $btn = $e.parents('.box-step').next('.control-group').find('.btn-step-add:first');
                        $btn.click();
                    }
                    e.stopPropagation();
                } else {
                    //
                    // Step is empty : go to the next step type
                    var $parent = $e.parents('.box-step:first');
                    
                    if($parent.is('#step-given')) {
                        $('#box-steps-when').parents('fieldset').find(':text:empty:first').focus();
                    }else if($parent.is('#step-when')) {
                        $('#box-steps-then').parents('fieldset').find(':text:empty:first').focus();
                    } else if($parent.is('#step-then')) {
                        $e.parents('.box-scenario').find('.btn-feature-edit:first').click();
                    }
                    
                    //
                    // Remove unused steps
                    if($(':text[value=""]', $e.parents('fieldset')).length > 0) {
                        $e.parents('.box-step:first').remove();
                    }
                    
                }
            }
        });
        return hbw.ui.editing.events;
    },

    applyFixes : function() {
        //
        // the "value" attribute of any dom element is never updated by the browser
        $(':text').blur(function() {
            $(this).attr('value', $(this).val());
        });
        return hbw.ui.editing.events;
    }
};