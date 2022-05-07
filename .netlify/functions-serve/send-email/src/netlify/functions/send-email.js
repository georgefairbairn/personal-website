var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module2) {
    "use strict";
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module2) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return toString.call(val) === "[object FormData]";
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return toString.call(val) === "[object URLSearchParams]";
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module2.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module2) {
    "use strict";
    module2.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };
  }
});

// node_modules/axios/lib/defaults/transitional.js
var require_transitional = __commonJS({
  "node_modules/axios/lib/defaults/transitional.js"(exports, module2) {
    "use strict";
    module2.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module2) {
    "use strict";
    var enhanceError = require_enhanceError();
    module2.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module2) {
    "use strict";
    var createError = require_createError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module2) {
    "use strict";
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module2) {
    "use strict";
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module2) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module2) {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module2.exports = Cancel;
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    var transitionalDefaults = require_transitional();
    var Cancel = require_Cancel();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(() => {
    }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} [0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports, module2) {
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports, module2) {
    var url = require("url");
    var URL = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
    var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
    var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
    var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self = this;
      this._onNativeResponse = function(response) {
        self._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (typeof data === "function") {
        callback = data;
        data = encoding = null;
      } else if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self._timeout) {
          clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function() {
          self.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self._timeout) {
          clearTimeout(self._timeout);
          self._timeout = null;
        }
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        if (callback) {
          self.removeListener("timeout", callback);
        }
        if (!self.socket) {
          self._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.substr(0, protocol.length - 1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      this._currentUrl = url.format(this._options);
      request._redirectable = this;
      for (var e = 0; e < events.length; e++) {
        request.on(events[e], eventHandlers[events[e]]);
      }
      if (this._isRedirect) {
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self._currentRequest) {
            if (error) {
              self.emit("error", error);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
        return;
      }
      abortRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = url.parse(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl;
      try {
        redirectUrl = url.resolve(currentUrl, location);
      } catch (cause) {
        this.emit("error", new RedirectionError(cause));
        return;
      }
      debug("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);
      if (redirectUrlParts.protocol !== currentUrlParts.protocol && redirectUrlParts.protocol !== "https:" || redirectUrlParts.host !== currentHost && !isSubdomain(redirectUrlParts.host, currentHost)) {
        removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
      }
      if (typeof this._options.beforeRedirect === "function") {
        var responseDetails = { headers: response.headers };
        try {
          this._options.beforeRedirect.call(null, this._options, responseDetails);
        } catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }
      try {
        this._performRequest();
      } catch (cause) {
        this.emit("error", new RedirectionError(cause));
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (typeof input === "string") {
            var urlStr = input;
            try {
              input = urlToOptions(new URL(urlStr));
            } catch (err) {
              input = url.parse(urlStr);
            }
          } else if (URL && input instanceof URL) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (typeof options === "function") {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports2;
    }
    function noop() {
    }
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, defaultMessage) {
      function CustomError(cause) {
        Error.captureStackTrace(this, this.constructor);
        if (!cause) {
          this.message = defaultMessage;
        } else {
          this.message = defaultMessage + ": " + cause.message;
          this.cause = cause;
        }
      }
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      CustomError.prototype.code = code;
      return CustomError;
    }
    function abortRequest(request) {
      for (var e = 0; e < events.length; e++) {
        request.removeListener(events[e], eventHandlers[events[e]]);
      }
      request.on("error", noop);
      request.abort();
    }
    function isSubdomain(subdomain, domain) {
      const dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module2) {
    module2.exports = {
      "version": "0.26.1"
    };
  }
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/axios/lib/adapters/http.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = require("http");
    var https = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = require("url");
    var zlib = require("zlib");
    var VERSION = require_data().version;
    var createError = require_createError();
    var enhanceError = require_enhanceError();
    var transitionalDefaults = require_transitional();
    var Cancel = require_Cancel();
    var isHttps = /https:?/;
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        var resolve = function resolve2(value) {
          done();
          resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject2(value) {
          done();
          rejected = true;
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name) {
          headerNames[name.toLowerCase()] = name;
        });
        if ("user-agent" in headerNames) {
          if (!headers[headerNames["user-agent"]]) {
            delete headers[headerNames["user-agent"]];
          }
        } else {
          headers["User-Agent"] = "axios/" + VERSION;
        }
        if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
          }
          if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
            return reject(createError("Request body larger than maxBodyLength limit", config));
          }
          if (!headerNames["content-length"]) {
            headers["Content-Length"] = data.length;
          }
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth && headerNames.authorization) {
          delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        try {
          buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, "");
        } catch (err) {
          var customErr = new Error(err.message);
          customErr.config = config;
          customErr.url = config.url;
          customErr.exists = true;
          reject(customErr);
        }
        var options = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth
        };
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s) {
                return s.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }
        if (config.insecureHTTPParser) {
          options.insecureHTTPParser = config.insecureHTTPParser;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                rejected = true;
                stream.destroy();
                reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
              }
            });
            stream.on("aborted", function handlerStreamAborted() {
              if (rejected) {
                return;
              }
              stream.destroy();
              reject(createError("error request aborted", config, "ERR_REQUEST_ABORTED", lastRequest));
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(enhanceError(err, config, null, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              try {
                var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                if (config.responseType !== "arraybuffer") {
                  responseData = responseData.toString(config.responseEncoding);
                  if (!config.responseEncoding || config.responseEncoding === "utf8") {
                    responseData = utils.stripBOM(responseData);
                  }
                }
                response.data = responseData;
              } catch (err) {
                reject(enhanceError(err, config, err.code, response.request, response));
              }
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
            return;
          reject(enhanceError(err, config, null, req));
        });
        req.on("socket", function handleRequestSocket(socket) {
          socket.setKeepAlive(true, 1e3 * 60);
        });
        if (config.timeout) {
          var timeout = parseInt(config.timeout, 10);
          if (isNaN(timeout)) {
            reject(createError("error trying to parse `config.timeout` to int", config, "ERR_PARSE_TIMEOUT", req));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            var timeoutErrorMessage = "";
            if (config.timeoutErrorMessage) {
              timeoutErrorMessage = config.timeoutErrorMessage;
            } else {
              timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
            }
            var transitional = config.transitional || transitionalDefaults;
            reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", req));
          });
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(enhanceError(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/axios/lib/defaults/index.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults/index.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var transitionalDefaults = require_transitional();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module2.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module2) {
    "use strict";
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module2) {
    "use strict";
    var VERSION = require_data().version;
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module2.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module2.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module2) {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module2) {
    "use strict";
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.Cancel = require_Cancel();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.VERSION = require_data().version;
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module2.exports = axios;
    module2.exports.default = axios;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module2) {
    module2.exports = require_axios();
  }
});

// node_modules/@sendgrid/client/package.json
var require_package = __commonJS({
  "node_modules/@sendgrid/client/package.json"(exports, module2) {
    module2.exports = {
      _from: "@sendgrid/client@^7.6.2",
      _id: "@sendgrid/client@7.6.2",
      _inBundle: false,
      _integrity: "sha512-Yw3i3vPBBwfiIi+4i7+1f1rwQoLlLsu3qW16d1UuRp6RgX6H6yHYb2/PfqwNyCC0qzqIWGUKPWwYe5ggcr5Guw==",
      _location: "/@sendgrid/client",
      _phantomChildren: {},
      _requested: {
        type: "range",
        registry: true,
        raw: "@sendgrid/client@^7.6.2",
        name: "@sendgrid/client",
        escapedName: "@sendgrid%2fclient",
        scope: "@sendgrid",
        rawSpec: "^7.6.2",
        saveSpec: null,
        fetchSpec: "^7.6.2"
      },
      _requiredBy: [
        "/@sendgrid/mail"
      ],
      _resolved: "https://registry.npmjs.org/@sendgrid/client/-/client-7.6.2.tgz",
      _shasum: "5d08949120dad679f34260f1b875b4f57a8d688e",
      _spec: "@sendgrid/client@^7.6.2",
      _where: "/Users/gfairbairn/Documents/GitHub/personal-website/node_modules/@sendgrid/mail",
      author: {
        name: "Twilio SendGrid",
        email: "help@twilio.com",
        url: "sendgrid.com"
      },
      bugs: {
        url: "https://github.com/sendgrid/sendgrid-nodejs/issues"
      },
      bundleDependencies: false,
      contributors: [
        {
          name: "Kyle Partridge",
          email: "kyle.partridge@sendgrid.com"
        },
        {
          name: "David Tomberlin",
          email: "david.tomberlin@sendgrid.com"
        },
        {
          name: "Swift",
          email: "swift@sendgrid.com"
        },
        {
          name: "Brandon West",
          email: "brandon.west@sendgrid.com"
        },
        {
          name: "Scott Motte",
          email: "scott.motte@sendgrid.com"
        },
        {
          name: "Robert Acosta",
          email: "robert.acosta@sendgrid.com"
        },
        {
          name: "Elmer Thomas",
          email: "ethomas@twilio.com"
        },
        {
          name: "Adam Reis",
          email: "adam@reis.nz"
        }
      ],
      dependencies: {
        "@sendgrid/helpers": "^7.6.2",
        axios: "^0.26.0"
      },
      deprecated: false,
      description: "Twilio SendGrid NodeJS API client",
      devDependencies: {
        chai: "4.2.0",
        nock: "^10.0.6"
      },
      engines: {
        node: "6.* || 8.* || >=10.*"
      },
      gitHead: "6beced78088a75a28e07bea004013c830ccf6352",
      homepage: "https://sendgrid.com",
      license: "MIT",
      main: "index.js",
      name: "@sendgrid/client",
      publishConfig: {
        access: "public"
      },
      repository: {
        type: "git",
        url: "git://github.com/sendgrid/sendgrid-nodejs.git"
      },
      resolutions: {
        chai: "4.2.0"
      },
      tags: [
        "http",
        "rest",
        "api",
        "mail",
        "sendgrid"
      ],
      version: "7.6.2"
    };
  }
});

// node_modules/@sendgrid/helpers/helpers/convert-keys.js
var require_convert_keys = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/convert-keys.js"(exports, module2) {
    "use strict";
    module2.exports = function convertKeys(obj, converter, ignored) {
      if (typeof obj !== "object" || obj === null) {
        throw new Error("Non object passed to convertKeys: " + obj);
      }
      if (Array.isArray(obj)) {
        return obj;
      }
      if (!Array.isArray(ignored)) {
        ignored = [];
      }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const converted = converter(key);
          if (typeof obj[key] === "object" && obj[key] !== null) {
            if (!ignored.includes(key) && !ignored.includes(converted)) {
              obj[key] = convertKeys(obj[key], converter, ignored);
            }
          }
          if (converted !== key) {
            obj[converted] = obj[key];
            delete obj[key];
          }
        }
      }
      return obj;
    };
  }
});

