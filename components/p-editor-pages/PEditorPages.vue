<template lang="pug">
.p-editor-pages
	.p-editor-pages__nopages(v-if="isZeroPages")
		p Connect at least one page <br>you want to publish the post to
		p-button(type="common") Connect
	template(v-else)
		.p-editor-pages__selected(v-if="showSelected")
			ul
				li(v-for="(page, index) in selectedPages" :key="page.id")
					p-button-page(
						:icon="showPageIcon(page)"
						@click="unselectPage(page, index)"
					)
						p-page(
							:icon="page.network"
							:avatar="page.avatarUrl"
							:fullname="page.name"
							:username="page.username"
						)
		.p-editor-pages__selectable(v-if="showSelectable")
			.p-editor-pages__heading
				p.p-editor-pages__note(
					v-if="showSelectableNote"
				) Select the pages you want <br>to publish the post to:
				p-heading(
					v-else
					tag="h3"
					headline
				) Select
			ul
				li(v-for="(page, index) in selectablePages" :key="page.id")
					p-button-page(
						:icon="showPageIcon(page)"
						@click="selectPage(page, index)"
					)
						p-page(
							:icon="page.network"
							:avatar="page.avatarUrl"
							:fullname="page.name"
							:username="page.username"
						)
		.p-editor-pages__updatable(v-if="showUpdatable")
			.p-editor-pages__heading
				p-heading(
					tag="h3"
					headline
				) Update
				p.p-editor-pages__caption
					| Before you can publish to these pages,
					br
					| you need to update their connection.
			ul
				li(v-for="(page, index) in updatablePages" :key="page.id")
					p-button-page(
						:icon="showPageIcon(page)"
						@click="updatePage(page)"
					)
						p-page(
							:icon="page.network"
							:avatar="page.avatarUrl"
							:fullname="page.name"
							:username="page.username"
						)
		.p-editor-pages__connect
			p-button(icon="plus" @click="connectPage")
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, unref } from 'vue'
import type { Page, PagesList } from '@postanu/types'

import { usePagesListRef } from '../../composables/usePagesListRef'
import PButtonPage from '../p-button-page/PButtonPage.vue'
import PHeading from '../p-heading/PHeading.vue'
import PButton from '../p-button/PButton.vue'
import PPage from '../p-page/PPage.vue'

export default defineComponent({
	name: 'PEditorPages',
	components: {
		PPage,
		PButton,
		PHeading,
		PButtonPage
	},
	props: {
		pages: {
			type: Array as PropType<PagesList>,
			required: true
		},
		selected: {
			type: Array as PropType<PagesList>,
			default: () => []
		}
	},
	emits: [
		'update',
		'connect',
		'update:selected'
	],
	setup (props, { emit }) {
		let { pages, selected } = toRefs(props)

		let selectedPages = usePagesListRef(unref(selected))
		let updatablePages = usePagesListRef(
			pages.value.filter(page => page.status === 200)
		)
		let selectablePages = usePagesListRef(
			pages.value.filter(page => page.status === 100)
		)

		let isZeroPages = computed(() => pages.value.length === 0)
		let showSelected = computed(() => selectedPages.value.length > 0)
		let showUpdatable = computed(() => updatablePages.value.length > 0)
		let showSelectable = computed(() => selectablePages.value.length > 0)
		let showSelectableNote = computed(() => selectedPages.value.length === 0)

		function selectPage (page: Page, index: number): void {
			selectablePages.value = unref(selectablePages).filter((p, i) => {
				return i !== index
			})
			selectedPages.value = [...unref(selectedPages), page]
			emit('update:selected', unref(selectedPages))
		}

		function unselectPage (page: Page, index: number): void {
			selectedPages.value = unref(selectedPages).filter((p, i) => {
				return i !== index
			})
			selectablePages.value = [...unref(selectablePages), page]
			emit('update:selected', unref(selectedPages))
		}

		// eslint-disable-next-line unicorn/consistent-function-scoping
		function showPageIcon (page: Page): boolean {
			return !page.meta?.hideIcon
		}

		let updatePage = (page: Page): void => { emit('update', page) }
		let connectPage = (): void => { emit('connect') }

		return {
			selectedPages,
			updatablePages,
			selectablePages,
			isZeroPages,
			showSelected,
			showUpdatable,
			showSelectable,
			showSelectableNote,
			selectPage,
			unselectPage,
			showPageIcon,
			updatePage,
			connectPage
		}
	}
})
</script>

<style lang="stylus">
.p-editor-pages
	gap: 50px
	display: inline-flex
	flex-direction: column

	&:hover
		.p-editor-pages__connect .p-button
			opacity: 1
			transition: opacity 0.05s ease-in

.p-editor-pages__heading
	padding-left: 40px
	padding-bottom: 10px

.p-editor-pages__note
	color: var(--p-color-white-04)
	margin-bottom: 30px

.p-editor-pages__nopages
	padding-left: 40px

	& > p
		margin-bottom: 30px

.p-editor-pages__caption
	color: var(--p-color-white-04)
	padding: 10px 0
	font-size: var(--p-caption-font-size)
	font-weight: var(--p-caption-font-weight)
	line-height: var(--p-caption-line-height)

.p-editor-pages__connect
	padding-bottom: 20px

	.p-button
		opacity: 0
		margin-top: -20px
		margin-left: 35px
		transition: opacity 0.1s ease-out 2s

		&:focus
			opacity: 1
</style>
