<template lang="pug">
.p-caption
	slot
</template>

<script lang="ts" setup>
interface Slots {
	default: () => unknown
}

defineSlots<Slots>()
</script>

<style lang="sass">
.p-caption
	font-size: var(--p-caption-font-size)
	font-weight: var(--p-caption-font-weight)
	line-height: var(--p-caption-line-height)
	color: var(--p-color-white-05)
</style>
