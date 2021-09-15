<script lang="ts">
import { defineComponent, h, toRefs } from 'vue'
import type { VNodeChild } from 'vue'

import { ALLOWED_TAGS } from './allowed-tags'

export default defineComponent({
	name: 'PHeading',
	props: {
		tag: {
			type: String,
			required: true,
			validator: (value: string) => {
				return ALLOWED_TAGS.includes(value)
			}
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

<style lang="stylus">
.p-heading
	user-select: none

.p-heading--hero
	color: var(--p-color-white-08)
	font-size: var(--p-hero-font-size)
	font-weight: var(--p-hero-font-weight)
	line-height: var(--p-hero-line-height)
	text-transform: uppercase

.p-heading--headline
	color: var(--p-color-white-04)
	font-size: var(--p-headline-font-size)
	font-weight: var(--p-headline-font-weight)
	line-height: var(--p-headline-line-height)
	text-transform: uppercase
</style>
