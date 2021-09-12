<script lang="ts">
import { defineComponent, h } from 'vue'
import type { VNodeChild } from 'vue'

export default defineComponent({
	name: 'PTableRow',
	setup (props, { slots }) {
		return (): VNodeChild => {
			let defaultSlot = slots.default ? slots.default() : []

			if (slots.common) {
				return h(
					'div',
					{
						class: ['p-table-row', '--has-common']
					},
					[
						h('div', defaultSlot),
						h('div', slots.common())
					]
				)
			}

			return h('div', { class: ['p-table-row'] }, defaultSlot)
		}
	}
})
</script>

<style lang="stylus">
.p-table-row
	position relative
	min-height 50px

	&.--has-common
		gap: 20px
		display: grid
		grid-template-columns: 420px 1fr

.p-table-row:before,
.p-table-row:after
	content ""
	left 0
	width 100%
	position absolute
	z-index -1

.p-table-row:before
	top -1px
	height 1px
	border-top 1px solid var(--p-color-white-01)

.p-table-row:after
	bottom 0
	border-bottom 1px solid var(--p-color-white-01)
</style>
