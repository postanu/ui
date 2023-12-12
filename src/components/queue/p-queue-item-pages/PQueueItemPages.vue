<template lang="pug">
.p-queue-pages(:class="{ '--solo': isSolo }")
	.p-queue-pages__group(
		v-for="group in groupsList"
		:key="group.network"
	)
		.p-queue-pages__type
			p-icon-network(:network="group.network")
		template(v-if="group.pages.length !== 1 && showPages")
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
import type { PagesGroup } from '@postanu/shared'

import { computed, toRefs } from 'vue'

import { PAvatar, PIconNetwork } from '../../core/index.js'

const MAX_VISIBLE_GROUP_SIZE = 2

interface Props {
	groupsList: PagesGroup[]
}

const props = defineProps<Props>()
const { groupsList } = toRefs(props)

// show only 4 long groups
const showPages = computed(() => {
	let longGroups = groupsList.value.filter(group => group.pages.length > 1)
	return longGroups.length <= 4
})
const isSolo = computed(
	() => groupsList.value.every(
		group => group.pages.length === 1
	) || !showPages.value
)
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
