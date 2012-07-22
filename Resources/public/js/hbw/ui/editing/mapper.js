hbw.ui.editing.mapper = {

    updateScenarioByView: function(scenario, $container) {
        
        var feature = scenario.parent;
        var index = scenario.index;

        
        scenario = new hbw.domain.scenario({});

        //
        // Title
        scenario.title = $('#scenario-title').val();

        //
        // Steps
        $('.step:text',$container).each(function() {
            var $ipt = $(this);
            var $box = $ipt.parents('.box-step');
            
            var step = new hbw.domain.step;
            step.type = $ipt.data('step-type');
            step.text = $ipt.val();

            //
            // Outline
            var $outline = $box.next('.outline');
            var oldOutline = $outline.data('outline');
            var outline = new hbw.domain.outline();
            $('.outline-row', $outline).each(function() {
                var $tr = $(this);
                var row = [];
                $('.outline-content', $tr).each(function() {
                    row.push($(this).val());
                });
                outline.push(row);
            });
            if(outline.rows.length > 0) {
                step.outline = outline;
            }

            scenario.addStep(step);
        });

        // Examples


        console.log(scenario);

        //
        // Push scenario into feature
        feature.addScenario(scenario, index);
    },


    updateBackgroundByView: function(background, $container) {
        
    }
}
