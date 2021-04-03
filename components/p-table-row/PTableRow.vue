<template lang="pug">
.p-table-row
	slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PTableRow'
})
</script>

<style lang="stylus">
.p-table-row
	position relative
	min-height 50px
	line-height 50px

.p-table-row:before,
.p-table-row:after
	content ""
	left 0
	width 100%
	position absolute
	z-index -1

.p-table-row:before
	top -1px
	height 1px
	border-top 1px solid var(--p-color-white-01)

.p-table-row:after
	bottom 0
	border-bottom 1px solid var(--p-color-white-01)
</style>
