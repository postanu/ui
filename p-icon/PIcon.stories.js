import PIcon from './PIcon.vue'
import icons from './icons.js'

export default {
	title: 'Icon',
	component: PIcon,
	argTypes: {
		icon: { control: { type: 'select', options: Object.keys(icons) } }
	}
}

const Template = (args) => ({
	components: { PIcon },
	template: `
		<p-icon v-bind="$props"></p-icon>
	`
})

export const Postanu = Template.bind({})
Postanu.args = { icon: 'postanu' }

export const Facebook = Template.bind({})
Facebook.args = { icon: 'facebook' }

export const Twitter = Template.bind({})
Twitter.args = { icon: 'twitter' }
