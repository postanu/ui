<template lang="pug">
.p-queue-pages(:class="{ '--solo': isFullSolo }")
	.p-queue-pages__group(v-for="group in pagesGroupList" :key="group.name")
		.p-queue-pages__type
			p-icon(:icon="group.name")
		.p-queue-pages__item(
			v-if="!group.isSolo"
			v-for="page in group.pages"
			:key="page.id"
		)
			p-avatar(:image="page.avatarUrl" :letter="page.name")
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { Page } from '@postanu/types'

import { usePagesGroupList } from '../../composables/usePagesGroupList'
import PAvatar from '../p-avatar/PAvatar.vue'
import PIcon from '../p-icon/PIcon.vue'

export default defineComponent({
	name: 'PQueuePages',
	components: {
		PIcon,
		PAvatar
	},
	props: {
		pages: {
			type: Array as PropType<Page[]>,
			required: true
		}
	},
	setup (props) {
		let { pages } = toRefs(props)

		let isFullSolo = computed(
			() => pages.value.every(page => page.isSolo)
		)

		let pagesGroupList = usePagesGroupList(pages)

		return {
			isFullSolo,
			pagesGroupList
		}
	}
})
</script>

<style lang="stylus">
.p-queue-pages
	height: 100%
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
</style>
