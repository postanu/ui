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
		width: { type: Number, default: 20 },
		height: { type: Number, default: 20 },
		mixBlendMode: { type: String, default: '' }
	},
	setup (props, { slots }) {
		let {
			icon: name,
			label,
			width,
			height,
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
				viewBox: `0 0 ${icon.value.width || width.value} ${icon.value.height || height.value}`,
				width: icon.value.width || width.value,
				height: icon.value.height || height.value
			}, children)
		}
	}
})
</script>
