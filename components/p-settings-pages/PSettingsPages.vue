<template lang="pug">
.p-settings-pages
	p-table-group(v-for="group in groupedPages")
		template(v-slot:name) {{ group.name.toUpperCase() }}
		template(v-slot:content)
			ul
				li(v-for="page in group.pages")
					p-table-row.p-settings-pages__item(
						:class="{ 'p-settings-pages__item--removing': isRemoving(page.id) }"
					)
						p-page.p-settings-pages__page(
							:avatar="page.avatarUrl"
							:letter="page.name"
							:fullname="page.name"
							:username="page.username"
						)
						.p-settings-pages__buttons
							p-button(
								v-if="updatable && !isRemoving(page.id) "
								type="link"
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

import PButtonRemove from '../p-button-remove/PButtonRemove.vue'
import PTableGroup from '../p-table-group/PTableGroup.vue'
import PTableRow from '../p-table-row/PTableRow.vue'
import PButton from '../p-button/PButton.vue'
import PPage from '../p-page/PPage.vue'

const SORT_ORDER = [
	'facebook',
	'instagram',
	'twitter',
	'vk'
]

type ButtonRemoveRef = InstanceType<typeof PButtonRemove>

export default defineComponent({
	name: 'PSettingPages',
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
				return SORT_ORDER.indexOf(a.name) - SORT_ORDER.indexOf(b.name)
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
			setRemovingRef,
			groupedPages,
			removingIds,
			setRemoving,
			isRemoving,
			remove
		}
	}
})
</script>

<style lang="stylus">
.p-settings-pages
	//

.p-settings-pages__item
	display: flex
	justify-content: space-between

.p-settings-pages__buttons
	display: flex
	padding: 10px 0

.p-settings-pages__item:hover,
.p-settings-pages__item--removing
	.p-settings-pages__buttons
		opacity: 1
		transition: opacity 0.05s ease-in

.p-settings-pages__page
	padding: 15px 0

.p-settings-pages__buttons
	opacity: 0
	margin-right: 20px

.p-settings-pages__remove-q
	line-height: 30px
	padding-right: 30px
</style>
