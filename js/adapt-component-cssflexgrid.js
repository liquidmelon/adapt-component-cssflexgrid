define(function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');


    var t; //this
    var data0;
    var data1;
    var data2;
    var data3;
    var collectionLoadCount;
    var PluginCollection;
    var AllPluginsView;
    var PC; //new PluginCollection
    var APV; //new AllPluginsView
    var CCI = "assets/checkcircle.svg"; //checkcircleIcon
    var GHI = "assets/github.svg"; //githubIcon
    var URL0; //components
    var URL1; //extensions
    var URL2; //themes/menus
    var URL3; //archived


    var CSSFLEXGRID = ComponentView.extend({

        events: {
            "click #cfg-components" : "swapContent",
            "click #cfg-extensions" : "swapContent",
            "click #cfg-themes" : "swapContent",
            "click #cfg-menus" : "swapContent"
        },

        preRender: function() {
            this.checkIfResetOnRevisit();
            //set reference to this
            t = this;
            //set labels
            t.model.set('myLabel1', "components");
            t.model.set('myLabel2', "extensions");
            t.model.set('myLabel3', "themes/menus");
            t.model.set('myLabel4', "archived");
            t.model.set('myLabel5', "name + details");
            t.model.set('myLabel6', "AT compatible");
            t.model.set('myLabel7', "works well");
            t.model.set('myLabel8', "repository");
            //get data
            if(t.model.get('theSource') === 'local'){
                URL0 = 'assets/data0.json'; //components
                URL1 = 'assets/data1.json'; //extensions
                URL2 = 'assets/data2.json'; //themes/menus
                URL3 = 'assets/data3.json'; //archived
            }
            else{
                URL0 = 'assets/GetGoogleDocData.php?feedNum=0'; //components
                URL1 = 'assets/GetGoogleDocData.php?feedNum=1'; //extensions
                URL2 = 'assets/GetGoogleDocData.php?feedNum=2'; //themes/menus
                URL3 = 'assets/GetGoogleDocData.php?feedNum=3'; //archived
            }
        },

        postRender: function() {
            this.setReadyStatus();

            this.setupInview();
        },

        setupInview: function() {
            var selector = this.getInviewElementSelector();

            if (!selector) {
                this.setCompletionStatus();
            } else {
                this.model.set('inviewElementSelector', selector);
                this.$(selector).on('inview', _.bind(this.inview, this));
            }

            //

            collectionLoadCount = 4;

            data0 = new Backbone.Collection;
            data0.url = URL0;
            data0.fetch({
                success: function(collection, response, options) {
                    console.log("fetch success");
                    data0 = response;
                    collectionLoadCount --;
                    t.allDataLoaded();
                },
                error: function (collection, response, options) {
                    console.log("fetch error");
                }
            });

            data1 = new Backbone.Collection;
            data1.url = URL1;
            data1.fetch({
                success: function(collection, response, options) {
                    console.log("fetch success");
                    data1 = response;
                    collectionLoadCount --;
                    t.allDataLoaded();
                },
                error: function (collection, response, options) {
                    console.log("fetch error");
                }
            });

            data2 = new Backbone.Collection;
            data2.url = URL2;
            data2.fetch({
                success: function(collection, response, options) {
                    console.log("fetch success");
                    data2 = response;
                    collectionLoadCount --;
                    t.allDataLoaded();
                },
                error: function (collection, response, options) {
                    console.log("fetch error");
                }
            });

            data3 = new Backbone.Collection;
            data3.url = URL3;
            data3.fetch({
                success: function(collection, response, options) {
                    console.log("fetch success");
                    data3 = response;
                    collectionLoadCount --;
                    t.allDataLoaded();
                },
                error: function (collection, response, options) {
                    console.log("fetch error");
                }
            });

            // Plugin Model
            var Plugin = Backbone.Model.extend({
                defaults: {
                    columnA: 'columnA',
                    columnB: 'columnB',
                    columnC: 'columnC',
                    columnD: 'columnD',
                    columnE: 'columnE',
                    columnF: 'columnF',
                    id: 0
                }
            });

            // A List of Plugins
            PluginCollection = Backbone.Collection.extend({
            	model: Plugin
            });

            // View for all All Plugins
            AllPluginsView = Backbone.View.extend({

                //remove the view
                destroy: function(){
                    this.unbind();
                    this.remove();
                },

                render: function() {

                    this.collection.each(function(plugin) {

                        var isYes = plugin.get("columnD");

                        if(isYes && isYes.toString) {
                            isYes = isYes.toString();
                            isYes = isYes.toLowerCase();
                            isYes = isYes.substring(0,1);
                        }
                        if(isYes != "y"){
                            //if not yes, set to nothing to prevent checkmark
                            plugin.set("columnD", "");
                        }

                        isYes = plugin.get("columnE");

                        if(isYes && isYes.toString) {
                            isYes = isYes.toString();
                            isYes = isYes.toLowerCase();
                            isYes = isYes.substring(0,1);
                        }
                        if(isYes != "y"){
                            //if not yes, set to nothing to prevent checkmark
                            plugin.set("columnE", "");
                        }

                        //set icons
                        plugin.set('checkcircleIcon', CCI);
                        plugin.set('githubIcon', GHI);

                        //make one view, and add to this view
                        var OPV = new OnePluginView({ model: plugin });
                        this.$el.append(OPV.render().el);

                    }, this);

                    //add style this view
                    this.$el.addClass('cfg-grid-container');

                    return this;

                }

            });

            // View for One Plugin
            var OnePluginView = Backbone.View.extend({

                render: function() {
                    var data = this.model.toJSON();
                    var template = Handlebars.templates["cssflexgrid-thePlugin"];
                    this.$el.html(template(data));
                    return this;
                }

            });

        },

        allDataLoaded: function(event) {
            if(collectionLoadCount == 0){
                //add style to first button
                $('#cfg-components').addClass('visited');
                //
                PC = new PluginCollection(data0);
                APV = new AllPluginsView({ collection: PC });
                $('.cssflexgrid-inner').append(APV.render().el);
            }
        },

        swapContent: function(event) {
            if (event) event.preventDefault();

            APV.destroy();

            $('#cfg-components').removeClass('visited');
            $('#cfg-extensions').removeClass('visited');
            $('#cfg-themes').removeClass('visited');
            $('#cfg-menus').removeClass('visited');

            if(event.currentTarget.id == "cfg-components"){
                $('#cfg-components').addClass('visited');
                PC.reset(data0);
            }
            else if(event.currentTarget.id == "cfg-extensions"){
                $('#cfg-extensions').addClass('visited');
                PC.reset(data1);
            }
            else if(event.currentTarget.id == "cfg-themes"){
                $('#cfg-themes').addClass('visited');
                PC.reset(data2);
            }
            else if(event.currentTarget.id == "cfg-menus"){
                $('#cfg-menus').addClass('visited');
                PC.reset(data3);
            }

            APV = new AllPluginsView({ collection: PC });
            $( '.cssflexgrid-inner' ).append(APV.render().el);
        },

        /**
         * determines which element should be used for inview logic - body, instruction or title - and returns the selector for that element
         */
        getInviewElementSelector: function() {
            if(this.model.get('body')) return '.component-body';

            if(this.model.get('instruction')) return '.component-instruction';

            if(this.model.get('displayTitle')) return '.component-title';

            return null;
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$(this.model.get('inviewElementSelector')).off('inview');
                    this.setCompletionStatus();
                }
            }
        },

        remove: function() {
            if(this.model.has('inviewElementSelector')) {
                this.$(this.model.get('inviewElementSelector')).off('inview');
            }

            ComponentView.prototype.remove.call(this);
        }
    },
    {
        template: 'cssflexgrid'
    });

    Adapt.register('cssflexgrid', CSSFLEXGRID);

    return CSSFLEXGRID;
});
