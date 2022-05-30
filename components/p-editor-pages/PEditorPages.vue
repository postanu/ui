<template lang="pug">
.p-editor-pages
	.p-editor-pages__nopages(v-if="isZeroPages")
		p Connect at least one page <br>you want to publish the post to
		p-button(type="common") Connect
	template(v-else)
		.p-editor-pages__selected(v-if="showSelected")
			ul.p-editor-pages__list
				li(
					v-for="(page, index) in selectedPages"
					:key="page.id"
					:[networkAbbr(page.network)]="true"
				)
					p-button-page(
						:icon="true"
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
			ul.p-editor-pages__list
				li(
					v-for="(page, index) in selectablePages"
					:key="page.id"
					:[networkAbbr(page.network)]="true"
				)
					p-button-page(
						:icon="true"
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
			ul.p-editor-pages__list
				li(
					v-for="page in updatablePages"
					:key="page.id"
					:[networkAbbr(page.network)]="true"
				)
					p-button-page(
						:icon="true"
						@click="updatePage(page)"
					)
						p-page(
							:icon="page.network"
							:avatar="page.avatarUrl"
							:fullname="page.name"
							:username="page.username"
						)
		.p-editor-pages__connect
			p-button(
				icon="plus"
				@click="connectPage"
			)
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, unref } from 'vue'
import { NETWORKS_ABBR } from '@postanu/core'
import type { ClientPage, PageNetwork } from '@postanu/types'
import type { PropType } from 'vue'

import { usePagesList } from '../../composables/usePagesList'
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
			type: Array as PropType<ClientPage[]>,
			required: true
		},
		selected: {
			type: Array as PropType<ClientPage[]>,
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

		let selectedPages = usePagesList(unref(selected))
		let updatablePages = usePagesList(
			pages.value.filter(page => page.status === 200)
		)
		let selectablePages = usePagesList(
			pages.value.filter(page => page.status === 100)
		)

		let isZeroPages = computed(() => pages.value.length === 0)
		let showSelected = computed(() => selectedPages.value.length > 0)
		let showUpdatable = computed(() => updatablePages.value.length > 0)
		let showSelectable = computed(() => selectablePages.value.length > 0)
		let showSelectableNote = computed(() => selectedPages.value.length === 0)

		function selectPage (page: ClientPage, index: number): void {
			selectablePages.value = unref(selectablePages).filter((p, i) => {
				return i !== index
			})
			selectedPages.value = [...unref(selectedPages), page]
			emit('update:selected', unref(selectedPages))
		}

		function unselectPage (page: ClientPage, index: number): void {
			selectedPages.value = unref(selectedPages).filter((p, i) => {
				return i !== index
			})
			selectablePages.value = [...unref(selectablePages), page]
			emit('update:selected', unref(selectedPages))
		}

		let updatePage = (page: ClientPage): void => { emit('update', page) }
		let connectPage = (): void => { emit('connect') }

		// eslint-disable-next-line unicorn/consistent-function-scoping
		function networkAbbr (network: PageNetwork): string {
			return `data-${NETWORKS_ABBR[network]}`
		}

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
			updatePage,
			connectPage,
			networkAbbr
		}
	}
})
</script>

<style lang="stylus">
.p-editor-pages
	display: inline-flex
	flex-direction: column
	gap: 50px

	&:hover
		.p-editor-pages__connect .p-button
			opacity: 1
			transition: opacity 0.05s ease-in

// all but the first
.p-editor-pages__list > li[data-fb] ~ li[data-fb],
.p-editor-pages__list > li[data-ig] ~ li[data-ig],
.p-editor-pages__list > li[data-tw] ~ li[data-tw],
.p-editor-pages__list > li[data-vk] ~ li[data-vk]
	> .p-button-page:not(:hover):not(:focus)
		> .p-page > .p-icon
			opacity: 0

.p-editor-pages__heading
	padding-bottom: 10px
	padding-left: 40px

.p-editor-pages__note
	margin-bottom: 30px
	color: var(--p-color-white-04)

.p-editor-pages__nopages
	padding-left: 40px

	& > p
		margin-bottom: 30px

.p-editor-pages__caption
	padding: 10px 0
	font-size: var(--p-caption-font-size)
	font-weight: var(--p-caption-font-weight)
	line-height: var(--p-caption-line-height)
	color: var(--p-color-white-04)

.p-editor-pages__connect
	padding-bottom: 20px

	.p-button
		margin-top: -20px
		margin-left: 35px
		opacity: 0
		transition: opacity 0.1s ease-out 2s

		&:focus
			opacity: 1
</style>
