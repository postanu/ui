<template lang="pug">
div(
	ref="el"
	:style="{ opacity }"
)
	slot
</template>

<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core'
import { ref, watch } from 'vue'

const el = ref<HTMLElement | null>(null)
const { top } = useElementBounding(el)
const opacity = ref(0)

function lerp (min: number, max: number, value: number): number {
	return (value - min) / (max - min)
}

watch(
	top,
	() => {
		requestAnimationFrame(() => {
			opacity.value = Math.min(1, Math.max(0, lerp(50, 150, top.value)))
		})
	},
	{ immediate: true }
)
</script>
