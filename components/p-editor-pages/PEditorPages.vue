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
						:hide-icon="hideIcon(page)"
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
						:hide-icon="hideIcon(page)"
						@click="selectPage(page, index)"
					)
						p-page(
							:icon="page.network"
							:avatar="page.avatarUrl"
							:fullname="page.name"
							:username="page.username"
						)
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
		}
	},
	setup (props) {
		let { pages: initPages } = toRefs(props)

		let selectedPages = usePagesListRef([])
		let selectablePages = usePagesListRef(unref(initPages))

		let isZeroPages = computed(() => initPages.value.length === 0)
		let showSelected = computed(() => selectedPages.value.length > 0)
		let showSelectable = computed(() => selectablePages.value.length > 0)
		let showSelectableNote = computed(() => selectedPages.value.length === 0)

		function selectPage (page: Page, index: number): void {
			selectablePages.value = unref(selectablePages).filter((p, i) => {
				return i !== index
			})
			selectedPages.value = [...unref(selectedPages), page]
		}

		function unselectPage (page: Page, index: number): void {
			selectedPages.value = unref(selectedPages).filter((p, i) => {
				return i !== index
			})
			selectablePages.value = [...unref(selectablePages), page]
		}

		// eslint-disable-next-line unicorn/consistent-function-scoping
		function hideIcon (page: Page): boolean {
			return page.meta?.hideIcon
		}

		return {
			selectedPages,
			selectablePages,
			isZeroPages,
			showSelected,
			showSelectable,
			showSelectableNote,
			hideIcon,
			selectPage,
			unselectPage
		}
	}
})
</script>

<style lang="stylus">
.p-editor-pages
	gap: 50px
	display: flex
	flex-direction: column

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
</style>
