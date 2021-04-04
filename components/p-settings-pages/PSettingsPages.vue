<template lang="pug">
.p-settings-pages
	p-table-group(v-for="group in groupedPages")
		template(v-slot:name) {{ group.name }}
		template(v-slot:content)
			ul
				li(v-for="page in group.pages")
					p-table-row
						p-page-list-item.p-settings-pages__item(
							:avatar="page.avatar_url"
							:letter="page.name"
							:fullname="page.name"
							:username="page.username"
						)
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { GroupedPages, PagesList } from '@postanu/types'

import PPageListItem from '../p-page-list-item/PPageListItem.vue'
import PTableGroup from '../p-table-group/PTableGroup.vue'
import PTableRow from '../p-table-row/PTableRow.vue'

export default defineComponent({
	name: 'PSettingPages',
	components: {
		PPageListItem,
		PTableGroup,
		PTableRow
	},
	props: {
		pages: {
			type: Array as PropType<PagesList>,
			required: true
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
	padding: 15px 0
</style>
