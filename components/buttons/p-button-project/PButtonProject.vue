<template lang="pug">
p-button-outline.p-button-project
	p-icon-plus
</template>

<script lang="ts" setup>
import PIconPlus from '../../icons/p-icon-plus/PIconPlus.vue'
import PButtonOutline from '../p-button-outline/PButtonOutline.vue'
</script>

<style lang="sass">
.p-button-project
	--p-button-project-line-height: 350px
	--p-button-project-line-color: var(--p-color-white-02)

	--p-button-content-padding: 14px
	--p-button-radius: 50%
	--p-button-hover-border: 1px solid var(--p-color-white-09)

	display: flex
	flex-direction: column
	align-items: center

.p-button-project svg
	display: block
	color: var(--p-color-white-04)
	transition: color 0.15s ease-out

.p-button-project:after
	box-sizing: border-box
	display: block
	width: 1px
	height: var(--p-button-project-line-height)
	content: ""
	background: var(--p-button-project-line-color)
	transition: margin-top 0.15s ease-out, height 0.15s ease-out

.p-button-project:hover
	svg
		color: var(--p-color-white-09)

	&:after
		height: calc(var(--p-button-project-line-height) - 50px)
		margin-top: 50px
</style>