// node_modules/@sendgrid/helpers/helpers/str-to-camel-case.js
var require_str_to_camel_case = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/str-to-camel-case.js"(exports, module2) {
    "use strict";
    module2.exports = function strToCamelCase(str) {
      if (typeof str !== "string") {
        throw new Error("String expected for conversion to snake case");
      }
      return str.trim().replace(/_+|\-+/g, " ").replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (Number(match) === 0) {
          return "";
        }
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    };
  }
});

// node_modules/@sendgrid/helpers/helpers/to-camel-case.js
var require_to_camel_case = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/to-camel-case.js"(exports, module2) {
    "use strict";
    var convertKeys = require_convert_keys();
    var strToCamelCase = require_str_to_camel_case();
    module2.exports = function toCamelCase(obj, ignored) {
      return convertKeys(obj, strToCamelCase, ignored);
    };
  }
});

// node_modules/@sendgrid/helpers/helpers/str-to-snake-case.js
var require_str_to_snake_case = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/str-to-snake-case.js"(exports, module2) {
    "use strict";
    module2.exports = function strToSnakeCase(str) {
      if (typeof str !== "string") {
        throw new Error("String expected for conversion to snake case");
      }
      return str.trim().replace(/(\s*\-*\b\w|[A-Z])/g, function($1) {
        $1 = $1.trim().toLowerCase().replace("-", "");
        return ($1[0] === "_" ? "" : "_") + $1;
      }).slice(1);
    };
  }
});

// node_modules/@sendgrid/helpers/helpers/to-snake-case.js
var require_to_snake_case = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/to-snake-case.js"(exports, module2) {
    "use strict";
    var convertKeys = require_convert_keys();
    var strToSnakeCase = require_str_to_snake_case();
    module2.exports = function toSnakeCase(obj, ignored) {
      return convertKeys(obj, strToSnakeCase, ignored);
    };
  }
});

// node_modules/@sendgrid/helpers/helpers/deep-clone.js
var require_deep_clone = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/deep-clone.js"(exports, module2) {
    "use strict";
    module2.exports = function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    };
  }
});

// node_modules/@sendgrid/helpers/classes/attachment.js
var require_attachment = __commonJS({
  "node_modules/@sendgrid/helpers/classes/attachment.js"(exports, module2) {
    "use strict";
    var toCamelCase = require_to_camel_case();
    var toSnakeCase = require_to_snake_case();
    var deepClone = require_deep_clone();
    var fs = require("fs");
    var path = require("path");
    var Attachment = class {
      constructor(data) {
        if (data) {
          this.fromData(data);
        }
      }
      fromData(data) {
        if (typeof data !== "object") {
          throw new Error("Expecting object for Mail data");
        }
        data = deepClone(data);
        data = toCamelCase(data);
        const {
          content,
          filename,
          type,
          disposition,
          contentId,
          filePath
        } = data;
        if (typeof content !== "undefined" && typeof filePath !== "undefined") {
          throw new Error("The props 'content' and 'filePath' cannot be used together.");
        }
        this.setFilename(filename);
        this.setType(type);
        this.setDisposition(disposition);
        this.setContentId(contentId);
        this.setContent(filePath ? this.readFile(filePath) : content);
      }
      readFile(filePath) {
        return fs.readFileSync(path.resolve(filePath));
      }
      setContent(content) {
        if (typeof content === "string") {
          this.content = content;
          return;
        } else if (content instanceof Buffer && content.toString !== void 0) {
          this.content = content.toString();
          if (this.disposition === "attachment") {
            this.content = content.toString("base64");
          }
          return;
        }
        throw new Error("`content` expected to be either Buffer or string");
      }
      setFileContent(content) {
        if (content instanceof Buffer && content.toString !== void 0) {
          this.content = content.toString("base64");
          return;
        }
        throw new Error("`content` expected to be Buffer");
      }
      setFilename(filename) {
        if (typeof filename === "undefined") {
          return;
        }
        if (filename && typeof filename !== "string") {
          throw new Error("String expected for `filename`");
        }
        this.filename = filename;
      }
      setType(type) {
        if (typeof type === "undefined") {
          return;
        }
        if (typeof type !== "string") {
          throw new Error("String expected for `type`");
        }
        this.type = type;
      }
      setDisposition(disposition) {
        if (typeof disposition === "undefined") {
          return;
        }
        if (typeof disposition !== "string") {
          throw new Error("String expected for `disposition`");
        }
        this.disposition = disposition;
      }
      setContentId(contentId) {
        if (typeof contentId === "undefined") {
          return;
        }
        if (typeof contentId !== "string") {
          throw new Error("String expected for `contentId`");
        }
        this.contentId = contentId;
      }
      toJSON() {
        const { content, filename, type, disposition, contentId } = this;
        const json = { content, filename };
        if (typeof type !== "undefined") {
          json.type = type;
        }
        if (typeof disposition !== "undefined") {
          json.disposition = disposition;
        }
        if (typeof contentId !== "undefined") {
          json.contentId = contentId;
        }
        return toSnakeCase(json);
      }
    };
    module2.exports = Attachment;
  }
});

