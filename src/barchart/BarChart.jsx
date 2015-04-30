'use strict';

var React = require('react');
var d3 = require('d3');
var DataSeries = require('./DataSeries');
var common = require('../common');
var Chart = common.Chart;
var XAxis = common.XAxis;
var YAxis = common.YAxis;
var mixins = require('../mixins');
var CartesianChartPropsMixin = mixins.CartesianChartPropsMixin;

module.exports = React.createClass({

  mixins: [ CartesianChartPropsMixin ],

  displayName: 'BarChart',

  propTypes: {
    margins: React.PropTypes.object,
    fill: React.PropTypes.string,
    multiColor: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      yAxisTickCount: 4,
      margins: {top: 10, right: 20, bottom: 40, left: 45},
      padding: 0.1,
      fill: "#3182bd",
      multiColor: false
    };
  },

  render() {

    var props = this.props;

    var values = [];
    var labels = [];

    props.data.forEach( (item) => {
      values.push(item.value);
      labels.push(item.label);
    });

    var margins = props.margins;

    var sideMargins = margins.left + margins.right;
    var topBottomMargins = margins.top + margins.bottom;

    var minValue = Math.min(d3.min(values), 0);

    var yScale = d3.scale.linear()
      .domain([minValue, d3.max(values)])
      .range([props.height - topBottomMargins, 0]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(values.length))
      .rangeRoundBands([0, props.width - sideMargins], props.padding);

    var xAxisXScale = d3.scale.ordinal()
        .domain(labels)
        .rangeRoundBands([0, props.width - sideMargins], props.padding);

    var trans = `translate(${ margins.left },${ margins.top })`;

    var colors = (d, idx) => { return (props.multiColor ? props.colors(props.colorAccessor(d, idx)) : props.fill); };

    var dataSeriesArray = props.data.map( (bar, idx) => {
      return (
        <DataSeries
          key={idx}
          value={bar.value}
          seriesName={bar.label}
          width={xScale.rangeBand()}
          height={yScale(0) - yScale(bar.value)}
          availableHeight={props.height - topBottomMargins}
          fill={colors(bar, idx)}
        />
      );
    })

    return (
      <Chart width={props.width} height={props.height} title={props.title}>
        <g transform={trans} className='rd3-barchart'>
          <g>
            {dataSeriesArray}
          </g>
          <YAxis
            yAxisClassName='rd3-barchart-yaxis'
            yAxisTickValues={props.yAxisTickValues}
            yAxisLabel={props.yAxisLabel}
            yAxisLabelOffset={props.yAxisLabelOffset}
            yScale={yScale}
            margins={margins}
            yAxisTickCount={props.yAxisTickCount}
            tickFormatting={props.yAxisFormatter}
            width={props.width - sideMargins}
            height={props.height - topBottomMargins}
          />
          <XAxis
            xAxisClassName='rd3-barchart-xaxis'
            xAxisTickValues={props.xAxisTickValues}
            xAxisLabel={props.xAxisLabel}
            xAxisLabelOffset={props.xAxisLabelOffset}
            xScale={xAxisXScale}
            data={props.data}
            margins={margins}
            tickFormatting={props.xAxisFormatter}
            width={props.width - sideMargins}
            height={props.height - topBottomMargins}
          />
        </g>
      </Chart>
    );
  }

});
