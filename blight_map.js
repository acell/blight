var smtr_data;
var legend;

$.getJSON("blight_frfr.geojson", function(data) {
    smtr_data = data;

    function getColor(d) {
        return d == "non-compliant by no payment" ?  '#df2125':
               d == "non-compliant by late payment more than 1 month" ? '#df7c21':
               d == "not responsible by pending judgment disposition" ? '#21b4df':
               d == "compliant by late payment within 1 month" ? '#21dfcb':
               d == "compliant by early payment" ? '#21df7c':
               d == "compliant by payment with no scheduled hearing" ? '#21df7c':
               d == "compliant by payment on unknown date" ? '#21df7c':
               d == "compliant by on-time payment" ? '#21df7c':
               d == "not responsible by disposition" ? '#21b4df':
                          '#21b4df';
    }


    function style(feature) {
        return {
            radius: Math.sqrt(feature.properties.fine_amount/10),
            fillColor: getColor(feature.properties.compliance_detail),
            color: getColor(feature.properties.compliance_detail),
            weight: 1,
            opacity: .6,
            fillOpacity: 0.7
        };
    };

    L.geoJson(smtr_data, {
        style: style,

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {radius: 7, fillOpacity: .7});
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Ticket Issue Date: " + feature.properties.ticket_issued_date + "\n"
                + "Fine Amount: " + feature.properties.fine_amount + "\n"
                + "Compliance Detail: " + feature.properties.compliance_detail + "\n"
                + "Description: " + feature.properties.violation_description);
        }
    }).addTo(blight_map);

    legend = L.control({position: 'bottomright'});

    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend'),
                reasons_for_failure = [0],
                counts = []

        var total = 0;
        var reason_count = 0;
        var successes = 0;
        var dolla_counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (var search = 0; search < smtr_data["features"].length; search++) {
            var repeat = false;
            for (var reason = 0; reason < reasons_for_failure.length; reason++) {
                if (reasons_for_failure[reason] ==
                    smtr_data["features"][search]["properties"]["compliance_detail"]) {
                    repeat = true;
                    reason_count++;
                    if (is_in_bounds(
                        smtr_data["features"][search]["geometry"]["coordinates"])) {
                        counts[reason]++;
                        total++;
                        dolla_counts[reason] += Number(smtr_data["features"][search]["properties"]["fine_amount"]);
                    }
                }
            }
            if (repeat == false
                && is_in_bounds(smtr_data["features"][search]["geometry"]["coordinates"])) {
                reasons_for_failure.push(smtr_data["features"][search]["properties"]["compliance_detail"]);
                counts[reason] = 1;
                total++;
                reason_count++;
                dolla_counts[reason] += Number(smtr_data["features"][search]["properties"]["fine_amount"]);
            }
            else {
                if (repeat == false) {
                    reasons_for_failure.push(
                        smtr_data["features"][search]["properties"]["compliance_detail"]);
                    counts[reason] = 0;
                }
            }
        }


        reasons_for_failure = [0];

        for (var search = 0; search < smtr_data["features"].length; search++) {
            var repeat = false;
            for (var reason = 0; reason < reasons_for_failure.length; reason++) {
                if (reasons_for_failure[reason]
                    == smtr_data["features"][search]["properties"]["compliance_detail"]) {
                    repeat = true;
                }
            }
            if (!counts[reason]) {
                counts[reason] = 0;
            }
            if (repeat == false) {
               div.innerHTML +=
                        ('<i style="background: '
                        + getColor(smtr_data["features"][search]["properties"]["compliance_detail"])
                        + '"></i> ' + smtr_data["features"][search]["properties"]["compliance_detail"]
                        + ' count:' + counts[reason] + ' mean fine amount: $' + Math.round(dolla_counts[reason] / counts[reason]) + '<br>');
                    reasons_for_failure.push(smtr_data["features"][search]["properties"]["compliance_detail"]);
            }
        }

        return div;
    };

legend.addTo(blight_map);
});

/*
function postData(input) {
    $.ajax({
        type: "POST",
        url: "/csv_x.py",
        data: { param: input},
        success: callbackFunc
    });
}*/

