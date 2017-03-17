var vlSpeca = {
  "data": {"url": "data/blight_train_out.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "bin": {"maxbins": 25},
      "type": "ordinal",
      "field": "float_dist_to_police_station",
      "axis": {
        "tickLabelFont": "Inconsolata",
        "titleFont": "Inconsolata"
      }
    },
    "y": {
      "aggregate": "count",
      "field": "*",
      "type": "quantitative",
      "axis": {
        "tickLabelFont": "Inconsolata",
        "titleFont": "Inconsolata"
      }
    },
    "column": {
      "type": "ordinal",
      "field": "compliance_det",
      "axis": {
        "tickLabelFont": "Inconsolata",
        "titleFont": "Inconsolata"
      }
    },
    "color": {"value": "#4693e0"}
  }
};

var embedSpec3 = {
  mode: "vega-lite",
  spec: vlSpeca
};

vg.embed("#vis", embedSpec3, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});
