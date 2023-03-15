<template lang="pug">
p-button.p-button-connect
	p-icon-arrow-north-east.p-button-connect__arrow
	component.p-button-connect__icon(:is="icon")
	span.p-button-connect__label
		slot
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { NETWORKS_ORDER } from '@postanu/core'

import PIconArrowNorthEast from '../../icons/p-icon-arrow-north-east/PIconArrowNorthEast.vue'
import PButton from '../p-button/PButton.vue'

interface Props {
	network: typeof NETWORKS_ORDER[number]
}

const props = defineProps<Props>()

const icon = computed(() => `p-icon-${props.network}`)
</script>

<style lang="sass">
.p-button-connect
	--p-button-content-padding: 10px
	--p-button-radius: 5px

	position: relative
	width: 100px

.p-button-connect__arrow
	position: absolute
	top: 12px
	right: 12px

.p-button-connect__icon
	display: block

.p-button-connect__label
	display: block
	padding-top: 25px
	line-height: calc(var(--p-body-line-height) * var(--p-body-font-size) - 5px)
	text-align: left
</style>
