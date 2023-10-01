<template lang="pug">
p-button.p-button-connect
	p-icon-arrow-north-east.p-button-connect__arrow
	p-icon-network.p-button-connect__icon(:network="network")
	span.p-button-connect__label
		slot
</template>

<script lang="ts" setup>
import type { NETWORKS } from '@postanu/shared'

import PIconArrowNorthEast from '../../icons/p-icon-arrow-north-east/PIconArrowNorthEast.vue'
import PIconNetwork from '../../icons/p-icon-network/PIconNetwork.vue'
import PButton from '../p-button/PButton.vue'

interface Props {
	network: typeof NETWORKS[number]
}

defineProps<Props>()
</script>

<style lang="sass">
a.p-button-connect
	--p-button-content-padding: 10px
	--p-button-radius: 5px

	position: relative
	display: block
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
