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
hbw.outline = function(content) {

    /**
     * Outline content
     */
    this.content = content || [];

    /**
     * Push row in the node
     *
     * @param data
     * @throws hbw.exception
     */
    this.push = function(data) {
        if(typeof(data) != 'object') {
            throw new hbw.exception("Incorrect example given, object was expected");
        }

        if(this.content.length > 0) {

            if(data.length !== this.content.lenght) {
                throw new hbw.exception("Incorrect example given");
            }

            var key;
            for(key in this.content) {
                if(!$.inArray(key, data)) {
                    throw new hbw.exception("Given example must have same columns of the current outline node");
                }
            }
        }

        this.content.push(data);
    };

    /**
     * Convert step to string
     *
     * @return string
     */
    this.toString = function() {
        var i, j, content = '';
        for(i in this.content) {
            content += (content.length > 0 ? "\n" : '');

            for(j in this.content[i]) {
                content += '| ' + this.content[i][j] + ' ';
            }

            content += '|';
        }
        return content;
    };
    
    /**
     * Convert step to form element
     *
     * @param scenario
     * @param step
     * @param position
     * @return string
     */
    this.toForm = function(scenario, step, position) {

        var html = '',  key, i;

        html = ''
        +'<div class="control-group">'
        +'    <table style="width:auto" class="table table-condensed controls">'
        +'        <thead>'
        +'            <tr';

        for(key in this.content[0]) {
            html += '<th>' + key + '</th>';
        }

        html += '</tr>'
        + '        </thead>'
        + '        <tbody>';

        for(key in this.content) {
            html += this.getFormRow(this.content, scenario, step, position);
        }

        html += '        </body>'
        + '    </table>'
        + '</div>';

        return html;
    };

    /**
     * Get the form for editing one example
     *
     * @param row
     * @param scenario
     * @param step
     * @param position
     * @return string
     */
    this.getFormRow = function(row, scenario, step, position) {
        if(null === row) {
            row = {
                'foo':'bar'
            };
        }
        var i, html = '<tr>';
        for(i in row) {
            html += '<td>'
            + '<input type="text" name="'+this.getFormName(scenario, step, position)+'" placeholder="..." value="'+row[i]+'" class="input-small">'
            + '</td>';
        }

        html += '</tr>';
        return html;
    };

   
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
    };
};