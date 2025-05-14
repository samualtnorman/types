/**
 * # `@samual/types`
 * This package was split from `@samual/lib` to contain the types I regularly use.
 *
 * [View the docs.](https://jsr.io/@samual/types/doc)
 * @module
 */

/**
 * A better alternative to the `Function` type.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { AnyFunction } from "@samual/types"
 *
 * let functions: AnyFunction[] = []
 * ```
 */
export type AnyFunction = (...args: any[]) => unknown

/**
 * The type of a promise resolver function.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { Resolver, Rejecter } from "@samual/types"
 *
 * let resolver: Resolver<number>
 * let rejecter: Rejecter
 *
 * let promiseWithResolvers = Promise.withResolvers<number>()
 *
 * resolver = promiseWithResolvers.resolve
 * rejecter = promiseWithResolvers.reject
 * ```
 */
export type Resolver<T> = (value: T | PromiseLike<T>) => void

/**
 * The type of a promise rejecter function.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { Resolver, Rejecter } from "@samual/types"
 *
 * let resolver: Resolver<number>
 * let rejecter: Rejecter
 *
 * let promiseWithResolvers = Promise.withResolvers<number>()
 *
 * resolver = promiseWithResolvers.resolve
 * rejecter = promiseWithResolvers.reject
 * ```
 */
export type Rejecter = (reason?: unknown) => void

/**
 * Asyncify a function type if it's not already async.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { AnyFunction, Async } from "@samual/types"
 *
 * function myAsyncWrapper<T extends AnyFunction>(toWrap: T): Async<T> {
 * 	// ...
 * }
 * ```
 */
export type Async<T extends AnyFunction> = (...args: Parameters<T>) => Promise<ReturnType<T>>

/**
 * The types representable (survives a round trip) in JSON.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { JsonValue } from "@samual/types"
 *
 * let fooJson = JSON.stringify({ … } satisifes JsonValue)
 *
 * let fooParsed = JSON.parse(fooJson) as JsonValue
 * ```
 */
export type JsonValue = null | boolean | number | string | JsonValue[] | { [k: string]: JsonValue }

/**
 * Types that can be [`sturcturedClone()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)'d
 * and [sent to workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects).
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { Cloneable } from "@samual/types"
 *
 * const clonedFoo = structuredClone(foo satisfies Cloneable)
 *
 * worker.postMessage(foo satisfies Cloneable)
 * ```
 */
export type Cloneable = undefined | null | boolean | number | string | Cloneable[] | { [k: string]: Cloneable } |
	ArrayBuffer | DataView | Date | Error | Map<Cloneable, Cloneable> | RegExp | Set<Cloneable> | Uint8ClampedArray |
	Uint8Array | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array |
	Float32Array | Float64Array

/**
 * Like `Partial<>` but a bit more lax. Property values are allowed to be set to `undefined` as well as being optional.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { LaxPartial } from "@samual/types"
 *
 * type FooOptions = {
 * 	bar: number
 * 	baz: string
 * }
 *
 * export function foo(options: LaxPartial<FooOptions>) {
 * 	// ...
 * }
 * ```
 */
export type LaxPartial<T> = { [K in keyof T]?: T[K] | undefined }

/**
 * Slice off the first item of a tuple type.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { Slice1 } from "@samual/types"
 *
 * type Foo = Slice1<[ 1, 2, 3 ]>
 * //   ^? type Foo = [ 2, 3 ]
 * ```
 */
export type Slice1<T extends any[]> = T extends [ any, ...infer TRest ] ? TRest : never

/**
 * Falsy types.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { Falsy } from "@samual/types"
 *
 * type ConditionalFoo<T> = T extends Falsy ? DoOneThing : OtherwiseDoSomethingElse
 * ```
 */
export type Falsy = false | "" | 0 | 0n | null | undefined

/**
 * Removes Falsy types from a union.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { NonFalsy, JsonValue } from "@samual/types"
 *
 * type NonFalsyJsonValue = NonFalsy<JsonValue>
 * ```
 */
export type NonFalsy<T> = T extends Falsy ? never : T

/**
 * Intersect together all the members of a union.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { IntersectUnion } from "@samual/types"
 *
 * type Foo = IntersectUnion<{ a: number } | { b: string }>
 * //   ^? type Foo = { a: number, b: string }
 * ```
 */
export type IntersectUnion<T> = (T extends any ? (_: T) => void : never) extends ((_: infer I) => void) ? I : never

/**
 * Like `keyof` but for property values.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { ValueOf } from "@samual/types"
 *
 * type Foo = ValueOf<{ a: 1, b: 2, c: 3 }>
 * //   ^? type Foo = 1 | 2 | 3
 *
 * type Bar = ValueOf<[ 1, 2, 3 ]>
 * //   ^? type Bar = 1 | 2 | 3
 * ```
 */
export type ValueOf<T> = T[keyof T]

/**
 * Like `Pick<>` but by value instead of key.
 *
 * @example
 * Basic Usage
 * ```ts
 * import type { PickByValue } from "@samual/types"
 *
 * type Foo = PickByValue<{ a: 1, b: "2", c: 3, d: "4" }, number>
 * //   ^? type Foo = { a: 1, c: 3 }
 * ```
 */
export type PickByValue<T, U> = { [K in keyof T as T[K] extends U ? K : never]: T[K] }

/**
 * Somewhat similar to type intersection (`&`), but properties in the second type argument replace those in the first.
 *
 * @example
 * Basic Usage
 * ```ts
 * type Foo = Replace<{ a: string, b: string }, { b: number }>
 * //   ^? type Foo = { a: string, b: number }
 * ```
 */
export type Replace<A, B> = Omit<A, keyof B> & B

/**
 * Emulate nominal typing with uniquely branded types.
 *
 * @example
 * Basic Usage
 * ```ts
 * type CheckedString = Brand<string, { readonly CheckedString: unique symbol }[`CheckedString`]>
 * // ^? type CheckedString = string & { [CheckedString]: true }
 * ```
 */
export type Brand<T, TBrand extends symbol> = T & { [K in TBrand]: true }