// node_modules/@sendgrid/helpers/helpers/split-name-email.js
var require_split_name_email = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/split-name-email.js"(exports, module2) {
    "use strict";
    module2.exports = function splitNameEmail(str) {
      if (str.indexOf("<") === -1) {
        return ["", str];
      }
      let [name, email] = str.split("<");
      name = name.trim();
      email = email.replace(">", "").trim();
      return [name, email];
    };
  }
});

// node_modules/@sendgrid/helpers/classes/email-address.js
var require_email_address = __commonJS({
  "node_modules/@sendgrid/helpers/classes/email-address.js"(exports, module2) {
    "use strict";
    var splitNameEmail = require_split_name_email();
    var EmailAddress = class {
      constructor(data) {
        if (data) {
          this.fromData(data);
        }
      }
      fromData(data) {
        if (typeof data === "string") {
          const [name2, email2] = splitNameEmail(data);
          data = { name: name2, email: email2 };
        }
        if (typeof data !== "object") {
          throw new Error("Expecting object or string for EmailAddress data");
        }
        const { name, email } = data;
        this.setEmail(email);
        this.setName(name);
      }
      setName(name) {
        if (typeof name === "undefined") {
          return;
        }
        if (typeof name !== "string") {
          throw new Error("String expected for `name`");
        }
        this.name = name;
      }
      setEmail(email) {
        if (typeof email === "undefined") {
          throw new Error("Must provide `email`");
        }
        if (typeof email !== "string") {
          throw new Error("String expected for `email`");
        }
        this.email = email;
      }
      toJSON() {
        const { email, name } = this;
        const json = { email };
        if (name !== "") {
          json.name = name;
        }
        return json;
      }
      static create(data) {
        if (Array.isArray(data)) {
          return data.filter((item) => !!item).map((item) => this.create(item));
        }
        if (data instanceof EmailAddress) {
          return data;
        }
        return new EmailAddress(data);
      }
    };
    module2.exports = EmailAddress;
  }
});

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module2) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return target.propertyIsEnumerable(symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module2.exports = deepmerge_1;
  }
});

// node_modules/@sendgrid/helpers/helpers/wrap-substitutions.js
var require_wrap_substitutions = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/wrap-substitutions.js"(exports, module2) {
    "use strict";
    module2.exports = function wrap(substitutions, left = "{{", right = "}}") {
      if (Array.isArray(substitutions)) {
        return substitutions.map((subs) => wrap(subs, left, right));
      }
      const wrapped = {};
      for (const key in substitutions) {
        if (substitutions.hasOwnProperty(key)) {
          wrapped[left + key + right] = String(substitutions[key]);
        }
      }
      return wrapped;
    };
  }
});

// node_modules/@sendgrid/helpers/classes/personalization.js
var require_personalization = __commonJS({
  "node_modules/@sendgrid/helpers/classes/personalization.js"(exports, module2) {
    "use strict";
    var EmailAddress = require_email_address();
    var toCamelCase = require_to_camel_case();
    var toSnakeCase = require_to_snake_case();
    var deepClone = require_deep_clone();
    var deepMerge = require_cjs();
    var wrapSubstitutions = require_wrap_substitutions();
    var Personalization = class {
      constructor(data) {
        this.to = [];
        this.cc = [];
        this.bcc = [];
        this.headers = {};
        this.customArgs = {};
        this.substitutions = {};
        this.substitutionWrappers = ["{{", "}}"];
        this.dynamicTemplateData = {};
        if (data) {
          this.fromData(data);
        }
      }
      fromData(data) {
        if (typeof data !== "object") {
          throw new Error("Expecting object for Mail data");
        }
        data = deepClone(data);
        data = toCamelCase(data, ["substitutions", "dynamicTemplateData", "customArgs", "headers"]);
        const {
          to,
          from,
          cc,
          bcc,
          subject,
          headers,
          customArgs,
          sendAt,
          substitutions,
          substitutionWrappers,
          dynamicTemplateData
        } = data;
        this.setTo(to);
        this.setFrom(from);
        this.setCc(cc);
        this.setBcc(bcc);
        this.setSubject(subject);
        this.setHeaders(headers);
        this.setSubstitutions(substitutions);
        this.setSubstitutionWrappers(substitutionWrappers);
        this.setCustomArgs(customArgs);
        this.setDynamicTemplateData(dynamicTemplateData);
        this.setSendAt(sendAt);
      }
      setSubject(subject) {
        if (typeof subject === "undefined") {
          return;
        }
        if (typeof subject !== "string") {
          throw new Error("String expected for `subject`");
        }
        this.subject = subject;
      }
      setSendAt(sendAt) {
        if (typeof sendAt === "undefined") {
          return;
        }
        if (!Number.isInteger(sendAt)) {
          throw new Error("Integer expected for `sendAt`");
        }
        this.sendAt = sendAt;
      }
      setTo(to) {
        if (typeof to === "undefined") {
          return;
        }
        if (!Array.isArray(to)) {
          to = [to];
        }
        this.to = EmailAddress.create(to);
      }
      setFrom(from) {
        if (typeof from === "undefined") {
          return;
        }
        this.from = EmailAddress.create(from);
      }
      addTo(to) {
        if (typeof to === "undefined") {
          return;
        }
        this.to.push(EmailAddress.create(to));
      }
      setCc(cc) {
        if (typeof cc === "undefined") {
          return;
        }
        if (!Array.isArray(cc)) {
          cc = [cc];
        }
        this.cc = EmailAddress.create(cc);
      }
      addCc(cc) {
        if (typeof cc === "undefined") {
          return;
        }
        this.cc.push(EmailAddress.create(cc));
      }
      setBcc(bcc) {
        if (typeof bcc === "undefined") {
          return;
        }
        if (!Array.isArray(bcc)) {
          bcc = [bcc];
        }
        this.bcc = EmailAddress.create(bcc);
      }
      addBcc(bcc) {
        if (typeof bcc === "undefined") {
          return;
        }
        this.bcc.push(EmailAddress.create(bcc));
      }
      setHeaders(headers) {
        if (typeof headers === "undefined") {
          return;
        }
        if (typeof headers !== "object" || headers === null) {
          throw new Error("Object expected for `headers`");
        }
        this.headers = headers;
      }
      addHeader(key, value) {
        if (typeof key !== "string") {
          throw new Error("String expected for header key");
        }
        if (typeof value !== "string") {
          throw new Error("String expected for header value");
        }
        this.headers[key] = value;
      }
      setCustomArgs(customArgs) {
        if (typeof customArgs === "undefined") {
          return;
        }
        if (typeof customArgs !== "object" || customArgs === null) {
          throw new Error("Object expected for `customArgs`");
        }
        this.customArgs = customArgs;
      }
      addCustomArg(key, value) {
        if (typeof key !== "string") {
          throw new Error("String expected for custom arg key");
        }
        if (typeof value !== "string") {
          throw new Error("String expected for custom arg value");
        }
        this.customArgs[key] = value;
      }
      setSubstitutions(substitutions) {
        if (typeof substitutions === "undefined") {
          return;
        }
        if (typeof substitutions !== "object") {
          throw new Error("Object expected for `substitutions`");
        }
        this.substitutions = substitutions;
      }
      addSubstitution(key, value) {
        if (typeof key !== "string") {
          throw new Error("String expected for substitution key");
        }
        if (typeof value !== "string" && typeof value !== "number") {
          throw new Error("String or Number expected for substitution value");
        }
        this.substitutions[key] = value;
      }
      reverseMergeSubstitutions(substitutions) {
        if (typeof substitutions === "undefined" || substitutions === null) {
          return;
        }
        if (typeof substitutions !== "object") {
          throw new Error("Object expected for `substitutions` in reverseMergeSubstitutions");
        }
        this.substitutions = Object.assign({}, substitutions, this.substitutions);
      }
      setSubstitutionWrappers(wrappers) {
        if (typeof wrappers === "undefined" || wrappers === null) {
          return;
        }
        if (!Array.isArray(wrappers) || wrappers.length !== 2) {
          throw new Error("Array expected with two elements for `substitutionWrappers`");
        }
        this.substitutionWrappers = wrappers;
      }
      deepMergeDynamicTemplateData(dynamicTemplateData) {
        if (typeof dynamicTemplateData === "undefined" || dynamicTemplateData === null) {
          return;
        }
        if (typeof dynamicTemplateData !== "object") {
          throw new Error("Object expected for `dynamicTemplateData` in deepMergeDynamicTemplateData");
        }
        this.dynamicTemplateData = deepMerge(dynamicTemplateData, this.dynamicTemplateData);
      }
      setDynamicTemplateData(dynamicTemplateData) {
        if (typeof dynamicTemplateData === "undefined") {
          return;
        }
        if (typeof dynamicTemplateData !== "object") {
          throw new Error("Object expected for `dynamicTemplateData`");
        }
        this.dynamicTemplateData = dynamicTemplateData;
      }
      toJSON() {
        const {
          to,
          from,
          cc,
          bcc,
          subject,
          headers,
          customArgs,
          sendAt,
          substitutions,
          substitutionWrappers,
          dynamicTemplateData
        } = this;
        const json = { to };
        if (Array.isArray(cc) && cc.length > 0) {
          json.cc = cc;
        }
        if (Array.isArray(bcc) && bcc.length > 0) {
          json.bcc = bcc;
        }
        if (Object.keys(headers).length > 0) {
          json.headers = headers;
        }
        if (substitutions && Object.keys(substitutions).length > 0) {
          const [left, right] = substitutionWrappers;
          json.substitutions = wrapSubstitutions(substitutions, left, right);
        }
        if (Object.keys(customArgs).length > 0) {
          json.customArgs = customArgs;
        }
        if (dynamicTemplateData && Object.keys(dynamicTemplateData).length > 0) {
          json.dynamicTemplateData = dynamicTemplateData;
        }
        if (typeof subject !== "undefined") {
          json.subject = subject;
        }
        if (typeof sendAt !== "undefined") {
          json.sendAt = sendAt;
        }
        if (typeof from !== "undefined") {
          json.from = from;
        }
        return toSnakeCase(json, ["substitutions", "dynamicTemplateData", "customArgs", "headers"]);
      }
    };
    module2.exports = Personalization;
  }
});

