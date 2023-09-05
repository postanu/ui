<template lang="pug">
.p-editor-timeline-hidden
	.p-editor-timeline-hidden__text
		slot(name="hidden-text")
	.p-editor-timeline-hidden__button
		p-button-common(@click="expand")
			slot(name="hidden-button-text")
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

import PButtonCommon from '../../../core/buttons/p-button-common/PButtonCommon.vue'

interface Props {
	expanded: boolean
}

interface Emits {
	(event: 'update:expanded', value: Props['expanded']): void
}

interface Slots {
	'hidden-text' (): unknown
	'hidden-button-text' (): unknown
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
defineSlots<Slots>()

const expanded = useVModel(props, 'expanded', emit)

function expand (): void {
	expanded.value = true
}
</script>

<style lang="sass">
.p-editor-timeline-hidden
	display: flex
	flex-direction: column
	gap: 5px
	margin: 5px 0 10px

.p-editor-timeline-hidden__text
	display: flex
	gap: 10px
	align-items: center

.p-editor-timeline-hidden__text:before
	width: 1px
	height: 30px
	margin: 0 9px
	content: ''
	background-image: linear-gradient(180deg, var(--p-color-white-01) 0%, var(--p-color-white-09) 50%, var(--p-color-white-01) 100%)

.p-editor-timeline-hidden__button
	margin-left: 30px
</style>
