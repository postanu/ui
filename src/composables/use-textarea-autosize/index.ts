import type { Ref } from 'vue'

import { nextTick, ref, watch } from 'vue'

interface UseTextareaAutosizeReturn {
	height: Ref<string>
}

export function useTextareaAutosize (
	text: Ref<string>,
	textareaRef: Ref<HTMLTextAreaElement | null>
): UseTextareaAutosizeReturn {
	let height = ref('1px')

	watch(
		[text, textareaRef],
		async () => {
			if (!textareaRef.value) {
				return
			}
			await nextTick()
			height.value = '1px'
			await nextTick()
			height.value = `${textareaRef.value.scrollHeight}px`
		},
		{ immediate: true }
	)

	return {
		height
	}
}
