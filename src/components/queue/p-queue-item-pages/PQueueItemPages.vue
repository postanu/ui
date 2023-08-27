<template lang="pug">
.p-queue-pages(:class="{ '--solo': isFullSolo }")
	.p-queue-pages__group(
		v-for="group in pagesGroupList"
		:key="group.name"
	)
		.p-queue-pages__type
			component(:is="`p-icon-${group.name}`")
		template(v-if="!group.isSolo")
			.p-queue-pages__item(
				v-for="page in group.pages.slice(0, MAX_VISIBLE_GROUP_SIZE)"
				:key="page.id"
			)
				p-avatar(
					:image="page.avatar"
					:text="page.name"
				)
			.p-queue-pages__counter(
				v-if="group.pages.length > MAX_VISIBLE_GROUP_SIZE"
			) +{{ group.pages.length - MAX_VISIBLE_GROUP_SIZE }}
</template>

<script lang="ts" setup>
import type { ClientPage } from '@postanu/types'

import { computed, toRefs } from 'vue'

import { usePagesGroupList } from '../../../composables/index.js'
import PAvatar from '../../core/p-avatar/PAvatar.vue'

const MAX_VISIBLE_GROUP_SIZE = 2

interface Props {
	pages: ClientPage[]
}

const props = defineProps<Props>()

const { pages } = toRefs(props)

const isFullSolo = computed(
	() => pages.value.every(page => page.isSolo)
)

const pagesGroupList = usePagesGroupList(pages)
</script>

<style lang="sass">
.p-queue-pages
	display: flex
	gap: 20px

	&.--solo
		gap: 10px

.p-queue-pages__group
	display: flex
	gap: 10px

.p-queue-pages__type
	display: flex
	align-items: center

.p-queue-pages__item
	display: flex
	align-items: center

.p-queue-pages__counter
	font-size: 12px
	line-height: 1
</style>
