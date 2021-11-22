import { NETWORKS_ORDER } from '@postanu/core'
import { computed } from 'vue'
import type { ClientPage, PagesGroup, Refable } from '@postanu/types'
import type { ComputedRef } from 'vue'

/**
 * Groups pages by network, sorts them in special order and marks solo groups.
 */
export function usePagesGroupList (
	pages: Refable<ClientPage[]>
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
			return NETWORKS_ORDER.indexOf(a.name) - NETWORKS_ORDER.indexOf(b.name)
		})

		return sorted
	})
}
