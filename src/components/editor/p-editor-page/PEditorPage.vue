<template lang="pug">
p-button.p-editor-page
	p-page.p-editor-page__content(
		:network="network"
		:avatar="avatar"
		:fullname="fullname"
		:username="username"
	)
</template>

<script lang="ts" setup>
import type { PageNetwork } from '@postanu/shared'

import PButton from '../../core/buttons/p-button/PButton.vue'
import PPage from '../../core/p-page/PPage.vue'

interface Props {
	network?: PageNetwork
	avatar: null | string
	fullname: string
	username: null | string
}

defineProps<Props>()
</script>

<style lang="sass">
.p-editor-page
	--p-editor-page-show-icon: 1

	--p-button-content-padding: 10px
	--p-button-radius: 7.5px
	--p-button-background: transparent
	--p-button-hover-background: var(--p-color-white-01)
	--p-button-active-background: var(--p-color-white-02)

.p-editor-page__content
	--p-page-show-icon: var(--p-editor-page-show-icon)

	cursor: pointer

.p-editor-page:hover .p-editor-page__content
	--p-page-show-icon: 1

.p-editor-page:focus .p-editor-page__content
	--p-page-show-icon: 1
</style>
