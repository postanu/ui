<template lang="pug">
.p-badge
	span
		slot
</template>

<style lang="sass">
.p-badge
	display: inline-block
	min-width: 20px
	font-size: var(--p-badge-font-size)
	font-weight: var(--p-badge-font-weight)
	line-height: var(--p-badge-line-height)
	text-align: center
	background-color: var(--p-color-white-01)
	border-radius: 10px

	> span
		padding: 0 5px
</style>
