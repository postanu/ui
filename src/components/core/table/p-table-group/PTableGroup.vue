<template lang="pug">
.p-table-group
	.p-table-group__name
		slot(name="name")
	.p-table-group__content
		slot(name="content")
</template>

<style lang="sass">
.p-table-group
	position: relative
	display: grid
	grid-template-columns: 260px 1fr
	gap: 20px

.p-table-group:before,
.p-table-group:after
	position: absolute
	left: 0
	z-index: -1
	width: 100%
	content: ""

.p-table-group:before
	top: -1px
	height: 1px
	border-top: 1px solid var(--p-color-white-01)

.p-table-group:after
	bottom: 0
	border-bottom: 1px solid var(--p-color-white-01)

.p-table-group__name
	line-height: 50px

@media (width < 1366px)
	.p-table-group
		grid-template-columns: 1fr

	.p-table-group__name
		display: none
</style>
