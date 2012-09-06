hbw.ui.editing.mapper = {

    updateScenarioByView: function(scenario, $container) {
        
        var feature = scenario.parent;
        var index = scenario.index;

        feature.removeScenario(scenario);
        scenario = new hbw.domain.scenario({});

        //
        // Title
        scenario.title = $('#scenario-title', $container).val();
        if(scenario.title.length == 0) {
            scenario.title = '[None]';
        }
        //
        // Steps
        hbw.ui.editing.mapper.pushStepsIntoNode(scenario, $container);

        //
        // Examples
        this.pushOutlineIntoNode(scenario, $('.outline-node.examples', $container), 'examples');
        
        //
        // Push scenario into feature
        feature.addScenario(scenario, index);
        
        //
        // Update
        return scenario;
    },


    updateBackgroundByView: function(background, $container) {
        var feature = background.parent;

        background = new hbw.domain.scenario({});
        background.parent = feature;

        //
        // Steps
        hbw.ui.editing.mapper.pushStepsIntoNode(background, $container);

        //
        // Push scenario into feature
        feature.background = background;
    },
    updateFeatureByView: function(feature, $container) {
        hbw.ui.editing.feature.title = $('#title', $container).val();
        hbw.ui.editing.feature.inorder = $('#inorder', $container).val();
        hbw.ui.editing.feature.as = $('#as', $container).val();
        hbw.ui.editing.feature.should = $('#should', $container).val();
        hbw.ui.editing.feature.notes = $('#notes', $container).val();
    },


    pushStepsIntoNode: function(node, $container) {
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
            hbw.ui.editing.mapper.pushOutlineIntoNode(step, $outline);

            node.addStep(step);
        });
    },

    pushOutlineIntoNode:function(node, $outline, attributeName) {
        attributeName = attributeName || 'outline';
        var outline = new hbw.domain.outline();
        $('.outline-row', $outline).each(function() {
            var $tr = $(this);
            var row = [];
            $('.outline-content', $tr).each(function() {
                row.push($(this).val());
            });
            if(row.length > 0) {
                outline.push(row);
            }
        });
        if(outline.rows.length > 0) {
            node.outline = outline;
            node[attributeName] = outline;
        }
    }
}
