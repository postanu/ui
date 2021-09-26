<template lang="pug">
.p-button-remove(
	@mouseenter="setHover(true)"
	@mouseleave="setHover(false)"
)
	p-button(
		v-if="!removing"
		type="text"
		danger
		@click="showQuestion"
	)
		slot(name="default") Remove
	template(v-else)
		.p-button-remove__question
			slot(name="question") Delete?
		p-button(
			type="text"
			muted
			@click="hideQuestion"
		)
			slot(name="disagree") Cancel
		p-button(
			type="text"
			danger
			@click="remove"
		)
			slot(name="agree") Confirm
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import PButton from '../p-button/PButton.vue'

export default defineComponent({
	name: 'PButtonRemove',
	components: { PButton },
	props: {
		timeout: {
			type: Number,
			default: 4000
		}
	},
	emits: [
		'removing',
		'remove'
	],
	setup (props, { emit }) {
		let removing = ref(false)
		let timeout = ref<ReturnType<typeof setTimeout> | null>(null)
		let hover = ref(false)

		// eslint-disable-next-line no-shadow
		watch([hover, removing, timeout], ([hover, removing, timeout]) => {
			if (removing) {
				if (hover) {
					timeout && stopTimeout()
				} else {
					!timeout && startTimeout()
				}
			}
		})

		function setHover (value: boolean): void {
			hover.value = value
		}

		function startTimeout (): void {
			timeout.value = setTimeout(hideQuestion, props.timeout)
		}

		function stopTimeout (): void {
			if (timeout.value) {
				clearTimeout(timeout.value)
				timeout.value = null
			}
		}

		function showQuestion (): void {
			removing.value = true
			emit('removing', removing.value)
		}

		function hideQuestion (): void {
			emit('removing', false)
			setTimeout(() => {
				removing.value = false
			}, 100)
		}

		function remove (): void {
			emit('remove')
			hideQuestion()
		}

		function cancel (): void {
			hideQuestion()
		}

		return {
			showQuestion,
			hideQuestion,
			setHover,
			removing,
			remove,
			cancel
		}
	}
})
</script>

<style lang="stylus">
.p-button-remove
	display: flex

.p-button-remove__question
	padding-right: 30px
	line-height: 30px
</style>
