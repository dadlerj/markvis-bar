'use strict';

/**
 * @fileOverview Generate bar chart for markvis
 * @name index.js<src>
 * @author GeekPlux
 * @license MIT
 */
var _require = require('./utils'),
    addStyle = _require.addStyle;

function bar() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      data = _ref.data,
      d3 = _ref.d3,
      D3Node = _ref.d3node,
      _ref$selector = _ref.selector,
      _selector = _ref$selector === undefined ? '#chart' : _ref$selector,
      _ref$container = _ref.container,
      _container = _ref$container === undefined ? '\n    <div id="container">\n      <h2>Bar Chart</h2>\n      <div id="chart"></div>\n    </div>\n  ' : _ref$container,
      _ref$style = _ref.style,
      _style = _ref$style === undefined ? '' : _ref$style,
      _ref$width = _ref.width,
      _width = _ref$width === undefined ? 960 : _ref$width,
      _ref$height = _ref.height,
      _height = _ref$height === undefined ? 500 : _ref$height,
      _ref$margin = _ref.margin,
      _margin = _ref$margin === undefined ? { top: 20, right: 20, bottom: 20, left: 20 } : _ref$margin,
      _ref$barColor = _ref.barColor,
      _barColor = _ref$barColor === undefined ? 'steelblue' : _ref$barColor,
      _ref$barHoverColor = _ref.barHoverColor,
      _barHoverColor = _ref$barHoverColor === undefined ? 'brown' : _ref$barHoverColor,
      _ref$export = _ref.export,
      _export = _ref$export === undefined ? false : _ref$export;

  var _svgStyles = '\n    .bar { fill: ' + _barColor + '; }\n    .bar:hover { fill: ' + _barHoverColor + '; }\n  ' + _style;

  var _d3 = void 0;
  var d3n = void 0;
  var svg = void 0;
  var _div = void 0;

  var isNodeEnv = function isNodeEnv() {
    return D3Node;
  };

  if (isNodeEnv) {
    d3n = new D3Node({
      selector: _selector,
      styles: _svgStyles,
      container: _container
    });
    _d3 = d3n.d3;
    svg = d3n.createSVG();
  } else {
    _div = document.createElement('div');
    _div.innerHTML = _container;
    _d3 = d3;
    svg = _d3.select(_div).select('#chart').append('svg');
    addStyle(_svgStyles);
  }

  var width = _width - _margin.left - _margin.right;
  var height = _height - _margin.top - _margin.bottom;

  var g = svg.attr('width', _width).attr('height', _height).append('g').attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')');

  var x = _d3.scaleBand().range([0, width]).padding(0.1);

  var y = _d3.scaleLinear().range([height, 0]);

  x.domain(data.map(function (d) {
    return d.key;
  }));
  y.domain([0, _d3.max(data, function (d) {
    return d.value;
  })]);

  g.selectAll('.bar').data(data).enter().append('rect').attr('class', 'bar').attr('x', function (d) {
    return x(d.key);
  }).attr('width', x.bandwidth()).attr('y', function (d) {
    return y(d.value);
  }).attr('height', function (d) {
    return height - y(d.value);
  });

  g.append('g').attr('transform', 'translate(0,' + height + ')').call(_d3.axisBottom(x));

  g.append('g').call(_d3.axisLeft(y));

  var result = void 0;
  if (isNodeEnv) {
    if (_export) result = d3n;else result = d3n.chartHTML();
  } else result = _div.querySelector('#container').innerHTML;

  return result;
}

module.exports = bar;