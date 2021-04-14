const validate = (type: any, value: any): boolean => {
    if (type === null) return value === null;

    if (type === undefined) return value === undefined;

    if (typeof value === "undefined") return false;

    if (Array.isArray(type)) {
        if (!Array.isArray(value) && type.length <= 1) return false;

        if (type.length > 1) {
            return type.some((t) => validate(t, value));
        }

        if (value.length < 1) return true;

        return validate(type[0], value[0]);
    }

    if (typeof type === "function") {
        return value instanceof type || value.constructor === type;
    }

    if (typeof type === "object") {
        for (const key of Reflect.ownKeys(type)) {
            if (!(key in value)) return false;

            if (!validate(type[key], value[key])) return false;
        }
    }

    return typeof type === typeof value;
};

export default validate;
