<template lang="pug">
.p-table-group
	.p-table-group__name
		slot(name="name")
	.p-table-group__content
		slot(name="content")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PTableGroup'
})
</script>

<style lang="stylus">
.p-table-group
	position relative
	gap 20px
	display grid
	grid-template-columns 260px 1fr

.p-table-group:before,
.p-table-group:after
	content ""
	left 0
	width 100%
	position absolute
	z-index -1

.p-table-group:before
	top -1px
	height 1px
	border-top 1px solid var(--p-color-white-01)

.p-table-group:after
	bottom 0
	border-bottom 1px solid var(--p-color-white-01)

.p-table-group__name
	line-height 50px
</style>
