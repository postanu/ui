import type { Ref } from 'vue'

import { computed } from 'vue'

export function usePostsScale (drafts: Ref<number>, posts: Ref<number>): Ref<{
	drafts: number
	posts: number
}>	 {
	return computed(() => {
		let total = drafts.value + posts.value
		let scaleSize = 6

		if (total <= scaleSize) {
			return {
				drafts: drafts.value,
				posts: posts.value
			}
		} else {
			let minScaleFactor = scaleSize / total

			let scaledDrafts = Math.max(1, Math.floor(drafts.value * minScaleFactor))
			let scaledPosts = Math.max(1, Math.floor(posts.value * minScaleFactor))

			let remainingSpace = scaleSize - (scaledDrafts + scaledPosts)
			if (remainingSpace > 0) {
				return drafts.value > posts.value
					? {
						drafts: scaledDrafts + remainingSpace,
						posts: scaledPosts
					}
					: {
						drafts: scaledDrafts,
						posts: scaledPosts + remainingSpace
					}
			}

			return {
				drafts: scaledDrafts,
				posts: scaledPosts
			}
		}
	})
}
