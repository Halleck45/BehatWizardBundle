hbw.ui.editing = {
    feature: null,
    selector: {
        box: {
            mainInfos        : '#box-edit-title',
            scenarios        : '#box-edit-scenario',
            examples         : '#examples',
            background       : '#box-edit-background',
            listScenarios    : '#feature-box-scenarios .scenarios',
            stepgiven        : '#box-steps-given',
            stepwhen         : '#box-steps-when',
            stepthen         : '#box-steps-then',
            formsave         : '#form-save'
        },
        input: {
            title           : '#title',
            inorder         : '#inorder',
            as              : '#as',
            should          : '#should',
            allcontent      : '#feature_content',
            stepAll         : '#box-models #step-given, #box-models #step-when, #box-models #step-then'
        },
        btn: {
            editMain        : '.btn-feature-edit',
            editScenario    : '.btn-scenario-edit',
            removeScenario  : '.btn-scenario-remove',
            editBackground  : '.btn-background-edit',
            addScenario     : '.btn-scenario-add',
            addOutlineRow   : '.btn-outline-add-row',
            addOutlineColumn: '.btn-outline-add-column',
            removeOutlineColumn: '.btn-outline-remove-column',
            removeOutlineRow: '.btn-outline-remove-row',
            removeStep      : '.btn-step-remove',
            addStep         : '.btn-step-add',
            addOutlineStep  : '.btn-step-outline-add',
            save            : '.btn-save'
        },
        models: {
            scenario        : '#box-models #scenario',
            outline         : '#box-models #outline-node',
            outlinecell     : '#box-models #outline-node-cell',
            outlinehead     : '#box-models #outline-node-head',
            outlinerowremove: '#box-models #outline-row-remove',
            stepgiven       : '#box-models #step-given',
            stepwhen        : '#box-models #step-when',
            stepthen        : '#box-models #step-then'
        }
    },

    callback : {
        out: {
            editMain            : function(){},
            editScenario        : function(){},
            addScenario         : function(){},
            editBackground      : function(){},
            updateScenarioDatas : function(){},
            editStep            : function(){}
        },
        enter: {
            editMain            : function(){},
            editScenario        : function(){},
            editbackground      : function(){},
            addScenario         : function(){}
        }
    },

    nextOutCallback: function(){},

    init: function(feature) {
        var self = hbw.ui.editing, i;
        self.feature = feature;

        //
        // Initialize datas
        $(self.selector.input.title).val(feature.title);
        $(self.selector.input.inorder).val(feature.inorder);
        $(self.selector.input.as).val(feature.as);
        $(self.selector.input.should).val(feature.should);
        $(self.selector.input.notes).val(feature.notes);
        for(i in feature.scenarios) {
            self.addScenario(feature.scenarios[i]);
        }

        //
        // Events
        self.events.applyAll();
        self.refreshVisualInfos();

        $(hbw.ui.editing.selector.btn.editMain).click();
    },

    stopEditingExcept: function($caller, $target) {

        //
        // Callback
        hbw.ui.editing.nextOutCallback();

        //
        // Display
        $('.box-editing.current').not('#' + $target.attr('id')).hide().removeClass('current');
    },
    
    stopEditing: function() {
        hbw.ui.editing.stopEditingExcept(null, $(hbw.ui.editing.selector.box.mainInfos));
        $(hbw.ui.editing.selector.box.mainInfos).fadeIn().addClass('current');
    },

    
    startEditing: function($caller, $target) {
        //
        // Out
        hbw.ui.editing.stopEditingExcept($caller, $target);

        //
        // Callback
        var callbackName = $caller.data('callback-enter');
        if(typeof(callbackName) != 'undefined') {
            hbw.ui.editing.callback.enter[callbackName]($caller, $target);
        }

        // Prepare next out
        var callbackName = $caller.data('callback-out');
        hbw.ui.editing.nextOutCallbackname = function() {};
        if(typeof(callbackName) != 'undefined') {
            hbw.ui.editing.nextOutCallback = function(callbackName, $caller, $target) {
                return function() {
                    hbw.ui.editing.callback.out[callbackName]($caller, $target);
                }
            }(callbackName, $caller, $target);
        }
        
        //
        // Display
        $target.fadeIn().addClass('current');
    },

    refreshVisualInfos: function() {
        var names = ['title','inorder','as','should'], i;
        var $el, $clone;
        for(i in names) {
            // find the clone
            $el = $(hbw.ui.editing.selector.input[names[i]]);

            $clone = $('.clone-' + names[i]);
            $clone.html($el.val());
        }
    },


    updateScenario: function(scenario, $target) {
        
        if(typeof(scenario) == 'undefined') {
            return;
        }
        
        //
        // Find element
        var $el;
        $('.scenario', $(hbw.ui.editing.selector.box.listScenarios)).each(function() {
            if(scenario.id === $(this).data('scenario').id && scenario.id != null)  {
                $el = $(this);
            }
        });
        if($el == null) {
            throw "Error : we cannot update the scenario object : DOM element was not found";
        }
        
        scenario = hbw.ui.editing.mapper.updateScenarioByView(scenario, $target);
        scenario.parent = hbw.ui.editing.feature;
        
        $el.data('scenario', scenario);
        $el.find('.btn-scenario-edit').data('scenario', scenario);
        $el.find('.scenario-title-text').text(scenario.title);
        
        $(hbw.ui.editing.selector.box.scenarios).find('.input-scenario-title').focus();
    },
    addScenario: function(scenario, $target) {
        
        if($target) {
            hbw.ui.editing.feature.addScenario(scenario);
            scenario = hbw.ui.editing.mapper.updateScenarioByView(scenario, $target);
            scenario.parent = hbw.ui.editing.feature;
        }
        
        //
        // Build a clone, copying a model
        var $model = $(hbw.ui.editing.selector.models.scenario);
        var $clone = $model.clone(true);
        $clone.find('.scenario-title-text').text(scenario.title);
        $('.btn-scenario-edit', $clone).data('scenario', scenario);
        $clone.data('scenario', scenario);
        $(hbw.ui.editing.selector.box.listScenarios).prepend($clone);
        
        //
        // Create default fields for step
        $(hbw.ui.editing.selector.box.scenarios).find('.btn-step-add').not('.btn-step-outline-add').click();
    },
    removeScenario: function(scenario) {
        
        if(scenario === null) {
            return;
        }
        
        $('#ui-side .scenario').each(function() {
            var $el = $(this);
            if($el.data('scenario').id === scenario.id) {
                $el.remove();
            }
        });
        
        hbw.ui.editing.startEditing(
            $(hbw.ui.editing.selector.btn.editMain)
            , $(hbw.ui.editing.selector.box.mainInfos)
            );
                
        hbw.ui.editing.feature.removeScenario(scenario);
    },
    
    populateScenarioView: function(scenario, $box) {

        //
        // Datas
        $box.data('scenario', scenario);
        $('.input-scenario-title', $box).val(scenario.title);

        //
        // Cleans old datas
        $(hbw.ui.editing.selector.box['stepgiven']).empty();
        $(hbw.ui.editing.selector.box['stepwhen']).empty();
        $(hbw.ui.editing.selector.box['stepthen']).empty();

        var i, step, type, $target, $model, $clone;
        for(i in scenario.steps) {
            step = scenario.steps[i];
            type = step.type.toLowerCase();
            $target = $(hbw.ui.editing.selector.box['step' + type]);

            //
            // Build a clone, copying a model
            $model = $(hbw.ui.editing.selector.models['step' + type]);
            $clone = $model.clone(true);
            $('.input-step-' + type, $clone).val(step.text);
            $target.append($clone);

            //
            // Outline nodes
            if(step.outline != null) {
                var $cont = $('<div></div>');
                $cont
                .data('step', step)
                .data('for', $clone)
                .data('outline', step.outline)
                .addClass('outline')
                .appendTo($target);
                hbw.ui.editing.populateOutlineView(step.outline, $cont);
            }
        }

        //
        // Example
        var $example = $(hbw.ui.editing.selector.box.examples);

        hbw.ui.editing.updateExample($example, false);
        if(scenario.examples !== null) {
            var example = scenario.examples; // outline element

            var row, dupRow, name, index, names = [], len = 0, heading, mapNames = [], map = [];

            $example.data('examples', example);

            heading = example.rows[0];

            // name mapping (order of columns is not neccessary the same)
            $('thead th', $example).not('.decorator').each(function(index) {
                names.push($(this).text());
                mapNames[index] = $(this).text();
            });
            for(i in heading) {
                map[i] =  mapNames.indexOf(heading[i]);
            }
            len = example.rows.length;
            for(i = 1; i < len; i++) {
                row = [];
                for(index in example.rows[i]) {
                    row[map[index]] = example.rows[i][index];
                }
                hbw.ui.editing.addOutlineRow($example, row);
            }
        }
        hbw.ui.editing.updateExample($example, true);

    },
    populatebackgroundView: function(background, $box) {
        
        //
        // Datas
        $box.data('background', background);

        //
        // Cleans old datas
        $(hbw.ui.editing.selector.box['stepgiven']).empty();
        $(hbw.ui.editing.selector.box['stepwhen']).empty();
        $(hbw.ui.editing.selector.box['stepthen']).empty();

        var i, step, type, $target, $model, $clone;
        for(i in background.steps) {
            step = background.steps[i];
            type = step.type.toLowerCase();
            $target = $(hbw.ui.editing.selector.box['step' + type]);

            //
            // Build a clone, copying a model
            $model = $(hbw.ui.editing.selector.models['step' + type]);
            $clone = $model.clone(true);
            $('.input-step-' + type, $clone).val(step.text);
            $target.append($clone);

            //
            // Outline nodes
            if(step.outline != null) {
                var $cont = $('<div></div>');
                $cont
                .data('step', step)
                .data('for', $clone)
                .data('outline', step.outline)
                .addClass('outline')
                .appendTo($target);
                hbw.ui.editing.populateOutlineView(step.outline, $cont);
            }
        }
    },

    populateOutlineView: function(outline, $box) {
        var $model, $clone, row,i, nbCols, isExample;

        //
        // Cleans old datas
        isExample = $box.is('.examples');
        $box.empty();

        //
        // Build a clone, copying a model
        $model = $(hbw.ui.editing.selector.models.outline);
        $clone = $model.clone(true);

        
        if(outline.rows.length == 0) {
            //
            // Empty outline
            hbw.ui.editing.addOutlineColumn($clone, '');
            hbw.ui.editing.addOutlineColumn($clone, '');
            hbw.ui.editing.addOutlineColumn($clone, '');
            hbw.ui.editing.addOutlineRow($clone, ['','','']);
        } else {
            //
            // Sizes
            nbCols = outline.rows[0].length;
            for(i in nbCols) {
                hbw.ui.editing.addOutlineColumn($clone, '');
            }

            //
            // Datas
            for(i in outline.rows) {
                hbw.ui.editing.addOutlineRow($clone, outline.rows[i]);
            }
        }

        $clone.data('outline', outline);

        if(isExample) {
            $clone.addClass('examples');
            $clone.find('table').addClass('examples');
        }
        $box.append($clone);
    },


    addOutlineColumn: function($table, defaultValue) {
        var $model, $modelHead,$clone, i, $tr;
        $model = $(hbw.ui.editing.selector.models.outlinecell);
        $modelHead = $(hbw.ui.editing.selector.models.outlinehead);
        $('tbody tr', $table).each(function() {
            $tr = $(this);
            $clone = $model.clone(true);
            $clone.find('.outline-content').val(defaultValue);
            $tr.append($clone);
        });
        $('thead tr', $table).each(function() {
            $tr = $(this);
            $clone = $modelHead.clone(true);
            $tr.append($clone);
        });
        hbw.ui.editing._updateOutlineDecorators($table);
    },
    
    removeOutlineColumn: function($table, index) {
        var $tr;
        $('tr', $table).each(function() {
            $tr = $(this);
            $('td:eq('+ index +')',$tr).remove();
        });
        hbw.ui.editing._updateOutlineDecorators($table);
    },
    
    addOutlineRow: function($table, row) {
        var $model, $modelHead, $clone, i, $tr;

        $model = $(hbw.ui.editing.selector.models.outlinecell);
        $tr = $('<tr class="outline-row"></tr>');

        if(row.length > 0) {
            for(i in row) {
                $clone = $model.clone(true);
                $clone.find('.outline-content').val(row[i]);
                $tr.append($clone);
            }
        } else {
            var nbCols;
            
            if($('tbody tr', $table).length > 0) {
                // existent rowset
                nbCols = $('tbody tr:first-child td', $table)
                .not('.decorator')
                .length;
            } else {
                // empty rowset
                nbCols = $('thead tr:first-child th', $table)
                .length - 1;
            }
            for(i = 0; i < nbCols; i++) {
                $clone = $model.clone(true);
                $tr.append($clone);
            }
        }
        $('tbody', $table).append($tr);
        hbw.ui.editing._updateOutlineDecorators($table);
    },

    removeOutlineRow: function($table, index) {
        $('tr:eq('+index+')', $table.find('tbody')).remove();
        hbw.ui.editing._updateOutlineDecorators($table);
    },
    

    updateExample: function($table, doDefaultRowset) {

        if(typeof(doDefaultRowset) == 'undefined') {
            doDefaultRowset = true;
        }

        //
        // Example
        var outline = $table.data('example');

        // search previous column names
        var mapNameIndex = {};
        $('thead th', $table).each(function(i) {
            mapNameIndex[$(this).text()] = i;
        });

        // looks for variables
        var names = [];
        var i;
        $('.step:text', hbw.ui.editing.selector.box.scenarios).each(function() {
            var text = $(this).val();
            var nameVars = text.match(/<(.*?)>/g);
            if(nameVars != null) {
                  for(i in nameVars) {
                      name = nameVars[i];
                      var name = name.substr(0, name.length-1);
                      var name = name.substr(1); 
                      if(-1 == $.inArray(name, names)) {
                            names.push(name);
                      }
                  }
            }
        });

        var i, name;
        for(i in names) {
            name = names[i];
            if(typeof(mapNameIndex[name]) != 'undefined') {
            //
            // Existent variables
            } else {
                //
                // New variable
                hbw.ui.editing.addOutlineColumn($table, '');
            }
        }
        //
        // Remove old columns
        for(i in mapNameIndex) {
            if(-1 == $.inArray(mapNameIndex[i], names)) {
                hbw.ui.editing.removeOutlineColumn($table, i);
            }
        }

        //
        // Create heading view
        $('thead th', $table).remove();
        $table.find('thead tr').append($('<th class="decorator"></th>'));
        var $th;
        for(i in names) {
            $th = $('<th>'+ names[i] +'</th>');
            $th.append($('<input type="hidden" class="outline-content" name="" value="'+ names[i] +'" />'));
            $th.data('name', name);
            $table.find('thead tr').append($th);
        }

        //
        // Default rows
        if(doDefaultRowset && names.length > 0 && $('tbody tr', $table).length == 0) {
            hbw.ui.editing.addOutlineRow($table, []);
            hbw.ui.editing.addOutlineRow($table, []);
        }
    },

    _updateOutlineDecorators: function($table) {
        var $model,$tr, i, nbCols;
        if($table.is('.examples')) {
        //            hbw.ui.editing.updateExample($table);
        } else {
            //
            // Simple outline node

            //
            // Btn remove a column
            $model = $(hbw.ui.editing.selector.models.outlinehead);
            $tr = $('thead tr', $table);
            $tr.empty();
            nbCols = $('tbody tr:first-child td', $table).length;
            $tr.append($('<td></td>'));
            for(i = 1; i < nbCols; i++) {
                $tr.append($model.clone(true));
            }
        }

        //
        // Btn remove a row
        $model = $(hbw.ui.editing.selector.models.outlinerowremove);
        $('tbody tr', $table).each(function() {
            var $tr = $(this);
            if($(hbw.ui.editing.selector.btn.removeOutlineRow, $tr).length == 0) {
                $tr.prepend($model.clone(true));
            }
        });
    },



    addStep: function($container, type, isOutline) {
        var $model = $(hbw.ui.editing.selector.models['step' + type]);
        var step = new hbw.domain.step;
        var $clone = $model.clone(true);
        $clone.data('step', step);
        $container.append($clone);

        if(isOutline) {

            step.outline = new hbw.domain.outline;
            step.outline.parent = step;

            var $cont = $('<div></div>');
            $cont
            .data('step', step)
            .data('for', $clone)
            .data('outline', step.outline)
            .addClass('outline')
            .appendTo($container);
            hbw.ui.editing.populateOutlineView(step.outline, $cont);
        }
        
        $(':text', $clone).focus();


    },
    
    
    removeStep: function($container) {
        if($container.next('.outline').length == 1) {
            $container.next('.outline').remove();
        }
        $container.remove();
    },


    saveFeature: function() {
        hbw.ui.editing.stopEditing();
        var string = hbw.ui.editing.feature.asString();
        $(hbw.ui.editing.selector.input.allcontent).val(string);
        $(hbw.ui.editing.selector.box.formsave).submit();
    }

};
