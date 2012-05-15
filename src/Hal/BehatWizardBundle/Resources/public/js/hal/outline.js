/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Outline element (example, node)
 *
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
hal.outline = function() {

    /**
     * Outline content
     */
    this.content = [];

    /**
     * Convert step to string
     *
     * @return string
     */
    this.toString = function() {
        var i, content = '';
        for(i in this.content) {
            content += (content.length > 0 ? "\n" : '')
            + '| '
            + this.outlineContent[i].join(' | ')
            + ' |';
        }
        return content;
    }
    
    /**
     * Convert step to form element
     *
     * @param scenario
     * @param step
     * @param position
     */
    this.toForm = function(scenario, step, position) {
        var html = '',  key, i;

        html = ''
        +'<div class="control-group">'
        +'    <table style="width:auto" class="table table-condensed controls">'
        +'        <thead>'
        +'            <tr';

        for(key in this.content) {
            html += '<th>' + key + '</th>';
        }

        html += '</tr>'
        + '        </thead>'
        + '        <tbody>';

        for(key in this.content) {
            html += '<tr>';

            for(i in this.content[key]) {
                html += '<td>'
                + '<input type="text" name="'+this.getFormName(scenario, step, position)+'" placeholder="..." value="'+this.content[key][i]+'" class="input-small">'
                + '</td>';
            }

            html += '</tr>';
        }

        html += '        </body>'
    + '    </table>'
    + '</div>';
    }

    /**
     * Get adapted form name
     * In one case we work on example outline node, in another case we work on example
     *
     * @param scenario
     * @param step
     * @param position
     */
    this.getFormName = function(scenario, step, position) {
        if(null === step) {
            return scenario.form.name + '[example]';
        } else {
            return scenario.form.name+'[step]['+step.type+']['+position+'][outline]';
        }
    }
}
