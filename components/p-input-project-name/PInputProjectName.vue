<template lang="pug">
p-input.p-h2.p-input-project-name(
	ref="input"
	size="25"
	type="text"
	name="project-name"
	autofocus="on"
	autocorrect="off"
	autocapitalize="off"
	placeholder="Type the name of the project"
	v-model:value="value"
	@keyup.enter="$emit('create', value)"
)
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import PInput from '../p-input/PInput.vue'

export default defineComponent({
	name: 'PInputProjectName',
	components: { PInput },
	emits: ['create'],
	setup () {
		let input = ref(null)
		let value = ref('')
		let showLabel = computed(() => value.value.length > 1)
		return {
			input,
			value,
			showLabel
		}
	}
})
</script>

<style lang="stylus">
.p-input-project-name
	font-weight: 700
	padding: 15px 0 5px 0

.p-input-project-name:focus
	box-shadow: none
</style>
