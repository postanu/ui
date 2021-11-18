import type { Ref } from 'vue'

export function extendRef<R extends Ref, Extend extends object> (
	ref: R,
	extend: Extend
): R & Extend {
	Object.entries(extend).forEach(([key, value]) => {
		Object.defineProperty(ref, key, { value, enumerable: true })
	})

	// @ts-ignore
	return ref
}
