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
hbw.domain.outline = function(datas) {

    datas = datas || [];

    /**
     * Outline content
     */
    this.rows = [];

    /**
     * Push row in the node
     *
     * @param data
     * @throws hbw.domain.exception
     */
    this.push = function(data) {
        if(typeof(data) != 'object') {
            throw new hbw.domain.exception("Incorrect example given, object was expected");
        }
        
        if(this.rows.length > 0) {
            if(data.length != this.rows[0].length) {
            //                throw new hbw.domain.exception("Incorrect example given");
            }
        }

        this.rows.push(data);
    };

    /**
     * Constructor
     *
     * @param datas
     * @return hbw.domain.outline
     */
    this.initialize = function(datas) {
        var i;
        for(i in datas) {
            this.push(datas[i]);
        }
        return this;
    }

    /**
     * Convert step to string
     *
     * @return string
     */
    this.asString = function() {
        var i, j, content = '';
        for(i in this.rows) {

            if(this.rows[i].length > 0) {

                content += '\n      ';
                for(j in this.rows[i]) {
                    content += '| ' + this.rows[i][j] + ' ';
                }
                content += '|';
                
            }
        }
        return content;
    };

    this.initialize(datas);
};