<template lang="pug">
.p-queue-pages(:class="{ '--solo': isFullSolo }")
	template(v-if="singleNetwork") {{ singleNetwork }}
	template(v-else)
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
						:image="page.avatarUrl"
						:letter="page.name"
					)
				.p-queue-pages__counter(
					v-if="group.pages.length > MAX_VISIBLE_GROUP_SIZE"
				) +{{ group.pages.length - MAX_VISIBLE_GROUP_SIZE }}
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { NETWORKS_ABBR } from '@postanu/core'
import { baseMessages } from '@postanu/i18n'
import { useStore } from '@nanostores/vue'
import type { ClientPage } from '@postanu/types'

import { usePagesGroupList } from '../../../composables/usePagesGroupList.js'
import PAvatar from '../../p-avatar/PAvatar.vue'

const MAX_VISIBLE_GROUP_SIZE = 2

interface Props {
	pages: ClientPage[]
}

const props = defineProps<Props>()

const { pages } = toRefs(props)

const isFullSolo = computed(
	() => pages.value.every(page => page.isSolo)
)

const t = useStore(baseMessages)
const singleNetwork = computed<string | false>(() => {
	if (pages.value.length === 1) {
		// @ts-expect-error
		return t.value[NETWORKS_ABBR[pages.value[0].network]]
	}
	return false
})

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

.p-queue-pages__counter
	font-size: 12px
	line-height: 1
</style>
