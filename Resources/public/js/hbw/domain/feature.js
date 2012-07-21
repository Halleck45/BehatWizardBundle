/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Feature
 *
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
hbw.domain.feature = function() {

    /**
     * Form informations
     *
     * @var object
     */
    this.form = {
        name: 'default'
    }

    /**
     * Scenarios
     *
     * @var array
     */
    this.scenarios = [];

    /**
     * Background
     *
     * @var hbw.domain.outline
     */
    this.background = null;

    /**
     * Examples
     *
     * @var hbw.domain.outline
     */
    this.examples = null;


    /**
     * To string conversion
     *
     * @return string
     */
    this.toString = function () {
//        var html, i;
//        for(i in this.scenarios) {
//            html += this.scenarios[i];
//        }
//        return html;
    }

    /**
     * Constructor
     *
     * @param data [ steps:[ {content:"", example: null}, ...], example: null ]
     * @return hbw.domain.scenario
     */
    this.initialize = function(datas) {




//        var i, type, step, outline;
//        var steps = datas['steps'],
//        example = datas['example'];
//
//        for(type in steps) {
//            for(i in steps[type]) {
//                step = new hbw.domain.step(type, steps[type][i]['content']);
//                if(typeof(steps[type][i]['example']) != 'undefined') {
//                    outline = new hbw.domain.outline(steps[type][i]['example']);
//                    step.outline = outline;
//                }
//                this.addStep(step);
//            }
//        }
//
//        outline = new hbw.domain.outline(example);
//        this.outline = outline;
        return this;
    }

    /**
     * Push/insert scenario in this feature
     *
     * @param hbw.domain.scenario
     * @return hbw.domain.feature
     */
    this.addScenario = function(scenario, position) {
        position = position || this.scenarios.length;
        if(typeof(this.scenarios[position]) != 'undefined') {
            //
            // Moves other steps to insert the newest
            var i;
            for(i = this.scenarios.length - 1; i >= position; i--) {
                this.scenarios[i + 1] = this.scenarios[i];
            }
        }
        this.scenarios[position] = scenario;
        return this;
    }


    /**
     * Call the rendering
     *
     * @return hbw.domain.scenario
     */
    this.render= function() {
        return this.toString();
    }



    this.getDescription = function() {
        
    }



}
