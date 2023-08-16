import type { ComputedRef, Ref } from 'vue'

import { computed, unref } from 'vue'

/**
 * Cuts the text if its length exceeds 50 characters.
 * Cuts the last space and adds an ellipsis.
 */
export function useQueueItemTitle (title: Ref<string>): ComputedRef<string> {
	return computed(() => {
		let text = unref(title)

		if (text.length >= 50) {
			text = text.slice(0, 50)
			if (text.slice(-1) === ' ') {
				text = text.slice(0, -1)
			}
			return `${text}…`
		} else {
			return text
		}
	})
}
