'use strict';

var React = require('react');

module.exports = React.createClass({

  propTypes: {
    fill: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      className: 'rd3-barchart-bar'
    };
  },

  render() {
    var props = this.props;

    return (
      <rect
        fill={props.fill}
        width={props.width}
        height={Math.abs(props.height)}
        x={props.x}
        y={props.y}
        className={props.className}
      />
    );
  }
});
