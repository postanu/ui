<script lang="ts">
import { computed, defineComponent, h, toRefs } from 'vue'

import { icons } from './icons.js'

const iconsList = Object.keys(icons)

export default defineComponent({
	name: 'PIcon',
	props: {
		icon: {
			type: String,
			default: '',
			validator: (name: string): boolean => {
				return ['', ...iconsList].includes(name)
			}
		},
		label: { type: String, default: '' },
		scale: { type: Number, default: 1 },
		mixBlendMode: { type: String, default: '' }
	},
	setup (props, { slots }) {
		let {
			icon: name,
			label,
			scale,
			mixBlendMode
		} = toRefs(props)

		let icon = computed(() => icons[name.value])

		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		return () => {
			let defaultSlot = slots.default ? slots.default() : []

			let children = iconsList.includes(name.value)
				? h('path', icon.value.path)
				: defaultSlot

			if (mixBlendMode.value) {
				children = h('g', {
					style: [
						{
							mixBlendMode: mixBlendMode.value
						}
					]
				}, children)
			}

			return h('svg', {
				class: ['p-icon'],
				role: 'img',
				'aria-label': label.value || `${name.value} icon`,
				'aria-hidden': !label.value,
				viewBox: `0 0 ${icon.value.width} ${icon.value.height}`,
				width: `${icon.value.width * scale.value}px`,
				height: `${icon.value.height * scale.value}px`
			}, children)
		}
	}
})
</script>
