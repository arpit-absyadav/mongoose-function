
module.exports = exports = function (mongoose) {
  function MongooseFunction () {
    var arg = arguments[0];
    var type = typeof arg;
    var fn;

    if ('string' == type && /^function\s*[^\(]*\(/.test(arg)) {
      // convert from stored fn
      fn = toFunction(arg);
    } else if ('function' == type) {
      fn = arg;
    } else {
      fn = Function.apply(undefined, arguments);
    }

    // compatibility with mongoose save
    fn.valueOf = fn.toString;

    return fn;
  }

  return mongoose.Types.Function = MongooseFunction;
}

// avoid v8 deopt
function toFunction (arg) {
  'use strict';
  return eval('(' + arg + ')');
}