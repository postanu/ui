import type { Ref } from 'vue'

import { computed } from 'vue'

export function usePostsScale (drafts: Ref<number>, posts: Ref<number>): Ref<{
	drafts: number
	posts: number
}> {
	return computed(() => {
		let totalDrafts = drafts.value
		let totalPosts = posts.value
		let scaleSize = 6

		if (totalDrafts === 0) {
			return {
				drafts: 0,
				posts: totalPosts > scaleSize ? scaleSize : totalPosts
			}
		} else if (totalDrafts + totalPosts <= scaleSize) {
			return {
				drafts: totalDrafts,
				posts: totalPosts
			}
		} else {
			let totalRatio = totalDrafts / (totalDrafts + totalPosts)
			let scaledDrafts = Math.min(totalDrafts, Math.floor(totalRatio * scaleSize))
			let scaledPosts = scaleSize - scaledDrafts

			return {
				drafts: scaledDrafts,
				posts: scaledPosts
			}
		}
	})
}
