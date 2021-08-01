import { customRef, Ref } from 'vue'
import type { PagesList } from '@postanu/types'

const ORDER = [
	'facebook',
	'instagram',
	'twitter',
	'vk'
]

function sort (pages: PagesList): PagesList {
	return pages.sort((a, b) => {
		return ORDER.indexOf(a.network) - ORDER.indexOf(b.network) ||
			a.name.localeCompare(b.name)
	})
}

function hideIcons (pages: PagesList): PagesList {
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

export function usePagesListRef (value: PagesList): Ref<PagesList> {
	let isFirstGet = true
	return customRef<PagesList>((track, trigger) => {
		return {
			get (): PagesList {
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
