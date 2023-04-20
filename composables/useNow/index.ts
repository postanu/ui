import { getCurrentScope, onScopeDispose, ref } from 'vue'
import type { Ref } from 'vue'

export function useNow (): Ref<Date> {
	let active = true

	let now = ref(new Date())
	let update = (): void => {
		now.value = new Date()
	}

	function loop (): void {
		if (!active) return
		update()
		window.requestAnimationFrame(loop)
	}

	loop()

	if (getCurrentScope()) {
		onScopeDispose(() => {
			active = false
		})
	}

	return now
}
