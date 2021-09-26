<template lang="pug">
.p-logo
	p-icon(
		icon='postanu'
		label="Postanu Logo"
	)
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PIcon from '../p-icon/PIcon.vue'

export default defineComponent({
	name: 'PLogo',
	components: { PIcon }
})
</script>

<style lang="stylus">
.p-logo
	display: flex
	align-items: center
	height: 20px
</style>
