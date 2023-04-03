<template lang="pug">
p-button.p-button-avatar
	.p-button-avatar__content
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import PButton from '../p-button/PButton.vue'

interface Props {
	image: string
}

const props = defineProps<Props>()
const background = computed(() => `url("${props.image}")`)
</script>

<style lang="sass">
.p-button-avatar
	--p-button-content-padding: 3px
	--p-button-radius: 50%

.p-button-avatar__content
	box-sizing: content-box
	width: 24px
	height: 24px
	background: v-bind('background')
	background-position: center
	background-size: cover
	border-radius: var(--p-button-radius)
</style>