function updateMap() {

    blight_map.removeControl(legend);

    blight_map.fitBounds([blight_map.getBounds().getSouthWest(), blight_map.getBounds().getNorthEast()]);

    //postData([blight_map.getBounds().getNorth(), blight_map.getBounds().getSouth(),
    //          blight_map.getBounds().getEast(), blight_map.getBounds().getWest()]);

    $.getJSON("blight_frfr.geojson", function(data) {
        smtr_data = data;

        function style(feature) {
            return {
                radius: Math.sqrt(feature.properties.fine_amount/10),
                fillColor: getColor(feature.properties.compliance_detail),
                color: getColor(feature.properties.compliance_detail),
                weight: 1,
                opacity: .6,
                fillOpacity: 0.7
            };
        };

        L.geoJson(smtr_data, {
            style: style,

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {radius: 7, fillOpacity: .7});
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("Ticket Issue Date: " + feature.properties.ticket_issued_date + "\n"
                    + "Fine Amount: " + feature.properties.fine_amount + "\n"
                    + "Compliance Detail: " + feature.properties.compliance_detail + "\n"
                    + "Description: " + feature.properties.violation_description);
            }
        }).addTo(blight_map);

        legend = L.control({position: 'bottomright'});

        function getColor(d) {
            return d == "non-compliant by no payment" ?  '#df2125':
                   d == "non-compliant by late payment more than 1 month" ? '#df7c21':
                   d == "not responsible by pending judgment disposition" ? '#21b4df':
                   d == "compliant by late payment within 1 month" ? '#21dfcb':
                   d == "compliant by early payment" ? '#21df7c':
                   d == "compliant by payment with no scheduled hearing" ? '#21df7c':
                   d == "compliant by payment on unknown date" ? '#21df7c':
                   d == "compliant by on-time payment" ? '#21df7c':
                   d == "not responsible by disposition" ? '#21b4df':
                              '#21b4df';
        }

        legend.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'info legend'),
                    reasons_for_failure = [0],
                    counts = []

            var total = 0;
            var reason_count = 0;
            var successes = 0;
            var dolla_counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            for (var search = 0; search < smtr_data["features"].length; search++) {
                var repeat = false;
                for (var reason = 0; reason < reasons_for_failure.length; reason++) {
                    if (reasons_for_failure[reason] ==
                        smtr_data["features"][search]["properties"]["compliance_detail"]) {
                        repeat = true;
                        reason_count++;
                        if (is_in_bounds(
                            smtr_data["features"][search]["geometry"]["coordinates"])) {
                            counts[reason]++;
                            total++;
                            dolla_counts[reason] += Number(smtr_data["features"][search]["properties"]["fine_amount"]);
                        }
                    }
                }
                if (repeat == false
                    && is_in_bounds(smtr_data["features"][search]["geometry"]["coordinates"])) {
                    reasons_for_failure.push(smtr_data["features"][search]["properties"]["compliance_detail"]);
                    counts[reason] = 1;
                    total++;
                    reason_count++;
                    dolla_counts[reason] += Number(smtr_data["features"][search]["properties"]["fine_amount"]);
                }
                else {
                    if (repeat == false) {
                        reasons_for_failure.push(
                            smtr_data["features"][search]["properties"]["compliance_detail"]);
                        counts[reason] = 0;
                    }
                }
            }


            reasons_for_failure = [0];

            for (var search = 0; search < smtr_data["features"].length; search++) {
                var repeat = false;
                for (var reason = 0; reason < reasons_for_failure.length; reason++) {
                    if (reasons_for_failure[reason]
                        == smtr_data["features"][search]["properties"]["compliance_detail"]) {
                        repeat = true;
                    }
                }
                if (!counts[reason]) {
                    counts[reason] = 0;
                }
                if (repeat == false) {
                    div.innerHTML +=
                        ('<i style="background: '
                        + getColor(smtr_data["features"][search]["properties"]["compliance_detail"])
                        + '"></i> ' + smtr_data["features"][search]["properties"]["compliance_detail"]
                        + ' count:' + counts[reason] + ' mean fine : $' + Math.round(dolla_counts[reason] / counts[reason]) + '<br>');
                    reasons_for_failure.push(smtr_data["features"][search]["properties"]["compliance_detail"]);
                }
            }

            return div;
            };

        legend.addTo(blight_map);
        });

        function style(feature) {
            return {
                radius: Math.sqrt(feature.properties.fine_amount/20),
                fillColor: getColor(feature.properties.compliance_detail),
                color: getColor(feature.properties.compliance_detail),
                weight: 1,
                opacity: .6,
                fillOpacity: 0.7
            };
        };

        L.geoJson(smtr_data, {
            style: style,

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {radius: 7, fillOpacity: .7});
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("Ticket Issue Date: " + feature.properties.ticket_issued_date + "\n"
                    + "Fine Amount: " + feature.properties.fine_amount + "\n"
                    + "Compliance Detail: " + feature.properties.compliance_detail + "\n"
                    + "Description: " + feature.properties.violation_description);
            }
        }).addTo(blight_map);
}

