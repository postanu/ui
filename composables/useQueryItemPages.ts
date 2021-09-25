import { computed } from 'vue'
import type { Page, PagesGroup, Post } from '@postanu/types'
import type { ComputedRef, Ref } from 'vue'

import { usePagesGroupList } from './usePagesGroupList'

/**
 * Collects pages from post variants and groups them by network type.
 */
export function useQueryItemPages (
	post: Ref<Post>,
	projectPages: Ref<Page[]>
): ComputedRef<PagesGroup[]> {
	let pages = computed<Page[]>(() => {
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
