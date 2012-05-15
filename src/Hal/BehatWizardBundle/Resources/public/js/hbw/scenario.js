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
hbw.scenario = function() {

    /**
     * Form informations
     *
     * @var object
     */
    this.form = {
        name: 'default'
    }

    //
    // Inheritance
    this.renderer = new hbw.scenario.renderer(this);
    this.datasource = new hbw.scenario.renderer(this);

    /**
     * To string conversion
     *
     * @return string
     */
    this.toString = function () {
        
    }

    /**
     * Constructor
     *
     * @param data
     * @return void
     */
    this.initialize = function(data) {
        var i;
        
        this
        .render()
        .addEvents();
        
        for(i in data['given']) {
            this.addStep('given', data['given'][i]);
        }
        for(i in data['when']) {
            this.addStep('when', data['when'][i]);
        }
        for(i in data['then']) {
            this.addStep('when', data['then'][i]);
        }
        for(i in data['example']) {
            this.addStep('example', data['example'][i]);
        }
    }

    /**
     * Call the rendering
     *
     * @return void
     */
    this.render= function() {
        this.renderer.render();
    }

    /**
     * Add any step
     *
     * @param step hbw.step
     * @return void
     */
    this.addStep = function(step) {
        this.datasource.addStep(step);
        this.renderer.addStep(step);
    }
}
