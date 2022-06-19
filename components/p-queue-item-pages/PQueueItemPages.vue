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
				v-for="page in group.pages"
				:key="page.id"
			)
				p-avatar(
					:image="page.avatarUrl"
					:letter="page.name"
				)
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import type { ClientPage } from '@postanu/types'

import { usePagesGroupList } from '../../composables/usePagesGroupList'
import PAvatar from '../p-avatar/PAvatar.vue'

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

<style lang="stylus">
.p-queue-pages
	display: flex
	gap: 20px
	height: 100%

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
</style>
