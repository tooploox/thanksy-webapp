export { bindBem } from "./bem"

const NArray = (length: number) => Array.apply(null, { length }).map(Number.call, Number)
export const mapRepeat: <T>(length: number, cb: (index: number) => T) => T[] = (length, cb) => NArray(length).map(cb)
export const repeat = (length: number, cb: (index: number) => void) => NArray(length).forEach(cb) as void
export const isFunction = (f: any): f is Function => "function" === typeof f
export const isArray = <T>(ts: T[] | any): ts is T[] => ts && typeof ts === "object" && ts.constructor.name === "Array"
export const isValid = (pred: boolean | (() => boolean)) => (isFunction(pred) ? pred() : pred)
export const toByte = (value: number, min: number, max: number) => toMinMax(value, min, max)
export const toMinMax = (value: number, min: number, max: number) => (value < min ? min : value > max ? max : value)

export const filterMap = <T>(vs: SMap<T>, cond: (key: string) => boolean): SMap<T> =>
    remap(vs, (_, key) => key, (v, key) => (cond(key) ? v : null), true) as any

export const remap = <T, S = any>(
    vs: SMap<T>,
    getKey: (t: T, key: string, index: number) => string,
    getValue: (t: T, key: string) => S,
    skipNullValue = false
): SMap<S> => {
    const res: SMap<S> = {}
    Object.keys(vs).forEach((k, index) => {
        const value = getValue(vs[k], k)
        if (!skipNullValue || value !== null) res[getKey(vs[k], k, index)] = value
    })
    return res
}

export const toArray = <T, T2>(map: SMap<T>, toValue: (t: T, key: keyof T, index: number) => T2) => {
    const result: T2[] = []
    Object.keys(map || {}).forEach((field, index) => result.push(toValue(map[field], field as keyof T, index)))
    return result
}

export function toDictonary<T, K = T>(
    vs: T[],
    getKey: (v: T) => string,
    getValue: (v: T, index?: number) => K = v => (v as any) as K
) {
    const dictonary: SMap<K> = {}
    if (isArray(vs) && isFunction(getKey) && isFunction(getValue))
        vs.forEach((v, index) => (dictonary[getKey(v)] = getValue(v, index)))
    return dictonary
}

export const areEqual = <T>(a1: T[], a2: T[], compare: (a: T, b: T) => boolean = (a, b) => a === b) =>
    a1.length === a2.length && a1.every((v, i) => compare(v, a2[i]))

export const joinArrays = <T>(arr1: T[], arr2: T[], compare: (a: T, b: T) => boolean): T[] => {
    const res: T[] = [...arr1]
    arr2.forEach(a2 => {
        if (!arr1.find(a1 => compare(a1, a2))) res.push(a2)
    })
    return res
}

export function call(f?: () => void): void
export function call<T>(f?: (arg: T) => void, arg?: T): void
export function call(f?: any | null, arg?: any): void {
    if (isFunction(f)) f(arg)
}

export const iterateObject = <T>(o: T, cb: (key: keyof T, value: any) => void) =>
    Object.keys(o || {}).forEach(field => cb(field as keyof T, o[field as keyof T]))

export const isMobile = (ua?: string) =>
    [/Android/i, /webOS/i, /iPhone/i, /iPad/i].find(r => (ua || navigator.userAgent).match(r) !== null) !== undefined

export const flatten = <T>(ts: any[], depth = 2): T[] =>
    ts.reduce((acc, ts2) => acc.concat(Array.isArray(ts2) && depth - 1 ? flatten(ts2, depth - 1) : ts2), [])

export const getter = <T, T2 extends keyof T>(obj: T, field: T2): T[T2] | null => (obj ? obj[field] : null)
export const pad = (n: number, width: number, z = "0") =>
    n.toString().length >= width ? n : new Array(width - n.toString().length + 1).join(z) + n
