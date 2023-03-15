<template lang="pug">
p-button.p-button-icon
	.p-button-icon__content
		slot
</template>

<script lang="ts" setup>
import PButton from '../p-button/PButton.vue'
</script>

<style lang="sass">
.p-button-icon
	--p-button-content-padding: 5px 5px 5px 15px

.p-button-icon__content
	display: flex
	gap: 10px
</style>
