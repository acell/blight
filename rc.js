var vlSpecz = {
  "data": {"url": "data/blight_train_out_frfr.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "type": "quantitative",
      "bin": {"maxbins": 25},
      "field": "Distance to Rec Center",
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
      "field": "Compliance Category",
      "axis": {
        "tickLabelFont": "Inconsolata",
        "titleFont": "Inconsolata"
      }
    },
    "color": {"value": "#4693e0"}
  },
  "config": {
    "mark": {"filled": true}
  }
};

var embedSpec2 = {
  mode: "vega-lite",
  spec: vlSpecz,
  actions: false
};

vg.embed("#vis2", embedSpec2, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});

