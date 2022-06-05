<template lang="pug">
svg(
	class="p-icon"
	v-bind="attrs"
)
	title(v-if="title && !isDecorative") {{ title }}
	template(v-if="Array.isArray(iconData.path)")
		path(
			v-for="(path, i) in iconData.path"
			:key="i"
			v-bind="path"
		)
	path(
		v-else
		v-bind="iconData.path"
	)

</template>

<script lang="ts" setup>
import { computed, reactive, toRefs } from 'vue'

import { icons } from '../../icons/index.js'

interface Props {
	icon: keyof typeof icons
	title?: string
	scale?: number
	// area-hidden and no title needed
	isDecorative?: boolean
}

const props = withDefaults(
	defineProps<Props>(),
	{
		title: undefined,
		scale: 1,
		isDecorative: false
	}
)

const { icon, scale, isDecorative } = toRefs(props)

const iconData = computed(() => icons[icon.value])

const attrs = reactive({
	'aria-hidden': computed(() => isDecorative.value || undefined),
	role: computed(() => !isDecorative.value ? 'img' : undefined),
	viewBox: computed(
		() => `0 0 ${iconData.value.width} ${iconData.value.height}`
	),
	height: computed(() => `${iconData.value.height * scale.value}px`),
	width: computed(() => `${iconData.value.width * scale.value}px`)
})
</script>
