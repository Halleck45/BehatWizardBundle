/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Step
 *
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
hal.step = function(type) {
    /**
     * Type : given,when,then
     */
    this.type = type;

    /**
     * Step's description
     */
    this.content;

    /**
     * Outline content (with following : "")
     */
    this.outline = new hal.outline;

    /**
     * Convert step to string
     *
     * @return string
     */
    this.toString = function() {
        return this.content + "\n" + this.outline.toString();
    }
    
    /**
     * Convert step to form element
     *
     * @param scenario
     * @param position
     */
    this.toForm = function(scenario, position) {
        return ''
        +'<div class="control-group">'
        +'    <label class="control-label" for="input01">'+this.type+'</label>'
        +'    <div class="controls">'
        +'        <input type="text" name="'+scenario.form.name+'[step]['+this.type+']['+position+'][content]" class="input-xlarge input-step input-step-'+this.type+'"  name="feature-title" placeholder="..." value="'+this.content+'" />'
        +'    </div>'
        +'</div>'
        + this.outline.toForm(scenario, position);
    }
}
