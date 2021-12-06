/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
declare module '*.vue' {
	import { DefineComponent } from 'vue'
	let component: DefineComponent<{}, {}, any>
	export default component
}
