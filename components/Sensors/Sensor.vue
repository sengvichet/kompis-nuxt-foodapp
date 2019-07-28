<template>
<b-container>


  <div id="sensorChart" style="width: 100%; height: 500px; background:#fff; margin-bottom:200px"></div>


</b-container>
</template>

<script>
//import 'amcharts3'
//import 'amcharts3/amcharts/serial'

var chart

export default {


  props: {

    sensorId: {
      type: String,
      required: true
    },

    duration: {
      type: String,
      required: true
    },
    sensorDataId: {
      type: String,
      required: true
    },
    deviceType: {
      type: String,
      required: true
    },
    deviceName: {
      type: String,
      required: true
    },
    sensorData: {
      type: Array,
      require: false
    }
  },

  mounted() {
    chart = window.AmCharts.makeChart("sensorChart", {
      "path": "/amcharts",
      "type": "serial",
      "titles": [{
        "text": this.deviceName + this.$t('app.sensors.historical_temp')
    }],
      "theme": "light",
      "marginRight": 0,
      "padding": 0,
      "dataProvider": this.sensorData,
      "balloon": {
        "cornerRadius": 6,
        "horizontalPadding": 15,
        "verticalPadding": 10
      },
      "valueAxes": [{
        "logarithmic": false,

        "dashLength": 1,
        "guides": [{
            "dashLength": 6,
            "inside": true,
            "label": "Hot",
            "lineAlpha": 1,
            "value": 4
          },
          {
            "dashLength": 6,
            "inside": true,
            "label": "Cold",
            "lineAlpha": 1,
            "value": 0
          }
        ],
        "position": "left"
      }],
      "graphs": [{
        "id": "g1",
        "valueAxis": "v2",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 8,
        "hideBulletsCount": 50,
        "fillColorsField": "lineColor",
        "fillAlphas": 0.8,
        "lineThickness": 3,
        "lineColorField": "lineColor",
        "type": "smoothedLine",
        "title": "Temperature",
        "useLineColorForBulletBorder": true,
        "valueField": "pointValue",
        "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]&#186;</b>"

      }],
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis": true,
        "offset": 50,
        "scrollbarHeight": 50,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.2,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color": "#AAAAAA"
      },
      "chartCursor": {
        "enabled": true,
        "categoryBalloonDateFormat": "YYYY MMM DD JJ:NN:SS A"
      },

      "categoryField": "pointTime",
      "categoryAxis": {
        "minPeriod": "mm",
        "parseDates": true,
        "equalSpacing": true
      },
      "export": {
        "enabled": false
      },
      "responsive": {
        "enabled": false
    }
    })
  },
}
</script>
