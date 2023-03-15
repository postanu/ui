<template lang="pug">
p-button.p-button-outline
	slot
</template>

<script lang="ts" setup>
import PButton from '../p-button/PButton.vue'
</script>

<style lang="sass">
.p-button-outline
	--p-button-content-padding: 15px 45px
	--p-button-radius: 25px
	--p-button-background: transparent
	--p-button-hover-background: transparent
	--p-button-active-background: transparent
	--p-button-border: 1px solid var(--p-color-white-02)
	--p-button-hover-border: 1px solid var(--p-color-white-05)
	--p-button-active-border: 1px solid var(--p-color-white-07)
</style>
