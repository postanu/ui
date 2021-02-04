<template lang="pug">
.p-logo
	p-icon(
		icon='postanu'
		label="Postanu Logo"
	)
</template>

<script>
import PIcon from '../p-icon/PIcon.vue'

export default {
	name: 'PLogo',
	components: { PIcon }
}
</script>

<style lang="stylus">
.p-logo
	height: 20px
	display: flex
	align-items: center
</style>
