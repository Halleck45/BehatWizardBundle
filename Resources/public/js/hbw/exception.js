/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Exception
 *
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
hbw.exception = function(message, url, line) {
    throw message;
}
window.onerror = function (message, url, line) {
    new hbw.exception(message, url, line);
}