// node_modules/@sendgrid/helpers/helpers/array-to-json.js
var require_array_to_json = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/array-to-json.js"(exports, module2) {
    "use strict";
    module2.exports = function arrayToJSON(arr) {
      return arr.map((item) => {
        if (typeof item === "object" && item !== null && typeof item.toJSON === "function") {
          return item.toJSON();
        }
        return item;
      });
    };
  }
});

// node_modules/@sendgrid/helpers/constants/index.js
var require_constants = __commonJS({
  "node_modules/@sendgrid/helpers/constants/index.js"(exports, module2) {
    var DYNAMIC_TEMPLATE_CHAR_WARNING = `
Content with characters ', " or & may need to be escaped with three brackets
{{{ content }}}
See https://sendgrid.com/docs/for-developers/sending-email/using-handlebars/ for more information.`;
    module2.exports = {
      DYNAMIC_TEMPLATE_CHAR_WARNING
    };
  }
});

// node_modules/@sendgrid/helpers/helpers/validate-settings.js
var require_validate_settings = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/validate-settings.js"(exports, module2) {
    "use strict";
    var validate = (parent, parentName, childName, childType) => {
      if (typeof parent === "undefined" || typeof parent[childName] === "undefined") {
        return;
      }
      if (typeof parent[childName] !== childType) {
        throw new Error(`${childType} expected for \`${parentName}.${childName}\``);
      }
    };
    module2.exports = {
      validateMailSettings(settings) {
        if (typeof settings !== "object") {
          throw new Error("Object expected for `mailSettings`");
        }
        const {
          bcc,
          bypassListManagement,
          footer,
          sandboxMode,
          spamCheck
        } = settings;
        validate(bcc, "bcc", "enable", "boolean");
        validate(bcc, "bcc", "email", "string");
        validate(bypassListManagement, "bypassListManagement", "enable", "boolean");
        validate(footer, "footer", "enable", "boolean");
        validate(footer, "footer", "text", "string");
        validate(footer, "footer", "html", "string");
        validate(sandboxMode, "sandboxMode", "enable", "boolean");
        validate(spamCheck, "spamCheck", "enable", "boolean");
        validate(spamCheck, "spamCheck", "threshold", "number");
        validate(spamCheck, "spamCheck", "postToUrl", "string");
      },
      validateTrackingSettings(settings) {
        if (typeof settings !== "object") {
          throw new Error("Object expected for `trackingSettings`");
        }
        const {
          clickTracking,
          openTracking,
          subscriptionTracking,
          ganalytics
        } = settings;
        validate(clickTracking, "clickTracking", "enable", "boolean");
        validate(clickTracking, "clickTracking", "enableText", "boolean");
        validate(openTracking, "openTracking", "enable", "boolean");
        validate(openTracking, "openTracking", "substitutionTag", "string");
        validate(subscriptionTracking, "subscriptionTracking", "enable", "boolean");
        validate(subscriptionTracking, "subscriptionTracking", "text", "string");
        validate(subscriptionTracking, "subscriptionTracking", "html", "string");
        validate(subscriptionTracking, "subscriptionTracking", "substitutionTag", "string");
        validate(ganalytics, "ganalytics", "enable", "boolean");
        validate(ganalytics, "ganalytics", "utm_source", "string");
        validate(ganalytics, "ganalytics", "utm_medium", "string");
        validate(ganalytics, "ganalytics", "utm_term", "string");
        validate(ganalytics, "ganalytics", "utm_content", "string");
        validate(ganalytics, "ganalytics", "utm_campaign", "string");
      }
    };
  }
});

