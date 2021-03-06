var vlSpeca = {
  "data": {"url": "data/blight_train_out_frfr.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "type": "ordinal",
      "field": "Closest School",
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

var embedSpec3 = {
  mode: "vega-lite",
  spec: vlSpeca,
  actions: false
};


vg.embed("#vis4", embedSpec3, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});
