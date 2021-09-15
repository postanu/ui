<template lang="pug">
.p-pages-table
	p-table-group(v-for="group in groupedPages")
		template(v-slot:name) {{ capitalizeFirstLetter(group.name) }}
		template(v-slot:content)
			ul
				li(v-for="page in group.pages")
					p-table-row.p-pages-table__item(
						:class="{ 'p-settings-pages__item--removing': isRemoving(page.id) }"
					)
						p-page.p-pages-table__page(
							:avatar="page.avatarUrl"
							:letter="page.name"
							:fullname="page.name"
							:username="page.username"
						)
						.p-pages-table__buttons
							p-button(
								v-if="updatable && !isRemoving(page.id) "
								type="text"
								@click="$emit('update', { id: page.id })"
								target
							) Update
							p-button-remove(
								v-if="removable"
								:ref="el => setRemovingRef(el, page.id)"
								@removing="setRemoving($event, page.id)"
								@remove="remove(page.id)"
							)
</template>

<script lang="ts">
import { computed, DeepReadonly, defineComponent, PropType, ref, toRefs } from 'vue'
import type { PagesList, GroupedPages } from '@postanu/types'

import { NETWORKS_ORDER } from '../../constants'
import PButtonRemove from '../p-button-remove/PButtonRemove.vue'
import PTableGroup from '../p-table-group/PTableGroup.vue'
import PTableRow from '../p-table-row/PTableRow.vue'
import PButton from '../p-button/PButton.vue'
import PPage from '../p-page/PPage.vue'

type ButtonRemoveRef = InstanceType<typeof PButtonRemove>

export default defineComponent({
	name: 'PPagesTable',
	components: {
		PButtonRemove,
		PTableGroup,
		PTableRow,
		PButton,
		PPage
	},
	props: {
		pages: {
			type: Array as PropType<DeepReadonly<PagesList>>,
			required: true
		},
		updatable: { type: Boolean, default: true },
		removable: { type: Boolean, default: true }
	},
	emits: ['update', 'remove'],
	setup (props, { emit }) {
		let { pages } = toRefs(props)
		let groupedPages = computed(() => {
			// eslint-disable-next-line unicorn/no-array-reduce
			let grouped = pages.value.reduce<GroupedPages>((previous, current) => {
				let groupIndex = previous.findIndex(group => group.name === current.network)
				if (groupIndex === -1) groupIndex = previous.length
				previous[groupIndex] = previous[groupIndex] || { name: current.network, pages: [] }
				previous[groupIndex].pages.push(current)
				return previous
			}, [])
			// sort by sortOrder
			let sorted = grouped.sort((a, b) => {
				return NETWORKS_ORDER.indexOf(a.name) - NETWORKS_ORDER.indexOf(b.name)
			})
			return sorted
		})

		function remove (id: string): void {
			emit('remove', { id })
		}

		let removingRef = ref<{ [pageId: string]: ButtonRemoveRef }>({})
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function setRemovingRef (element: ButtonRemoveRef | any, pageId: string): void {
			removingRef.value[pageId] = element
		}

		let removingIds = ref<Set<string>>(new Set())
		function setRemoving (value: boolean, pageId: string): void {
			if (value) {
				removingIds.value.forEach(id => {
					if (id !== pageId) {
						removingRef.value[id].cancel()
					}
				})
				removingIds.value = new Set([pageId])
			} else {
				removingIds.value.delete(pageId)
			}
		}

		function isRemoving (pageId: string): boolean {
			return removingIds.value.has(pageId)
		}

		return {
			capitalizeFirstLetter,
			setRemovingRef,
			groupedPages,
			removingIds,
			setRemoving,
			isRemoving,
			remove
		}
	}
})

function capitalizeFirstLetter (string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1)
}
</script>

<style lang="stylus">
.p-pages-table__item
	display: flex
	justify-content: space-between

.p-pages-table__buttons
	display: flex
	padding: 10px 0

.p-pages-table__item:hover,
.p-pages-table__item--removing
	.p-pages-table__buttons
		opacity: 1
		transition: opacity 0.05s ease-in

.p-pages-table__page
	padding: 15px 0

.p-pages-table__buttons
	opacity: 0
	margin-right: 20px
</style>