// node_modules/@sendgrid/helpers/classes/mail.js
var require_mail = __commonJS({
  "node_modules/@sendgrid/helpers/classes/mail.js"(exports, module2) {
    "use strict";
    var EmailAddress = require_email_address();
    var Personalization = require_personalization();
    var toCamelCase = require_to_camel_case();
    var toSnakeCase = require_to_snake_case();
    var deepClone = require_deep_clone();
    var arrayToJSON = require_array_to_json();
    var { DYNAMIC_TEMPLATE_CHAR_WARNING } = require_constants();
    var { validateMailSettings, validateTrackingSettings } = require_validate_settings();
    var Mail = class {
      constructor(data) {
        this.isDynamic = false;
        this.hideWarnings = false;
        this.personalizations = [];
        this.attachments = [];
        this.content = [];
        this.categories = [];
        this.headers = {};
        this.sections = {};
        this.customArgs = {};
        this.trackingSettings = {};
        this.mailSettings = {};
        this.asm = {};
        this.substitutions = null;
        this.substitutionWrappers = null;
        this.dynamicTemplateData = null;
        if (data) {
          this.fromData(data);
        }
      }
      fromData(data) {
        if (typeof data !== "object") {
          throw new Error("Expecting object for Mail data");
        }
        data = deepClone(data);
        data = toCamelCase(data, ["substitutions", "dynamicTemplateData", "customArgs", "headers", "sections"]);
        const {
          to,
          from,
          replyTo,
          cc,
          bcc,
          sendAt,
          subject,
          text,
          html,
          content,
          templateId,
          personalizations,
          attachments,
          ipPoolName,
          batchId,
          sections,
          headers,
          categories,
          category,
          customArgs,
          asm,
          mailSettings,
          trackingSettings,
          substitutions,
          substitutionWrappers,
          dynamicTemplateData,
          isMultiple,
          hideWarnings,
          replyToList
        } = data;
        this.setFrom(from);
        this.setReplyTo(replyTo);
        this.setSubject(subject);
        this.setSendAt(sendAt);
        this.setTemplateId(templateId);
        this.setBatchId(batchId);
        this.setIpPoolName(ipPoolName);
        this.setAttachments(attachments);
        this.setContent(content);
        this.setSections(sections);
        this.setHeaders(headers);
        this.setCategories(category);
        this.setCategories(categories);
        this.setCustomArgs(customArgs);
        this.setAsm(asm);
        this.setMailSettings(mailSettings);
        this.setTrackingSettings(trackingSettings);
        this.setHideWarnings(hideWarnings);
        this.setReplyToList(replyToList);
        if (this.isDynamic) {
          this.setDynamicTemplateData(dynamicTemplateData);
        } else {
          this.setSubstitutions(substitutions);
          this.setSubstitutionWrappers(substitutionWrappers);
        }
        this.addTextContent(text);
        this.addHtmlContent(html);
        if (personalizations) {
          this.setPersonalizations(personalizations);
        } else if (isMultiple && Array.isArray(to)) {
          to.forEach((to2) => this.addTo(to2, cc, bcc));
        } else {
          this.addTo(to, cc, bcc);
        }
      }
      setFrom(from) {
        if (this._checkProperty("from", from, [this._checkUndefined])) {
          if (typeof from !== "string" && typeof from.email !== "string") {
            throw new Error("String or address object expected for `from`");
          }
          this.from = EmailAddress.create(from);
        }
      }
      setReplyTo(replyTo) {
        if (this._checkProperty("replyTo", replyTo, [this._checkUndefined])) {
          if (typeof replyTo !== "string" && typeof replyTo.email !== "string") {
            throw new Error("String or address object expected for `replyTo`");
          }
          this.replyTo = EmailAddress.create(replyTo);
        }
      }
      setSubject(subject) {
        this._setProperty("subject", subject, "string");
      }
      setSendAt(sendAt) {
        if (this._checkProperty("sendAt", sendAt, [this._checkUndefined, this._createCheckThatThrows(Number.isInteger, "Integer expected for `sendAt`")])) {
          this.sendAt = sendAt;
        }
      }
      setTemplateId(templateId) {
        if (this._setProperty("templateId", templateId, "string")) {
          if (templateId.indexOf("d-") === 0) {
            this.isDynamic = true;
          }
        }
      }
      setBatchId(batchId) {
        this._setProperty("batchId", batchId, "string");
      }
      setIpPoolName(ipPoolName) {
        this._setProperty("ipPoolName", ipPoolName, "string");
      }
      setAsm(asm) {
        if (this._checkProperty("asm", asm, [this._checkUndefined, this._createTypeCheck("object")])) {
          if (typeof asm.groupId !== "number") {
            throw new Error("Expected `asm` to include an integer in its `groupId` field");
          }
          if (asm.groupsToDisplay && (!Array.isArray(asm.groupsToDisplay) || !asm.groupsToDisplay.every((group) => typeof group === "number"))) {
            throw new Error("Array of integers expected for `asm.groupsToDisplay`");
          }
          this.asm = asm;
        }
      }
      setPersonalizations(personalizations) {
        if (!this._doArrayCheck("personalizations", personalizations)) {
          return;
        }
        if (!personalizations.every((personalization) => typeof personalization === "object")) {
          throw new Error("Array of objects expected for `personalizations`");
        }
        this.personalizations = [];
        personalizations.forEach((personalization) => this.addPersonalization(personalization));
      }
      addPersonalization(personalization) {
        if (this.isDynamic && personalization.substitutions) {
          delete personalization.substitutions;
        } else if (!this.isDynamic && personalization.dynamicTemplateData) {
          delete personalization.dynamicTemplateData;
        }
        if (!(personalization instanceof Personalization)) {
          personalization = new Personalization(personalization);
        }
        if (this.isDynamic) {
          this.applyDynamicTemplateData(personalization);
        } else {
          this.applySubstitutions(personalization);
        }
        this.personalizations.push(personalization);
      }
      addTo(to, cc, bcc) {
        if (typeof to === "undefined" && typeof cc === "undefined" && typeof bcc === "undefined") {
          throw new Error("Provide at least one of to, cc or bcc");
        }
        this.addPersonalization(new Personalization({ to, cc, bcc }));
      }
      setSubstitutions(substitutions) {
        this._setProperty("substitutions", substitutions, "object");
      }
      setSubstitutionWrappers(substitutionWrappers) {
        let lengthCheck = (propertyName, value) => {
          if (!Array.isArray(value) || value.length !== 2) {
            throw new Error("Array expected with two elements for `" + propertyName + "`");
          }
        };
        if (this._checkProperty("substitutionWrappers", substitutionWrappers, [this._checkUndefined, lengthCheck])) {
          this.substitutionWrappers = substitutionWrappers;
        }
      }
      applySubstitutions(personalization) {
        if (personalization instanceof Personalization) {
          personalization.reverseMergeSubstitutions(this.substitutions);
          personalization.setSubstitutionWrappers(this.substitutionWrappers);
        }
      }
      applyDynamicTemplateData(personalization) {
        if (personalization instanceof Personalization) {
          personalization.deepMergeDynamicTemplateData(this.dynamicTemplateData);
        }
      }
      setDynamicTemplateData(dynamicTemplateData) {
        if (typeof dynamicTemplateData === "undefined") {
          return;
        }
        if (typeof dynamicTemplateData !== "object") {
          throw new Error("Object expected for `dynamicTemplateData`");
        }
        if (!this.hideWarnings) {
          Object.values(dynamicTemplateData).forEach((value) => {
            if (/['"&]/.test(value)) {
              console.warn(DYNAMIC_TEMPLATE_CHAR_WARNING);
            }
          });
        }
        this.dynamicTemplateData = dynamicTemplateData;
      }
      setContent(content) {
        if (this._doArrayCheck("content", content)) {
          if (!content.every((contentField) => typeof contentField === "object")) {
            throw new Error("Expected each entry in `content` to be an object");
          }
          if (!content.every((contentField) => typeof contentField.type === "string")) {
            throw new Error("Expected each `content` entry to contain a `type` string");
          }
          if (!content.every((contentField) => typeof contentField.value === "string")) {
            throw new Error("Expected each `content` entry to contain a `value` string");
          }
          this.content = content;
        }
      }
      addContent(content) {
        if (this._checkProperty("content", content, [this._createTypeCheck("object")])) {
          this.content.push(content);
        }
      }
      addTextContent(text) {
        if (this._checkProperty("text", text, [this._checkUndefined, this._createTypeCheck("string")])) {
          this.addContent({
            value: text,
            type: "text/plain"
          });
        }
      }
      addHtmlContent(html) {
        if (this._checkProperty("html", html, [this._checkUndefined, this._createTypeCheck("string")])) {
          this.addContent({
            value: html,
            type: "text/html"
          });
        }
      }
      setAttachments(attachments) {
        if (this._doArrayCheck("attachments", attachments)) {
          if (!attachments.every((attachment) => typeof attachment.content === "string")) {
            throw new Error("Expected each attachment to contain a `content` string");
          }
          if (!attachments.every((attachment) => typeof attachment.filename === "string")) {
            throw new Error("Expected each attachment to contain a `filename` string");
          }
          if (!attachments.every((attachment) => !attachment.type || typeof attachment.type === "string")) {
            throw new Error("Expected the attachment's `type` field to be a string");
          }
          if (!attachments.every((attachment) => !attachment.disposition || typeof attachment.disposition === "string")) {
            throw new Error("Expected the attachment's `disposition` field to be a string");
          }
          this.attachments = attachments;
        }
      }
      addAttachment(attachment) {
        if (this._checkProperty("attachment", attachment, [this._checkUndefined, this._createTypeCheck("object")])) {
          this.attachments.push(attachment);
        }
      }
      setCategories(categories) {
        let allElementsAreStrings = (propertyName, value) => {
          if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
            throw new Error("Array of strings expected for `" + propertyName + "`");
          }
        };
        if (typeof categories === "string") {
          categories = [categories];
        }
        if (this._checkProperty("categories", categories, [this._checkUndefined, allElementsAreStrings])) {
          this.categories = categories;
        }
      }
      addCategory(category) {
        if (this._checkProperty("category", category, [this._createTypeCheck("string")])) {
          this.categories.push(category);
        }
      }
      setHeaders(headers) {
        this._setProperty("headers", headers, "object");
      }
      addHeader(key, value) {
        if (this._checkProperty("key", key, [this._createTypeCheck("string")]) && this._checkProperty("value", value, [this._createTypeCheck("string")])) {
          this.headers[key] = value;
        }
      }
      setSections(sections) {
        this._setProperty("sections", sections, "object");
      }
      setCustomArgs(customArgs) {
        this._setProperty("customArgs", customArgs, "object");
      }
      setTrackingSettings(settings) {
        if (typeof settings === "undefined") {
          return;
        }
        validateTrackingSettings(settings);
        this.trackingSettings = settings;
      }
      setMailSettings(settings) {
        if (typeof settings === "undefined") {
          return;
        }
        validateMailSettings(settings);
        this.mailSettings = settings;
      }
      setHideWarnings(hide) {
        if (typeof hide === "undefined") {
          return;
        }
        if (typeof hide !== "boolean") {
          throw new Error("Boolean expected for `hideWarnings`");
        }
        this.hideWarnings = hide;
      }
      toJSON() {
        const {
          from,
          replyTo,
          sendAt,
          subject,
          content,
          templateId,
          personalizations,
          attachments,
          ipPoolName,
          batchId,
          asm,
          sections,
          headers,
          categories,
          customArgs,
          mailSettings,
          trackingSettings,
          replyToList
        } = this;
        const json = {
          from,
          subject,
          personalizations: arrayToJSON(personalizations)
        };
        if (Array.isArray(attachments) && attachments.length > 0) {
          json.attachments = arrayToJSON(attachments);
        }
        if (Array.isArray(categories) && categories.length > 0) {
          json.categories = categories.filter((cat) => cat !== "");
        }
        if (Array.isArray(content) && content.length > 0) {
          json.content = arrayToJSON(content);
        }
        if (Object.keys(headers).length > 0) {
          json.headers = headers;
        }
        if (Object.keys(mailSettings).length > 0) {
          json.mailSettings = mailSettings;
        }
        if (Object.keys(trackingSettings).length > 0) {
          json.trackingSettings = trackingSettings;
        }
        if (Object.keys(customArgs).length > 0) {
          json.customArgs = customArgs;
        }
        if (Object.keys(sections).length > 0) {
          json.sections = sections;
        }
        if (Object.keys(asm).length > 0) {
          json.asm = asm;
        }
        if (typeof replyTo !== "undefined") {
          json.replyTo = replyTo;
        }
        if (typeof sendAt !== "undefined") {
          json.sendAt = sendAt;
        }
        if (typeof batchId !== "undefined") {
          json.batchId = batchId;
        }
        if (typeof templateId !== "undefined") {
          json.templateId = templateId;
        }
        if (typeof ipPoolName !== "undefined") {
          json.ipPoolName = ipPoolName;
        }
        if (typeof replyToList !== "undefined") {
          json.replyToList = replyToList;
        }
        return toSnakeCase(json, ["substitutions", "dynamicTemplateData", "customArgs", "headers", "sections"]);
      }
      static create(data) {
        if (Array.isArray(data)) {
          return data.filter((item) => !!item).map((item) => this.create(item));
        }
        if (data instanceof Mail) {
          return data;
        }
        return new Mail(data);
      }
      _checkProperty(propertyName, value, checks) {
        return !checks.some((e) => e(propertyName, value));
      }
      _setProperty(propertyName, value, propertyType) {
        let propertyChecksPassed = this._checkProperty(propertyName, value, [this._checkUndefined, this._createTypeCheck(propertyType)]);
        if (propertyChecksPassed) {
          this[propertyName] = value;
        }
        return propertyChecksPassed;
      }
      _checkUndefined(propertyName, value) {
        return typeof value === "undefined";
      }
      _createTypeCheck(propertyType) {
        return (propertyName, value) => {
          if (typeof value !== propertyType) {
            throw new Error(propertyType + " expected for `" + propertyName + "`");
          }
        };
      }
      _createCheckThatThrows(check, errorString) {
        return (propertyName, value) => {
          if (!check(value)) {
            throw new Error(errorString);
          }
        };
      }
      _setArrayProperty(propertyName, value) {
        if (this._doArrayCheck(propertyName, value)) {
          this[propertyName] = value;
        }
      }
      _doArrayCheck(propertyName, value) {
        return this._checkProperty(propertyName, value, [this._checkUndefined, this._createCheckThatThrows(Array.isArray, "Array expected for`" + propertyName + "`")]);
      }
      setReplyToList(replyToList) {
        if (this._doArrayCheck("replyToList", replyToList) && replyToList.length) {
          if (!replyToList.every((replyTo) => replyTo && typeof replyTo.email === "string")) {
            throw new Error("Expected each replyTo to contain an `email` string");
          }
          this.replyToList = replyToList;
        }
      }
    };
    module2.exports = Mail;
  }
});

