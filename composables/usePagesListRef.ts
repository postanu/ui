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

function hideIcons (pages: Page[]): Page[] {
	let lastNetwork: string
	return pages.map(page => {
		if (page.meta?.hideIcon) {
			page.meta.hideIcon = false
		}
		if (lastNetwork === page.network) {
			page.meta = {
				hideIcon: true
			}
		}
		lastNetwork = page.network
		return page
	})
}

/**
 * Prepares pages for showing as selectable and updatable list.
 * Sorts pages in special order and hides the repeating network icon.
 */
export function usePagesListRef (value: Page[]): Ref<Page[]> {
	let isFirstGet = true
	return customRef<Page[]>((track, trigger) => {
		return {
			get (): Page[] {
				track()
				if (isFirstGet) {
					isFirstGet = false
					return hideIcons(sort(value))
				}
				return value
			},
			set (newValue): void {
				value = hideIcons(sort(newValue))
				trigger()
			}
		}
	})
}
