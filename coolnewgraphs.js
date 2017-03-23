var vlSpecaaa = {
  "data": {"url": "data/blight_train_out_frfr.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "type": "quantitative",
      "bin": {"maxbins": 25},
      "field": "Distance to Middle-Tier School",
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

var embedSpec7 = {
  mode: "vega-lite",
  spec: vlSpecaaa,
  actions: false
};

vg.embed("#vis7", embedSpec7, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});

var vlSpecbbb = {
  "data": {"url": "data/blight_train_out_frfr.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "type": "quantitative",
      "field": "Distance to Library",
      "bin": {"maxbins": 25},
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

var embedSpec8 = {
  mode: "vega-lite",
  spec: vlSpecbbb,
  actions: false
};

vg.embed("#vis8", embedSpec8, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});

var vlSpecccc = {
  "data": {"url": "data/blight_train_out_frfr.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "type": "quantitative",
      "bin": {"maxbins": 25},
      "field": "Distance to Police Station",
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

var embedSpec9 = {
  mode: "vega-lite",
  spec: vlSpecccc,
  actions: false
};

vg.embed("#vis9", embedSpec9, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});

var vlSpecddd = {
  "data": {"url": "data/blight_train_out_frfr.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "type": "quantitative",
      "bin": {"maxbins": 40},
      "field": "Sqrt of Businesses Within Quarter Mile",
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

/*
var opt = {
  "actions": false
}*/

var embedSpec10 = {
  mode: "vega-lite",
  spec: vlSpecddd,
  actions: false
};

vg.embed("#vis10", embedSpec10, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});

var vlSpeceee = {
  "data": {"url": "data/blight_train_out_frfr.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "type": "quantitative",
      "bin": {"maxbins": 25},
      "field": "Crimes Within Quarter Mile",
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

var embedSpec11 = {
  mode: "vega-lite",
  spec: vlSpeceee,
  actions: false
};

vg.embed("#vis3", embedSpec11, function(error, result) {
  // Callback receiving the View instance and parsed Vega spec
  // result.view is the View, which resides under the '#vis' element
});
