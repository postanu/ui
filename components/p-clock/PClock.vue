<template lang="pug">
.p-clock(v-html="clock")
</template>

<script lang="ts">
import {
	getCurrentInstance,
	defineComponent,
	onUnmounted,
	computed,
	toRefs,
	unref,
	ref
} from 'vue'
import { format as dateFnsFormat } from 'date-fns'

export default defineComponent({
	name: 'PClock',
	props: {
		format: {
			type: String,
			required: true,
			validator: (value: string) => {
				return ['12', '24'].includes(value)
			}
		}
	},
	setup (props) {
		let { format } = toRefs(props)

		let now = ref(new Date())
		let clock = computed(() => {
			let token
			token = format.value === '12' ? 'hh:mm a' : 'HH:mm'
			return dateFnsFormat(unref(now), token).replace(':', '<span>:</span>')
		})

		let interval = setInterval(() => {
			now.value = new Date()
		}, 60 * 1000)

		if (getCurrentInstance()) {
			onUnmounted(() => {
				clearInterval(interval)
			})
		}

		return { clock }
	}
})
</script>

<style lang="stylus">
.p-clock span
	animation: p-clock-flash 2s step-start infinite

@keyframes p-clock-flash
	50%
		opacity: 0
</style>