// node_modules/@sendgrid/helpers/classes/response.js
var require_response = __commonJS({
  "node_modules/@sendgrid/helpers/classes/response.js"(exports, module2) {
    "use strict";
    var Response = class {
      constructor(statusCode, body, headers) {
        this.statusCode = statusCode;
        this.body = body;
        this.headers = headers;
      }
      toString() {
        return "HTTP " + this.statusCode + " " + this.body;
      }
    };
    module2.exports = Response;
  }
});

// node_modules/@sendgrid/helpers/classes/response-error.js
var require_response_error = __commonJS({
  "node_modules/@sendgrid/helpers/classes/response-error.js"(exports, module2) {
    "use strict";
    var ResponseError = class extends Error {
      constructor(response) {
        super();
        const { headers, status, statusText, data } = response;
        this.code = status;
        this.message = statusText;
        this.response = { headers, body: data };
        if (!this.stack) {
          Error.captureStackTrace(this, this.constructor);
        }
        const regex = new RegExp(process.cwd() + "/", "gi");
        this.stack = this.stack.replace(regex, "");
      }
      toString() {
        const { body } = this.response;
        let err = `${this.message} (${this.code})`;
        if (body && Array.isArray(body.errors)) {
          body.errors.forEach((error) => {
            const message = error.message;
            const field = error.field;
            const help = error.help;
            err += `
  ${message}
    ${field}
    ${help}`;
          });
        }
        return err;
      }
      toJSON() {
        const { message, code, response } = this;
        return { message, code, response };
      }
    };
    module2.exports = ResponseError;
  }
});

