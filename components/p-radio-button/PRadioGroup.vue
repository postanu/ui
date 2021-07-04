<template lang="pug">
.p-radio-group
	slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PRadioGroup',
	emits: ['change']
})
</script>

<style lang="stylus">
.p-radio-group
	gap: 20px
	display: flex
	user-select: none
</style>
