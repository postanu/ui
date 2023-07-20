<template lang="pug">
p-button.p-button-common
	slot
</template>

<script lang="ts" setup>
import PButton from '../p-button/PButton.vue'
</script>

<style lang="sass">
.p-button-common
	--p-button-content-padding: 3px 15px
	--p-button-radius: 7.5px

	font-size: var(--p-caption-font-size)
	font-weight: var(--p-caption-font-weight)
	line-height: var(--p-caption-line-height)
</style>
