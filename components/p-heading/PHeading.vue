<script lang="ts">
import { defineComponent, h, toRefs, VNodeChild } from 'vue'

export default defineComponent({
	name: 'PHeading',
	props: {
		tag: {
			type: String,
			required: true,
			validator: (value: string) => {
				return ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
			}
		},
		hero: {
			type: Boolean,
			default: false
		}
	},
	setup (props, { slots }) {
		let { tag, hero } = toRefs(props)
		let children = slots.default ? slots.default() : []
		return (): VNodeChild => {
			return h(tag.value, {
				class: [
					`p-${tag.value}`,
					'p-heading',
					{ 'p-heading--hero': hero.value }
				]
			}, children)
		}
	}
})
</script>

<style lang="stylus">
.p-heading--hero
	color: var(--p-color-white-08)
	font-size: 68px
	font-weight: 500
	line-height: 0.7353
	text-transform: uppercase
</style>