var blight_map = L.map('blight_map').setView([42.37, -83.05], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(blight_map);

function getColor(d) {
    return d == "non-compliant by no payment" ?  '#df2125':
           d == "non-compliant by late payment more than 1 month" ? '#df7c21':
           d == "not responsible by pending judgment disposition" ? '#21b4df':
           d == "compliant by late payment within 1 month" ? '#21dfcb':
           d == "compliant by early payment" ? '#21df7c':
           d == "compliant by payment with no scheduled hearing" ? '#21df7c':
           d == "compliant by payment on unknown date" ? '#21df7c':
           d == "compliant by on-time payment" ? '#21df7c':
           d == "not responsible by disposition" ? '#21b4df':
                      '#21b4df';
}

function is_in_bounds(point) {
    if (
        point[0] > blight_map.getBounds().getWest()
        && point[1] > blight_map.getBounds().getSouth()
        && point[0] < blight_map.getBounds().getEast()
        && point[1] < blight_map.getBounds().getNorth()) {
        return true;
    }
    else {
        return false;
    }
}

var info = L.control();

info.onAdd = function(blight_map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
}

info.update = function(props) {
    this._div.innerHTML = '<h3>Detroit Blight Compliance</h3> \n'
                          + '<h4>Color Denotes Compliance Status, Size '
                          + 'Denotes Fine Amount </h4> \n click on a point for '
                          + 'the violation description + ticket issue date';
}

info.addTo(blight_map);


/*
    var ind_count = 0;

    var total = 0;

    var search_count = 0;

    var successes = 0;

    for (var search = 0; search < search_geojson["features"].length; search++) {
        var repeat = false;
        for (var reason = 0; reason < reasons_for_failure.length; reason++) {
            if (reasons_for_failure[reason] ==
                search_geojson["features"][search]["properties"]["reason_for_failure"]) {
                repeat = true;
                search_count++;
                if (is_in_bounds(
                    search_geojson["features"][search]["geometry"]["coordinates"])) {
                    counts[reason]++;
                    total++;
                    if (reasons_for_failure[reason] == 'Successful Search') {
                      successes++;
                    }
                }
            }
        }
        if (repeat == false
            && is_in_bounds(search_geojson["features"][search]["geometry"]["coordinates"])) {
            reasons_for_failure.push(search_geojson["features"][search]["properties"]["reason_for_failure"]);
            counts[reason] = 1;
            total++;
            search_count++;
        }
        else {
            if (repeat == false) {
                reasons_for_failure.push(
                    search_geojson["features"][search]["properties"]["reason_for_failure"]);
                counts[reason] = 0;
            }
        }
    }

    reasons_for_failure = [0];

    div.innerHTML +=
      '% Success In This Geo: '
      + Math.round(successes / total * 100) + '</br>'
      + '% Of All Searches In This Geo: '
      + Math.round(total / search_count * 100) + '</br>';

    for (var search = 0; search < search_geojson["features"].length; search++) {
        var repeat = false;
        for (var reason = 0; reason < reasons_for_failure.length; reason++) {
            if (reasons_for_failure[reason]
                == search_geojson["features"][search]["properties"]["reason_for_failure"]) {
                repeat = true;
            }
        }
        if (!counts[reason]) {
            counts[reason] = 0;
        }
        if (repeat == false) {
            div.innerHTML +=
                '<i style="background: '
                + getColor(search_geojson["features"][search]["properties"]["marker_color"])
                + '"></i> ' + (search_geojson["features"][search]["properties"]["reason_for_failure"]
                + ' ' + counts[reason] + '<br>');
            reasons_for_failure.push(search_geojson["features"][search]["properties"]["reason_for_failure"]);
        }
    }
    return div;
};

function updateMap() {

    blight_map.removeControl(legend);

    blight_map.fitBounds([blight_map.getBounds().getSouthWest(), blight_map.getBounds().getNorthEast()])

    geojsonLayer = L.geoJson(search_geojson, {
        style: style,

        pointToLayer: function(feature, latlng) {
            return new L.CircleMarker(latlng, {radius: 10, fillOpacity: .5});
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                'Query: ' + feature.properties.search
                + '<br/>' + feature.properties.reason_for_failure
                + '<br/>' + 'Result Count: ' + feature.properties.result_count
                + '<br/>' + 'Date of Search: ' + feature.properties.time_of_search);
        }
    });

    search_map.addLayer(geojsonLayer);

    search_legend.addTo(search_map);
}
*/
