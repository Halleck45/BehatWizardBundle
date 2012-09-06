/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Scenario
 *
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
hbw.domain.scenario = function(datas) {

    datas = datas || {};

    /**
     * Title
     * 
     * @Var string
     */
    this.title = null;

    /**
     * Steps of the scenario
     *
     * @var array
     */
    this.steps = [];

    /**
     * Example of the scenario
     *
     * @var hbw.domain.outline
     */
    this.examples = null;
    
    /**
     * Uniq id
     * 
     * @var integer
     */
    this.id = Math.floor(Math.random()* 1000000);

    /**
     * To string conversion
     *
     * @return string
     */
    this.asString = function (keyword) {
        var html = '', i;

        if(typeof(keyword) == 'undefined') {
            if(this.examples && this.examples.rows.length > 0) {
                keyword = 'Scenario Outline';
            } else {
                keyword = 'Scenario';
            }
        }

        //
        // Title
        html = '\n\n  '+keyword +': ' + this.title

        //
        // Steps
        for(i in this.steps) {
            html += this.steps[i].asString();
        }

        //
        // Example
        if(this.examples && this.examples.rows.length > 0 ) {
            html += '\n\n  Examples: ' + this.examples.asString();
        }

        return html;
    }

    /**
     * Constructor
     *
     * @param data [ steps:[ {content:"", example: null}, ...], example: null ]
     * @return hbw.domain.scenario
     */
    this.initialize = function(datas) {

        var i, step;

        this.title = datas.title || '';
        if(datas.isOutline) {
            this.examples = new hbw.domain.outline(datas.examples);
        }

        for(i in datas.steps) {
            step = new hbw.domain.step(datas.steps[i]);
            this.addStep(step);
        }
        return this;
    }

    /**
     * Push/insert step in the scenario
     *
     * @param step
     * @return hbw.domain.scenario
     */
    this.addStep = function(step, position) {
        position = position || this.steps.length;
        if(typeof(this.steps[position]) != 'undefined') {
            //
            // Moves other steps to insert the newest
            var i;
            for(i = this.steps.length - 1; i >= position; i--) {
                this.steps[i + 1] = this.steps[i];
            }
        }

        step.index = position;
        step.parent = this;

        this.steps[position] = step;
        return this;
    }


    /**
     * Call the rendering
     *
     * @return hbw.domain.scenario
     */
    this.render= function() {
        return this;
    }

    this.initialize(datas);
}
