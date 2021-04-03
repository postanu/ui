<template lang="pug">
.p-badge
	span
		slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PBadge'
})
</script>

<style lang="stylus">
.p-badge
	display: inline-block
	min-width: 20px
	text-align: center
	border-radius: 10px
	background-color: var(--p-color-white-01)
	font-size: var(--p-badge-font-size)
	font-weight: var(--p-badge-font-weight)
	line-height: var(--p-badge-line-height)

	> span
		padding: 0 5px
</style>
