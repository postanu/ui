<template lang="pug">
.p-editor-page-list
	.p-editor-page-list__nopages(v-if="isZeroPages")
		p Connect at least one page <br>you want to publish the post to
		p-button-common(@click="connectPage") Connect
	template(v-else)
		.p-editor-page-list__selected(v-if="showSelected")
			ul.p-editor-page-list__list
				li(
					v-for="(page, index) in selectedPages"
					:key="page.id"
					:[networkAbbr(page.network)]="true"
				)
					p-editor-page.p-editor-page-list__page(
						:network="page.network"
						:avatar="page.avatar"
						:fullname="page.name"
						:username="page.username"
						:show-icon="true"
						@click="unselectPage(page, index)"
					)
		.p-editor-page-list__selectable(v-if="showSelectable")
			.p-editor-page-list__heading
				p.p-editor-page-list__note(
					v-if="showSelectableNote"
				) Select the pages you want <br>to publish the post to:
				p-headline(
					v-else
					tag="h3"
				) Select
			ul.p-editor-page-list__list
				li(
					v-for="(page, index) in selectablePages"
					:key="page.id"
					:[networkAbbr(page.network)]="true"
				)
					p-editor-page.p-editor-page-list__page(
						:network="page.network"
						:avatar="page.avatar"
						:fullname="page.name"
						:username="page.username"
						:show-icon="true"
						@click="selectPage(page, index)"
					)
		.p-editor-page-list__updatable(v-if="showUpdatable")
			.p-editor-page-list__heading
				p-headline(tag="h3") Update
				p.p-editor-page-list__caption
					| Before you can publish to these pages,
					br
					| you need to update their connection.
			ul.p-editor-page-list__list
				li(
					v-for="page in updatablePages"
					:key="page.id"
					:[networkAbbr(page.network)]="true"
				)
					p-editor-page.p-editor-page-list__page(
						:network="page.network"
						:avatar="page.avatar"
						:fullname="page.name"
						:username="page.username"
						:show-icon="true"
						@click="updatePage(page)"
					)
		.p-editor-page-list__connect
			p-button-icon.p-editor-page-list__connect-button(@click="connectPage")
				p-icon-plus
</template>

<script lang="ts" setup>
import type { ClientPage, PageNetwork } from '@postanu/shared'

import { computed, toRefs, unref } from 'vue'

import { usePagesList } from '../../../composables/index.js'
import PButtonCommon from '../../core/buttons/p-button-common/PButtonCommon.vue'
import PButtonIcon from '../../core/buttons/p-button-icon/PButtonIcon.vue'
import PIconPlus from '../../core/icons/p-icon-plus/PIconPlus.vue'
import PHeadline from '../../core/typography/p-headline/PHeadline.vue'
import PEditorPage from '../p-editor-page/PEditorPage.vue'

interface Props {
	pages: ClientPage[]
	selected?: ClientPage[]
}

interface Emits {
	(event: 'update', page: ClientPage): void
	(event: 'connect'): void
	(event: 'update:selected', pageList: ClientPage[]): void
}

const props = withDefaults(
	defineProps<Props>(),
	{
		selected: () => []
	}
)

const emit = defineEmits<Emits>()

const { pages, selected } = toRefs(props)

const selectedPages = usePagesList(unref(selected))
const updatablePages = usePagesList(
	pages.value.filter(page => page.status === 200)
)
const selectablePages = usePagesList(
	pages.value.filter(page => page.status === 100)
)

const isZeroPages = computed(() => pages.value.length === 0)
const showSelected = computed(() => selectedPages.value.length > 0)
const showUpdatable = computed(() => updatablePages.value.length > 0)
const showSelectable = computed(() => selectablePages.value.length > 0)
const showSelectableNote = computed(() => selectedPages.value.length === 0)

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
	return `data-${network}`
}
</script>

<style lang="sass">
.p-editor-page-list
	display: inline-flex
	flex-direction: column
	gap: 50px

	&:hover
		.p-editor-page-list__connect .p-button
			opacity: 1
			transition: opacity 0.05s ease-in

// all but the first
.p-editor-page-list__list > li[data-facebook] ~ li[data-facebook],
.p-editor-page-list__list > li[data-instagram] ~ li[data-instagram],
.p-editor-page-list__list > li[data-threads] ~ li[data-threads],
.p-editor-page-list__list > li[data-twitter] ~ li[data-twitter],
.p-editor-page-list__list > li[data-telegram] ~ li[data-telegram],
.p-editor-page-list__list > li[data-linkedin] ~ li[data-linkedin],
.p-editor-page-list__list > li[data-pinterest] ~ li[data-pinterest],
.p-editor-page-list__list > li[data-youtube] ~ li[data-youtube],
.p-editor-page-list__list > li[data-vk] ~ li[data-vk]
	> .p-editor-page-list__page:not(:hover, :focus)
		--p-editor-page-show-icon: 0

.p-editor-page-list__heading
	padding-bottom: 10px
	padding-left: 40px

.p-editor-page-list__note
	margin-bottom: 30px
	color: var(--p-color-white-04)

.p-editor-page-list__nopages
	padding-left: 40px

	& > p
		margin-bottom: 30px

.p-editor-page-list__caption
	padding: 10px 0
	font-size: var(--p-caption-font-size)
	font-weight: var(--p-caption-font-weight)
	line-height: var(--p-caption-line-height)
	color: var(--p-color-white-04)

.p-editor-page-list__connect
	padding-bottom: 20px

.p-editor-page-list__connect-button
	--p-button-content-padding: 5px

	margin-top: -20px
	margin-left: 35px
	opacity: 0
	transition: opacity 0.1s ease-out 2s

	&:focus
		opacity: 1
</style>
