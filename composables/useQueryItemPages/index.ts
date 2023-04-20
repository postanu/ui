import { computed } from 'vue'
import type { ClientPage, PagesGroup, Post } from '@postanu/types'
import type { ComputedRef, Ref } from 'vue'

import { usePagesGroupList } from '../usePagesGroupList/index.js'

/**
 * Collects pages from post variants and groups them by network type.
 */
export function useQueryItemPages (
	post: Ref<Post>,
	projectPages: Ref<ClientPage[]>
): ComputedRef<PagesGroup[]> {
	let pages = computed<ClientPage[]>(() => {
		let pagesIds = new Set(
			post.value.variants.flatMap(variant => {
				return variant.pagesIds
			})
		)
		return projectPages.value.filter(page => {
			return pagesIds.has(page.id)
		})
	})
	return usePagesGroupList(pages)
}
