<script lang="ts">
import { computed, defineComponent, h, toRefs } from 'vue'
import type { VNodeChild } from 'vue'

import { icons } from '../../icons/index.js'

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

		return (): VNodeChild => {
			let defaultSlot = slots.default ? slots.default() : []

			let children
			if (iconsList.includes(name.value)) {
				let { path } = icon.value
				children = Array.isArray(path)
					? path.map(pathProps => h('path', pathProps))
					: h('path', path)
			} else {
				children = defaultSlot
			}

			if (mixBlendMode.value) {
				children = h('g', {
					style: [
						{
							mixBlendMode: mixBlendMode.value
						}
					]
				}, children)
			}

			let title = label.value || `${name.value} icon`

			return h('svg', {
				class: ['p-icon'],
				role: 'img',
				viewBox: `0 0 ${icon.value.width} ${icon.value.height}`,
				width: `${icon.value.width * scale.value}px`,
				height: `${icon.value.height * scale.value}px`
			}, [
				h('title', title),
				children
			])
		}
	}
})
</script>
