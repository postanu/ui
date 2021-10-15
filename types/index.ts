import type { ComputedRef, DeepReadonly, Ref } from 'vue'

export type Refable<T> = Ref<T> | ComputedRef<T>

export type MaybeRef<T> = T | Refable<T>

export type MaybeReadonly<T> = T | DeepReadonly<T>
