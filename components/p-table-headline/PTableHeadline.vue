<template lang="pug">
p-heading.p-table-headline(:tag="tag" :headline="true")
	slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { ALLOWED_TAGS } from '../p-heading/allowed-tags'
import PHeading from '../p-heading/PHeading.vue'

export default defineComponent({
	name: 'PTableHeadline',
	components: { PHeading },
	props: {
		tag: {
			type: String,
			required: true,
			validator: (value: string) => {
				return ALLOWED_TAGS.includes(value)
			}
		}
	}
})
</script>

<style lang="stylus">
.p-table-headline
	line-height: 50px
	margin-left: 280px
</style>
