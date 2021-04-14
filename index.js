"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var validate = function (type, value) {
    var e_1, _a;
    if (type === null)
        return value === null;
    if (type === undefined)
        return value === undefined;
    if (typeof value === "undefined")
        return false;
    if (Array.isArray(type)) {
        if (!Array.isArray(value) && type.length <= 1)
            return false;
        if (type.length > 1) {
            return type.some(function (t) { return validate(t, value); });
        }
        if (value.length < 1)
            return true;
        return validate(type[0], value[0]);
    }
    if (typeof type === "function") {
        return value instanceof type || value.constructor === type;
    }
    if (typeof type === "object") {
        try {
            for (var _b = __values(Reflect.ownKeys(type)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!(key in value))
                    return false;
                if (!validate(type[key], value[key]))
                    return false;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return typeof type === typeof value;
};
exports.default = validate;
