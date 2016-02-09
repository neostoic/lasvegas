/**
 * The app.
 */

/* global map, google */

var ko = require('knockout');

'use strict';

var datas = require('./datas');
var Places = require('./places');
var Infos = require('./infos');

function App () {
    var self = this;

    self.places = new Places(datas.places);

    // Watch for change of the search input and send the value to self.places
    self.search = ko.observable('');
    self.search.subscribe(self.places.filter);

    self.infos = new Infos(datas.apis);

    self.onMapLoaded = function () {
        // Create the map
        window.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 36.175094, lng: -115.156304},
            zoom: 11
        });

        // Tell self.places that the map is here
        self.places.onMapLoaded();

        // Watch event 'modal open' and send the place id to self.infos
        $('#modal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var place_id = parseInt(button.data('place')); // The place id found in the data attribute
            self.infos.onOpen(self.places.places()[place_id]);
        });
    }
}

module.exports = function () {
    var app = new App();
    ko.applyBindings(app);

    return app;
};