// node_modules/@sendgrid/helpers/classes/statistics.js
var require_statistics = __commonJS({
  "node_modules/@sendgrid/helpers/classes/statistics.js"(exports, module2) {
    "use strict";
    var toCamelCase = require_to_camel_case();
    var deepClone = require_deep_clone();
    var AggregatedByOptions = ["day", "week", "month"];
    var CountryOptions = ["us", "ca"];
    var SortByDirection = ["desc", "asc"];
    var Statistics = class {
      constructor(data) {
        this.startDate = null;
        this.endDate = null;
        this.aggregatedBy = null;
        if (data) {
          this.fromData(data);
        }
      }
      fromData(data) {
        if (typeof data !== "object") {
          throw new Error("Expecting object for Statistics data");
        }
        data = deepClone(data);
        data = toCamelCase(data, ["substitutions", "customArgs"]);
        const {
          startDate,
          endDate,
          aggregatedBy
        } = data;
        this.setStartDate(startDate);
        this.setEndDate(endDate);
        this.setAggregatedBy(aggregatedBy);
      }
      setStartDate(startDate) {
        if (typeof startDate === "undefined") {
          throw new Error("Date expected for `startDate`");
        }
        if (new Date(startDate) === "Invalid Date" || isNaN(new Date(startDate))) {
          throw new Error("Date expected for `startDate`");
        }
        console.log(startDate);
        this.startDate = new Date(startDate).toISOString().slice(0, 10);
      }
      setEndDate(endDate) {
        if (typeof endDate === "undefined") {
          this.endDate = new Date().toISOString().slice(0, 10);
          return;
        }
        if (new Date(endDate) === "Invalid Date" || isNaN(new Date(endDate))) {
          throw new Error("Date expected for `endDate`");
        }
        this.endDate = new Date(endDate).toISOString().slice(0, 10);
      }
      setAggregatedBy(aggregatedBy) {
        if (typeof aggregatedBy === "undefined") {
          return;
        }
        if (typeof aggregatedBy === "string" && AggregatedByOptions.includes(aggregatedBy.toLowerCase())) {
          this.aggregatedBy = aggregatedBy;
        } else {
          throw new Error("Incorrect value for `aggregatedBy`");
        }
      }
      getGlobal() {
        const { startDate, endDate, aggregatedBy } = this;
        return { startDate, endDate, aggregatedBy };
      }
      getAdvanced(country) {
        const json = this.getGlobal();
        if (typeof country === "undefined") {
          return json;
        }
        if (typeof country === "string" && CountryOptions.includes(country.toLowerCase())) {
          json.country = country;
        }
        return json;
      }
      getAdvancedMailboxProviders(mailBoxProviders) {
        const json = this.getGlobal();
        if (typeof mailBoxProviders === "undefined") {
          return json;
        }
        if (Array.isArray(mailBoxProviders) && mailBoxProviders.some((x) => typeof x !== "string")) {
          throw new Error("Array of strings expected for `mailboxProviders`");
        }
        json.mailBoxProviders = mailBoxProviders;
        return json;
      }
      getAdvancedBrowsers(browsers) {
        const json = this.getGlobal();
        if (typeof browsers === "undefined") {
          return json;
        }
        if (Array.isArray(browsers) && browsers.some((x) => typeof x !== "string")) {
          throw new Error("Array of strings expected for `browsers`");
        }
        json.browsers = browsers;
        return json;
      }
      getCategories(categories) {
        if (typeof categories === "undefined") {
          throw new Error("Array of strings expected for `categories`");
        }
        if (!this._isValidArrayOfStrings(categories)) {
          throw new Error("Array of strings expected for `categories`");
        }
        const json = this.getGlobal();
        json.categories = categories;
        return json;
      }
      getSubuser(subusers) {
        if (typeof subusers === "undefined") {
          throw new Error("Array of strings expected for `subusers`");
        }
        if (!this._isValidArrayOfStrings(subusers)) {
          throw new Error("Array of strings expected for `subusers`");
        }
        const json = this.getGlobal();
        json.subusers = subusers;
        return json;
      }
      getSubuserSum(sortByMetric = "delivered", sortByDirection = SortByDirection[0], limit = 5, offset = 0) {
        if (typeof sortByMetric !== "string") {
          throw new Error("string expected for `sortByMetric`");
        }
        if (!SortByDirection.includes(sortByDirection.toLowerCase())) {
          throw new Error("desc or asc expected for `sortByDirection`");
        }
        if (typeof limit !== "number") {
          throw new Error("number expected for `limit`");
        }
        if (typeof offset !== "number") {
          throw new Error("number expected for `offset`");
        }
        const json = this.getGlobal();
        json.sortByMetric = sortByMetric;
        json.sortByDirection = sortByDirection;
        json.limit = limit;
        json.offset = offset;
        return json;
      }
      getSubuserMonthly(sortByMetric = "delivered", sortByDirection = SortByDirection[0], limit = 5, offset = 0) {
        if (typeof sortByMetric !== "string") {
          throw new Error("string expected for `sortByMetric`");
        }
        if (!SortByDirection.includes(sortByDirection.toLowerCase())) {
          throw new Error("desc or asc expected for `sortByDirection`");
        }
        if (typeof limit !== "number") {
          throw new Error("number expected for `limit`");
        }
        if (typeof offset !== "number") {
          throw new Error("number expected for `offset`");
        }
        const json = this.getGlobal();
        json.sortByMetric = sortByMetric;
        json.sortByDirection = sortByDirection;
        json.limit = limit;
        json.offset = offset;
        return json;
      }
      _isValidArrayOfStrings(arr) {
        if (!Array.isArray(arr)) {
          return false;
        }
        if (arr.length < 1 || arr.some((x) => typeof x !== "string")) {
          return false;
        }
        return true;
      }
    };
    module2.exports = Statistics;
  }
});

// node_modules/@sendgrid/helpers/classes/index.js
var require_classes = __commonJS({
  "node_modules/@sendgrid/helpers/classes/index.js"(exports, module2) {
    "use strict";
    var Attachment = require_attachment();
    var EmailAddress = require_email_address();
    var Mail = require_mail();
    var Personalization = require_personalization();
    var Response = require_response();
    var ResponseError = require_response_error();
    var Statistics = require_statistics();
    module2.exports = {
      Attachment,
      EmailAddress,
      Mail,
      Personalization,
      Response,
      ResponseError,
      Statistics
    };
  }
});

// node_modules/@sendgrid/helpers/helpers/merge-data.js
var require_merge_data = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/merge-data.js"(exports, module2) {
    "use strict";
    module2.exports = function mergeData(base, data) {
      if (typeof base !== "object" || base === null) {
        throw new Error("Not an object provided for base");
      }
      if (typeof data !== "object" || data === null) {
        throw new Error("Not an object provided for data");
      }
      const merged = Object.assign({}, base);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] && Array.isArray(data[key])) {
            merged[key] = data[key];
          } else if (data[key] && typeof data[key] === "object") {
            merged[key] = Object.assign({}, data[key]);
          } else if (data[key]) {
            merged[key] = data[key];
          }
        }
      }
      return merged;
    };
  }
});

// node_modules/@sendgrid/helpers/helpers/index.js
var require_helpers = __commonJS({
  "node_modules/@sendgrid/helpers/helpers/index.js"(exports, module2) {
    "use strict";
    var arrayToJSON = require_array_to_json();
    var convertKeys = require_convert_keys();
    var deepClone = require_deep_clone();
    var mergeData = require_merge_data();
    var splitNameEmail = require_split_name_email();
    var toCamelCase = require_to_camel_case();
    var toSnakeCase = require_to_snake_case();
    var wrapSubstitutions = require_wrap_substitutions();
    module2.exports = {
      arrayToJSON,
      convertKeys,
      deepClone,
      mergeData,
      splitNameEmail,
      toCamelCase,
      toSnakeCase,
      wrapSubstitutions
    };
  }
});

// node_modules/@sendgrid/helpers/index.js
var require_helpers2 = __commonJS({
  "node_modules/@sendgrid/helpers/index.js"(exports, module2) {
    "use strict";
    var classes = require_classes();
    var helpers = require_helpers();
    module2.exports = { classes, helpers };
  }
});

