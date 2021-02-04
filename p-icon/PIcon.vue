<script>
import { defineComponent, h, toRefs } from 'vue'

import icons from './icons.js'

const iconsList = Object.keys(icons)

export default defineComponent({
	name: 'PIcon',
	props: {
		icon: {
			type: String,
			default: '',
			validator: (name) => {
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

		let children
		let icon = icons[name.value]

		if (iconsList.includes(name.value)) {
			children = h('path', icon.path)
		} else {
			children = slots.default()
		}

		if (mixBlendMode.value) {
			children = () => h('g', {
				style: {
					mixBlendMode: mixBlendMode.value
				}
			}, children)
		}

		return () => h('svg', {
			class: 'icon',
			role: 'img',
			'aria-label': label.value || `${name.value} icon`,
			'aria-hidden': !label.value,
			viewBox: `0 0 ${icon.width || width.value} ${icon.height || height.value}`,
			width: icon.width || width.value,
			height: icon.height || height.value
		}, children)
	}
})
</script>
