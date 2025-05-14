# `@samual/types`
This package was split from `@samual/lib` to contain the types I regularly use.

[View the docs.](https://jsr.io/@samual/types/doc)

```ts
import type {
	AnyFunction, Async, Brand, Cloneable, Falsy, IntersectUnion, JsonValue, LaxPartial, NonFalsy, PickByValue, Rejecter,
	Replace, Resolver, Slice1, ValueOf
} from "@samual/types"

// AnyFunction
let functions: AnyFunction[] = []

// Resolver and Rejecter
let resolver: Resolver<number>
let rejecter: Rejecter

let promiseWithResolvers = Promise.withResolvers<number>()

resolver = promiseWithResolvers.resolve
rejecter = promiseWithResolvers.reject

// Async
function myAsyncWrapper<T extends AnyFunction>(toWrap: T): Async<T> {
	// ...
}

// JsonValue
let fooJson = JSON.stringify({ … } satisifes JsonValue)

let fooParsed = JSON.parse(fooJson) as JsonValue

// Cloneable
const clonedFoo = structuredClone(foo satisfies Cloneable)

worker.postMessage(foo satisfies Cloneable)

// LaxPartial
type FooOptions = {
	bar: number
	baz: string
}

export function foo(options: LaxPartial<FooOptions>) {
	// ...
}

// Slice1
type Foo = Slice1<[ 1, 2, 3 ]>
//   ^? type Foo = [ 2, 3 ]

// Falsy
type ConditionalFoo<T> = T extends Falsy ? DoOneThing : OtherwiseDoSomethingElse

// NonFalsy
type NonFalsyJsonValue = NonFalsy<JsonValue>

// IntersectUnion
type Foo = IntersectUnion<{ a: number } | { b: string }>
//   ^? type Foo = { a: number, b: string }

// ValueOf
type Foo = ValueOf<{ a: 1, b: 2, c: 3 }>
//   ^? type Foo = 1 | 2 | 3

type Bar = ValueOf<[ 1, 2, 3 ]>
//   ^? type Bar = 1 | 2 | 3

// PickByValue
type Foo = PickByValue<{ a: 1, b: "2", c: 3, d: "4" }, number>
//   ^? type Foo = { a: 1, c: 3 }

// Replace
type Foo = Replace<{ a: string, b: string }, { b: number }>
//   ^? type Foo = { a: string, b: number }

// Brand
type CheckedString = Brand<string, { readonly CheckedString: unique symbol }[`CheckedString`]>
// ^? type CheckedString = string & { [CheckedString]: true }
```
