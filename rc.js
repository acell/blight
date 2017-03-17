var vlSpecz = {
  "data": {"url": "data/blight_train_out.csv"},
  "mark": "point",
  "encoding": {
    "x": {
      "type": "quantitative",
      "field": "Distance to Rec Center",
      "axis": {
        "tickLabelFont": "Inconsolata",
        "titleFont": "Inconsolata"
      }
    },
    "y": {
      "field": "fine_amount",
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
  }
};

var embedSpec2 = {
  mode: "vega-lite",
  spec: vlSpecz
};

vg.embed("#vis2", embedSpec2, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});

