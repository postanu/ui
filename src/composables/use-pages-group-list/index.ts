import type { ClientPage, PagesGroup } from '@postanu/shared'
import type { ComputedRef, Ref } from 'vue'

import { NETWORKS } from '@postanu/shared'
import { computed } from 'vue'

/**
 * Groups pages by network, sorts them in special order and marks solo groups.
 */
export function usePagesGroupList (
	pages: Ref<ClientPage[]>
): ComputedRef<PagesGroup[]> {
	return computed(() => {
		// eslint-disable-next-line unicorn/no-array-reduce
		let grouped = pages.value.reduce<PagesGroup[]>((previous, current) => {
			let groupIndex = previous.findIndex(group => {
				return group.name === current.network
			})
			if (groupIndex === -1) groupIndex = previous.length
			previous[groupIndex] =
				previous[groupIndex] ||
				{
					name: current.network,
					pages: [],
					isSolo: false
				}
			if (current.isSolo) {
				previous[groupIndex].isSolo = true
			}
			previous[groupIndex].pages.push(current)
			return previous
		}, [])

		let sorted = grouped.sort((a, b) => {
			return NETWORKS.indexOf(a.name) - NETWORKS.indexOf(b.name)
		})

		return sorted
	})
}
