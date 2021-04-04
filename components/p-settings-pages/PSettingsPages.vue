<template lang="pug">
.p-settings-pages
	p-table-group(v-for="group in groupedPages")
		template(v-slot:name) {{ group.name }}
		template(v-slot:content)
			ul
				li(v-for="page in group.pages")
					p-table-row.p-settings-pages__item
						p-page.p-settings-pages__page(
							:avatar="page.avatar_url"
							:letter="page.name"
							:fullname="page.name"
							:username="page.username"
						)
						p-button.p-settings-pages__remove(
							v-if="removable"
							type="link"
							danger
						) Remove
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { GroupedPages, PagesList } from '@postanu/types'

import PTableGroup from '../p-table-group/PTableGroup.vue'
import PTableRow from '../p-table-row/PTableRow.vue'
import PButton from '../p-button/PButton.vue'
import PPage from '../p-page/PPage.vue'

export default defineComponent({
	name: 'PSettingPages',
	components: {
		PTableGroup,
		PTableRow,
		PButton,
		PPage
	},
	props: {
		pages: {
			type: Array as PropType<PagesList>,
			required: true
		},
		removable: {
			type: Boolean,
			default: true
		}
	},
	setup (props) {
		let { pages } = toRefs(props)
		let groupedPages = computed(() => {
			// eslint-disable-next-line unicorn/no-array-reduce
			return pages.value.reduce<GroupedPages>((previous, current) => {
				let groupIndex = previous.findIndex(group => group.name === current.type)
				if (groupIndex === -1) groupIndex = previous.length
				previous[groupIndex] = previous[groupIndex] || { name: current.type, pages: [] }
				previous[groupIndex].pages.push(current)
				return previous
			}, [])
		})
		return { groupedPages }
	}
})
</script>

<style lang="stylus">
.p-settings-pages
	//

.p-settings-pages__item
	display: flex
	justify-content: space-between

.p-settings-pages__item:hover
	.p-settings-pages__remove
		opacity: 1

.p-settings-pages__page
	padding: 15px 0

.p-settings-pages__remove
	opacity: 0
	transition: opacity 0.05s ease-in
</style>
