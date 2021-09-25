import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { Attachment } from '@postanu/types'

export function useQueueItemDescription (
	attachments: Ref<Attachment[]>
): ComputedRef<string> {
	return computed(() => {
		let text: string[] = []

		// eslint-disable-next-line unicorn/no-array-reduce, unicorn/prefer-object-from-entries
		let items = attachments.value.reduce<{
			[key: string]: Attachment[] | undefined
		}>(
			(previous, current) => {
				let group = previous[current.type] || (previous[current.type] = [])
				group.push(current)
				return previous
			},
			{}
		)

		let images = items.image?.length
		if (images) {
			text.push(images === 1 ? 'Image' : `${images} images`)
		}

		if (text.length === 1) {
			return text[0]
		}

		return text.join(', ')
	})
}
