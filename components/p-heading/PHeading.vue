<script lang="ts">
import { defineComponent, h, toRefs } from 'vue'
import type { PropType, VNodeChild } from 'vue'

import type { ALLOWED_TAGS } from './allowed-tags/index.js'

export default defineComponent({
	name: 'PHeading',
	props: {
		tag: {
			type: String as PropType<typeof ALLOWED_TAGS[number]>,
			required: true
		},
		hero: {
			type: Boolean,
			default: false
		},
		headline: {
			type: Boolean,
			default: false
		}
	},
	setup (props, { slots }) {
		let { tag, hero, headline } = toRefs(props)
		return (): VNodeChild => {
			let children = slots.default ? slots.default() : []
			return h(tag.value, {
				class: [
					`p-${tag.value}`,
					'p-heading',
					{ 'p-heading--hero': hero.value },
					{ 'p-heading--headline': headline.value }
				]
			}, children)
		}
	}
})
</script>

<style lang="sass">
.p-heading
	user-select: none

.p-heading--hero
	font-size: var(--p-hero-font-size)
	font-weight: var(--p-hero-font-weight)
	line-height: var(--p-hero-line-height)
	color: var(--p-color-white-08)
	text-transform: uppercase

.p-heading--headline
	font-size: var(--p-headline-font-size)
	font-weight: var(--p-headline-font-weight)
	line-height: var(--p-headline-line-height)
	color: var(--p-color-white-04)
	text-transform: uppercase
</style>
