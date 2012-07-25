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
hbw.domain.feature = function(datas) {

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
     * Title
     *
     * @var string
     */

    this.title = datas.title || null; 
    /**
     * In Order
     *
     * @var string
     */
    this.inorder = datas.inorder.replace(/^(In order to\s*)/, '') ||  null; // @todo traduction
    /**
     * As a
     *
     * @var string
     */

    this.as = datas.as.replace(/^(As\s*)/, '') ||  null; // @todo traduction
    /**
     * I should
     *
     * @var string
     */
    this.should = datas.should.replace(/^(I should\s*)/, '') ||  null; // @todo traduction

    /**
     * Notes
     *
     * @var string
     */
    this.notes = datas.notes || null;


    /**
     * Constructor
     *
     * @param datas [ steps:[ {content:"", example: null}, ...], example: null ]
     * @return hbw.domain.scenario
     */
    this.initialize = function(datas) {
        var i, scenario, step;
        for(i in datas.scenarios) {
            scenario = new hbw.domain.scenario(datas.scenarios[i]);
            this.addScenario(scenario);
        }

        this.background = new hbw.domain.scenario(datas.background);
        this.background.parent = this;
        return this;
    }


    /**
     * To string conversion
     *
     * @return string
     */
    this.asString = function () {

        //
        // Human description
        var html = '';
        html = 'Feature: ' + this.title
        + '\n  In order to ' + this.inorder
        + '\n  As ' + this.as
        + '\n  I should ' + this.should;
        if(this.notes) {
            html += '\n\n  ' + this.notes
        }

        //
        // Background
        if(this.background) {
            html += '\n  ' + this.background.asString('Background');
        }

        //
        // Scenarios
        var i;
        for(i in this.scenarios) {
            html += this.scenarios[i].asString();
        }

        
        return html;
    }

    

    /**
     * Push/insert scenario in this feature
     *
     * @param hbw.domain.scenario
     * @return hbw.domain.feature
     */
    this.addScenario = function(scenario, position) {
        
        var i;
        for(i in this.scenarios) {
            if(this.scenarios[i].id === scenario.id) {
                return this;
            }
        }
        
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

        scenario.index = position;
        scenario.parent = this;

        return this;
    }
    
    /**
     * Remove the scenario
     *
     * @param hbw.domain.scenario
     * @return hbw.domain.feature
     */
    this.removeScenario = function(scenario) {
        var i;
        for(i in this.scenarios) {
            if(this.scenarios[i].id === scenario.id) {
                delete this.scenarios[i];
                return this;
            }
        }
        throw new hbw.domain.exception('Scenario cannot be removed : it was not found');
        return this;
    }


    /**
     * Call the rendering
     *
     * @return hbw.domain.scenario
     */
    this.render= function() {
        return this.asString();
    }



    this.getDescription = function() {
        
    }


    this.initialize(datas);
}
