<template lang="pug">
p-button.p-button-avatar
	p-avatar.p-button-avatar__content(
		:image="image"
		:text="text"
	)
</template>

<script lang="ts" setup>
import PAvatar from '../../p-avatar/PAvatar.vue'
import PButton from '../p-button/PButton.vue'

interface Props {
	image: null | string
	text: string
}

defineProps<Props>()
</script>

<style lang="sass">
.p-button-avatar
	--p-button-content-padding: 3px
	--p-button-radius: 50%

.p-button-avatar__content
	--p-avatar-size: 24px
	--p-avatar-border-size: 0
</style>
