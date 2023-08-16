<template lang="pug">
.p-pages-table
	p-table-group(
		v-for="group in groupedPages"
		:key="group.name"
	)
		template(#name) {{ capitalizeFirstLetter(group.name) }}
		template(#content)
			ul
				li(
					v-for="page in group.pages"
					:key="page.id"
				)
					p-table-row.p-pages-table__item(
						:class="{ 'p-settings-pages__item--removing': isRemoving(page.id) }"
					)
						p-page.p-pages-table__page(
							:avatar="page.avatar"
							:fullname="page.name"
							:username="page.username"
						)
						.p-pages-table__buttons
							p-button-text(
								v-if="updatable && !isRemoving(page.id) "
								variant="target"
								@click="$emit('update', { id: page.id })"
							) Update
							p-button-remove(
								v-if="removable"
								:ref="el => setRemovingRef(el, page.id)"
								@removing="setRemoving($event, page.id)"
								@remove="remove(page.id)"
							)
</template>

<script lang="ts" setup>
import type { ClientPage } from '@postanu/types'

import { ref, toRefs } from 'vue'

import { usePagesGroupList } from '../../../composables/index.js'
import PButtonRemove from '../buttons/p-button-remove/PButtonRemove.vue'
import PButtonText from '../buttons/p-button-text/PButtonText.vue'
import PPage from '../p-page/PPage.vue'
import PTableGroup from '../table/p-table-group/PTableGroup.vue'
import PTableRow from '../table/p-table-row/PTableRow.vue'

type ButtonRemoveRef = InstanceType<typeof PButtonRemove>

interface Props {
	pages: ClientPage[]
	updatable?: boolean
	removable?: boolean
}

interface Emits {
	(event: 'update', data: { id: string }): void
	(event: 'remove', data: { id: string }): void
}

const props = withDefaults(
	defineProps<Props>(),
	{
		updatable: true,
		removable: true
	}
)

const emit = defineEmits<Emits>()

const { pages } = toRefs(props)
const groupedPages = usePagesGroupList(pages)

function remove (id: string): void {
	emit('remove', { id })
}

const removingRef = ref<{ [pageId: string]: ButtonRemoveRef }>({})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setRemovingRef (element: ButtonRemoveRef | any, pageId: string): void {
	removingRef.value[pageId] = element
}

const removingIds = ref<Set<string>>(new Set())
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

function capitalizeFirstLetter (string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1)
}
</script>

<style lang="sass">
.p-pages-table__item
	display: flex
	justify-content: space-between

.p-pages-table__buttons
	display: flex
	padding: 10px 0
	opacity: 0

.p-pages-table__item:hover,
.p-pages-table__item--removing
	.p-pages-table__buttons
		opacity: 1
		transition: opacity 0.05s ease-in

.p-pages-table__page
	padding: 15px 0

@media (width < 720px)
	.p-pages-table__buttons
		position: absolute
		top: 1px
		right: 0
		bottom: 1px
		padding-left: 50px
		background: linear-gradient(to right, rgb(0 0 0 / 0%), black 20%)
</style>
