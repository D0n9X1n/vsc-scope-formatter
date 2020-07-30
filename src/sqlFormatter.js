"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.format = void 0;

var _Db2Formatter = _interopRequireDefault(require("./languages/Db2Formatter"));

var _N1qlFormatter = _interopRequireDefault(require("./languages/N1qlFormatter"));

var _PlSqlFormatter = _interopRequireDefault(require("./languages/PlSqlFormatter"));

var _StandardSqlFormatter = _interopRequireDefault(require("./languages/StandardSqlFormatter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var format = function format(query) {
  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (cfg.language) {
    case 'db2':
      return new _Db2Formatter["default"](cfg).format(query);

    case 'n1ql':
      return new _N1qlFormatter["default"](cfg).format(query);

    case 'pl/sql':
      return new _PlSqlFormatter["default"](cfg).format(query);

    case 'sql':
    case undefined:
      return new _StandardSqlFormatter["default"](cfg).format(query);

    default:
      throw Error("Unsupported SQL dialect: ".concat(cfg.language));
  }
};

exports.format = format;
var _default = {
  format: format
};
exports["default"] = _default;