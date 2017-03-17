/* var vlSpecsss = {
  "data": {"url": "data/blight_train_out.csv"},
  "mark": "point",
  "encoding": {
    "x": {
      "type": "quantitative",
      "field": "Bus Stops Within .25 Miles",
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

var embedSpec4 = {
  mode: "vega-lite",
  spec: vlSpecsss
};

vg.embed("#vis3", embedSpec4, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
}); */

var vlSpeca1 = {
  "data": {"url": "data/blight_train_out.csv"},
  "mark": "point",
  "encoding": {
    "x": {
      "type": "quantitative",
      "field": "Bus Stops Within Quarter Mile",
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

var embedSpec5 = {
  mode: "vega-lite",
  spec: vlSpeca1
};


vg.embed("#vis3", embedSpec5, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});

