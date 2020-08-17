"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.format = void 0;

var _StandardSqlFormatter = _interopRequireDefault(require("./languages/StandardSqlFormatter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var format = function format(query) {
  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (cfg.language) {
    default:
      return new _StandardSqlFormatter["default"](cfg).format(query);
  }
};

exports.format = format;
var _default = {
  format: format
};
exports["default"] = _default;