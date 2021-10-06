import { customRef } from 'vue'
import type { Page } from '@postanu/types'
import type { Ref } from 'vue'

import { NETWORKS_ORDER as ORDER } from '../constants'

function sort (pages: Page[]): Page[] {
	return pages.sort((a, b) => {
		return ORDER.indexOf(a.network) - ORDER.indexOf(b.network) ||
			a.name.localeCompare(b.name)
	})
}

/**
 * Prepares pages for showing as selectable and updatable list.
 * Sorts in special order.
 */
export function usePagesList (value: Page[]): Ref<Page[]> {
	let isFirstGet = true
	return customRef<Page[]>((track, trigger) => {
		return {
			get (): Page[] {
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
