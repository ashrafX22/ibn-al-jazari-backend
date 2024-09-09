export function flattenObject(obj: Object): Object {
    let result = {}

    for (let [key, value] of Object.entries(obj)) {
        if (typeof (value) !== 'object' || value instanceof Date || !value)
            result = { ...result, [key]: value }
        else
            result = { ...result, ...flattenObject(value) };
    }

    return result;
}