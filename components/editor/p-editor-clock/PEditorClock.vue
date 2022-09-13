<template lang="pug">
.p-editor-clock(v-html="clock")
</template>

<script lang="ts" setup>
import {
	getCurrentInstance,
	onUnmounted,
	computed,
	toRefs,
	unref,
	ref
} from 'vue'
import { format as dateFnsFormat } from 'date-fns'

interface Props {
	format: '12h' | '24h'
}

const props = defineProps<Props>()

const { format } = toRefs(props)

const now = ref(new Date())
const clock = computed(() => {
	let formatToken = format.value === '12h' ? 'hh:mm a' : 'HH:mm'
	return dateFnsFormat(unref(now), formatToken).replace(':', '<span>:</span>')
})

const interval = setInterval(() => {
	now.value = new Date()
}, 60 * 1000)

if (getCurrentInstance()) {
	onUnmounted(() => {
		clearInterval(interval)
	})
}
</script>

<style lang="stylus">
.p-editor-clock span
	animation: p-editor-clock-flash 2s step-start infinite

@keyframes p-editor-clock-flash
	50%
		opacity: 0
</style>