// node_modules/@sendgrid/client/src/classes/client.js
var require_client = __commonJS({
  "node_modules/@sendgrid/client/src/classes/client.js"(exports, module2) {
    "use strict";
    var axios = require_axios2();
    var pkg = require_package();
    var {
      helpers: {
        mergeData
      },
      classes: {
        Response,
        ResponseError
      }
    } = require_helpers2();
    var API_KEY_PREFIX = "SG.";
    var SENDGRID_BASE_URL = "https://api.sendgrid.com/";
    var TWILIO_BASE_URL = "https://email.twilio.com/";
    var Client = class {
      constructor() {
        this.auth = "";
        this.impersonateSubuser = "";
        this.defaultHeaders = {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "sendgrid/" + pkg.version + ";nodejs"
        };
        this.defaultRequest = {
          baseUrl: SENDGRID_BASE_URL,
          url: "",
          method: "GET",
          headers: {},
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        };
      }
      setApiKey(apiKey) {
        this.auth = "Bearer " + apiKey;
        this.setDefaultRequest("baseUrl", SENDGRID_BASE_URL);
        if (!this.isValidApiKey(apiKey)) {
          console.warn(`API key does not start with "${API_KEY_PREFIX}".`);
        }
      }
      setTwilioEmailAuth(username, password) {
        const b64Auth = Buffer.from(username + ":" + password).toString("base64");
        this.auth = "Basic " + b64Auth;
        this.setDefaultRequest("baseUrl", TWILIO_BASE_URL);
        if (!this.isValidTwilioAuth(username, password)) {
          console.warn("Twilio Email credentials must be non-empty strings.");
        }
      }
      isValidApiKey(apiKey) {
        return this.isString(apiKey) && apiKey.trim().startsWith(API_KEY_PREFIX);
      }
      isValidTwilioAuth(username, password) {
        return this.isString(username) && username && this.isString(password) && password;
      }
      isString(value) {
        return typeof value === "string" || value instanceof String;
      }
      setImpersonateSubuser(subuser) {
        this.impersonateSubuser = subuser;
      }
      setDefaultHeader(key, value) {
        if (key !== null && typeof key === "object") {
          Object.assign(this.defaultHeaders, key);
          return this;
        }
        this.defaultHeaders[key] = value;
        return this;
      }
      setDefaultRequest(key, value) {
        if (key !== null && typeof key === "object") {
          Object.assign(this.defaultRequest, key);
          return this;
        }
        this.defaultRequest[key] = value;
        return this;
      }
      createHeaders(data) {
        const headers = mergeData(this.defaultHeaders, data);
        if (typeof headers.Authorization === "undefined" && this.auth) {
          headers.Authorization = this.auth;
        }
        if (this.impersonateSubuser) {
          headers["On-Behalf-Of"] = this.impersonateSubuser;
        }
        return headers;
      }
      createRequest(data) {
        let options = {
          url: data.uri || data.url,
          baseUrl: data.baseUrl,
          method: data.method,
          data: data.body,
          params: data.qs,
          headers: data.headers
        };
        options = mergeData(this.defaultRequest, options);
        options.headers = this.createHeaders(options.headers);
        options.baseURL = options.baseUrl;
        delete options.baseUrl;
        return options;
      }
      request(data, cb) {
        data = this.createRequest(data);
        const promise = new Promise((resolve, reject) => {
          axios(data).then((response) => {
            return resolve([
              new Response(response.status, response.data, response.headers),
              response.data
            ]);
          }).catch((error) => {
            if (error.response) {
              if (error.response.status >= 400) {
                return reject(new ResponseError(error.response));
              }
            }
            return reject(error);
          });
        });
        if (cb && typeof cb !== "function") {
          throw new Error("Callback passed is not a function.");
        }
        if (cb) {
          return promise.then((result) => cb(null, result)).catch((error) => cb(error, null));
        }
        return promise;
      }
    };
    module2.exports = Client;
  }
});

// node_modules/@sendgrid/client/src/client.js
var require_client2 = __commonJS({
  "node_modules/@sendgrid/client/src/client.js"(exports, module2) {
    "use strict";
    var Client = require_client();
    module2.exports = new Client();
  }
});

// node_modules/@sendgrid/client/index.js
var require_client3 = __commonJS({
  "node_modules/@sendgrid/client/index.js"(exports, module2) {
    "use strict";
    var client = require_client2();
    var Client = require_client();
    module2.exports = client;
    module2.exports.Client = Client;
  }
});

// node_modules/@sendgrid/mail/src/classes/mail-service.js
var require_mail_service = __commonJS({
  "node_modules/@sendgrid/mail/src/classes/mail-service.js"(exports, module2) {
    "use strict";
    var { Client } = require_client3();
    var { classes: { Mail } } = require_helpers2();
    var MailService = class {
      constructor() {
        this.setClient(new Client());
        this.setSubstitutionWrappers("{{", "}}");
        this.secretRules = [];
      }
      setClient(client) {
        this.client = client;
        return this;
      }
      setApiKey(apiKey) {
        this.client.setApiKey(apiKey);
        return this;
      }
      setTwilioEmailAuth(username, password) {
        this.client.setTwilioEmailAuth(username, password);
      }
      setTimeout(timeout) {
        if (typeof timeout === "undefined") {
          return;
        }
        this.client.setDefaultRequest("timeout", timeout);
      }
      setSubstitutionWrappers(left, right) {
        if (typeof left === "undefined" || typeof right === "undefined") {
          throw new Error("Must provide both left and right side wrappers");
        }
        if (!Array.isArray(this.substitutionWrappers)) {
          this.substitutionWrappers = [];
        }
        this.substitutionWrappers[0] = left;
        this.substitutionWrappers[1] = right;
        return this;
      }
      setSecretRules(rules) {
        if (!(rules instanceof Array)) {
          rules = [rules];
        }
        const tmpRules = rules.map(function(rule) {
          const ruleType = typeof rule;
          if (ruleType === "string") {
            return {
              pattern: new RegExp(rule)
            };
          } else if (ruleType === "object") {
            if (rule instanceof RegExp) {
              rule = {
                pattern: rule
              };
            } else if (rule.hasOwnProperty("pattern") && typeof rule.pattern === "string") {
              rule.pattern = new RegExp(rule.pattern);
            }
            try {
              rule.pattern.test("");
              return rule;
            } catch (err) {
            }
          }
        });
        this.secretRules = tmpRules.filter(function(val) {
          return val;
        });
      }
      filterSecrets(body) {
        if (typeof body === "object" && !body.hasOwnProperty("content")) {
          return;
        }
        const self = this;
        body.content.forEach(function(data) {
          self.secretRules.forEach(function(rule) {
            if (rule.hasOwnProperty("pattern") && !rule.pattern.test(data.value)) {
              return;
            }
            let message = `The pattern '${rule.pattern}'`;
            if (rule.name) {
              message += `identified by '${rule.name}'`;
            }
            message += " was found in the Mail content!";
            throw new Error(message);
          });
        });
      }
      send(data, isMultiple = false, cb) {
        if (typeof isMultiple === "function") {
          cb = isMultiple;
          isMultiple = false;
        }
        if (Array.isArray(data)) {
          const promise = Promise.all(data.map((item) => {
            return this.send(item, isMultiple);
          }));
          if (cb) {
            promise.then((result) => cb(null, result)).catch((error) => cb(error, null));
          }
          return promise;
        }
        try {
          if (typeof data.isMultiple === "undefined") {
            data.isMultiple = isMultiple;
          }
          if (typeof data.substitutionWrappers === "undefined") {
            data.substitutionWrappers = this.substitutionWrappers;
          }
          const mail2 = Mail.create(data);
          const body = mail2.toJSON();
          this.filterSecrets(body);
          const request = {
            method: "POST",
            url: "/v3/mail/send",
            headers: mail2.headers,
            body
          };
          return this.client.request(request, cb);
        } catch (error) {
          if (cb) {
            cb(error, null);
          }
          return Promise.reject(error);
        }
      }
      sendMultiple(data, cb) {
        return this.send(data, true, cb);
      }
    };
    module2.exports = MailService;
  }
});

// node_modules/@sendgrid/mail/src/mail.js
var require_mail2 = __commonJS({
  "node_modules/@sendgrid/mail/src/mail.js"(exports, module2) {
    "use strict";
    var MailService = require_mail_service();
    module2.exports = new MailService();
  }
});

// node_modules/@sendgrid/mail/index.js
var require_mail3 = __commonJS({
  "node_modules/@sendgrid/mail/index.js"(exports, module2) {
    "use strict";
    var mailer = require_mail2();
    var MailService = require_mail_service();
    module2.exports = mailer;
    module2.exports.MailService = MailService;
  }
});

// netlify/functions/send-email.ts
__export(exports, {
  handler: () => handler
});
var import_mail = __toModule(require_mail3());
import_mail.default.setApiKey(process.env.SENDGRID_API_KEY);
var handler = async (event) => {
  const { from, subject, message } = JSON.parse(event.body);
  try {
    await import_mail.default.send({
      from: "George Fairbairn - Website Contact Form <inbox@georgefairbairn.dev>",
      to: "George Fairbairn <george.fair@icloud.com>",
      subject,
      text: `New message from ${from}: ${message}`
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent." })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending email." })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=send-email.js.map
