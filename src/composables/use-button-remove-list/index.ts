import { ref } from 'vue'

import type PButtonRemove from '../../components/core/buttons/p-button-remove/PButtonRemove.vue'

type ButtonRemoveRef = InstanceType<typeof PButtonRemove>

export function useButtonRemoveList (): [
	(id: string, element: ButtonRemoveRef) => void,
	(id: string, value: boolean) => void,
	(id: string) => boolean
] {
	let removingRef = ref<{ [id: string]: ButtonRemoveRef }>({})
	let removingList = ref<Set<string>>(new Set())

	function setRemovingRef (id: string, element: ButtonRemoveRef): void {
		removingRef.value[id] = element
	}

	function setRemoving (id: string, value: boolean): void {
		if (value) {
			removingList.value.forEach(removingId => {
				if (removingId !== id) {
					removingRef.value[removingId].cancel()
				}
			})
			removingList.value = new Set([id])
		} else {
			removingList.value.delete(id)
		}
	}

	function isRemoving (id: string): boolean {
		return removingList.value.has(id)
	}

	return [
		setRemovingRef,
		setRemoving,
		isRemoving
	]
}
