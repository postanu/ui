import type { ClientPage } from '@postanu/types'
import type { Ref } from 'vue'

import { NETWORKS } from '@postanu/types'
import { customRef } from 'vue'

function sort (pages: ClientPage[]): ClientPage[] {
	return pages.sort((a, b) => {
		return NETWORKS.indexOf(a.network) - NETWORKS.indexOf(b.network) ||
			a.name.localeCompare(b.name)
	})
}

/**
 * Prepares pages for showing as selectable and updatable list.
 * Sorts in special order.
 */
export function usePagesList (value: ClientPage[]): Ref<ClientPage[]> {
	let isFirstGet = true
	return customRef<ClientPage[]>((track, trigger) => {
		return {
			get (): ClientPage[] {
				track()
				if (isFirstGet) {
					isFirstGet = false
					return sort(value)
				}
				return value
			},
			set (newValue): void {
				value = sort(newValue)
				trigger()
			}
		}
	})
}
