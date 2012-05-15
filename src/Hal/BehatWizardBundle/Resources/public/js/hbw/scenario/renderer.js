hbw.scenario.renderer = function(scenario) {
    this.scenario = scenario;

    this.html = {
        $input: null,
        $container: null,
        given: {
            $container : null,
            $fields : [],
            $btnAdd : null
        },
        when: {
            $container : null,
            $fields : [],
            $btnAdd : null
        },
        then: {
            $container : null,
            $fields : [],
            $btnAdd : null
        },
        example: {
            $container : null,
            $fields : [],
            $btnAdd : null
        }
    }

    this.addStep= function (step) {

    }

    this.render = function() {
        
    }
}