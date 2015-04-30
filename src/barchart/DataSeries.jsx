'use strict';

var React = require('react');
var d3 = require('d3');
var Bar = require('./Bar');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    value: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    availableHeight: React.PropTypes.number,
    fill: React.PropTypes.string,
    seriesName: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      fill: "#3182bd",
      seriesName: ''
    };
  },

  render() {

    var props = this.props;

    return (
      <Bar
        width={props.width}
        height={props.height}
        x={props.x}
        y={props.y}
        availableHeight={props.height}
        fill={props.fill}
      />
    );
  }
});
