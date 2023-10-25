import type { MaybeRef, Ref } from 'vue'

import { customRef, getCurrentScope, onScopeDispose, ref, unref } from 'vue'

export interface CreateButtonRemoveManagerReturn {
	(buttonId: MaybeRef<string>): [
		Ref<boolean>,
		Ref<boolean>
	]
}

export function createButtonRemoveManager (): CreateButtonRemoveManagerReturn {
	let buttons = ref(new Map<string, Ref<boolean>>())

	return (buttonId: MaybeRef<string>) => {
		let visible = ref(false)
		let removing = customRef<boolean>((track, trigger) => {
			let removingProxy = false
			return {
				get: (): boolean => {
					track()
					return removingProxy
				},
				set: (value): void => {
					visible.value = value
					if (value) {
						// disable other buttons
						for (let [id, state] of buttons.value.entries()) {
							if (id !== unref(buttonId)) {
								state.value = false
							}
						}
						removingProxy = value
						trigger()
					} else {
						// change removing state after hiding
						setTimeout(() => {
							removingProxy = value
							trigger()
						}, 100)
					}
				}
			}
		})

		buttons.value.set(unref(buttonId), removing)

		getCurrentScope() && onScopeDispose(
			() => buttons.value.delete(unref(buttonId))
		)

		return [
			visible,
			removing
		]
	}
}
