import { get } from "enmity/api/settings";
import { GatewayActivity, GatewayActivityButton } from 'discord-api-types/v10';
import Manifest from './manifest.json';

interface Activity extends Partial<GatewayActivity> {
	buttons: GatewayActivityButton[] | undefined
	assets: Partial<Record<"large_image" | "large_text" | "small_image" | "small_text", string>> | undefined
}

export function getActivity(): Activity | undefined {
	let activity: Activity = {
		name: get(Manifest.name, 'name', undefined)?.toString(),
		type: 3,
		details: get(Manifest.name, 'details', undefined)?.toString(),
		state: get(Manifest.name, 'state', undefined)?.toString(),
		assets: {},
		buttons: []
	}

	if (!activity.name) return undefined

	// Images

	const largeImage = get(Manifest.name, 'largeImage', undefined)?.toString()
	const largeImageText = get(Manifest.name, 'largeImageText', undefined)?.toString()

	if (largeImage && activity.assets) {
		activity.assets.large_image = largeImage
		activity.assets.large_text= largeImageText
	}

	const smallImage = get(Manifest.name, 'smallImage', undefined)?.toString()
	const smallImageText = get(Manifest.name, 'smallImageText', undefined)?.toString()

	if (smallImage && activity.assets) {
		activity.assets.small_image = smallImage
		activity.assets.small_text= smallImageText
	}

	if (activity.assets && !activity.assets.large_image && !activity.assets.small_image) {
		activity.assets = undefined
	}

	// Buttons

	const button1Label = get(Manifest.name, 'button1Label', undefined)?.toString()
	const button1Url = get(Manifest.name, 'button1Url', undefined)?.toString()

	if (button1Label && button1Url && activity.buttons) {
		const button: GatewayActivityButton = { label: button1Label, url: button1Url }
		activity.buttons.push(
			button
		)
	}

	const button2Label = get(Manifest.name, 'button2Label', undefined)?.toString()
	const button2Url = get(Manifest.name, 'button2Url', undefined)?.toString()

	if (button2Label && button2Url && activity.buttons) {
		const button: GatewayActivityButton = { label: button2Label, url: button2Url }
		activity.buttons.push(
			button
		)
	}

	if (activity.buttons && activity.buttons.length === 0) {
		activity.buttons = undefined
	}
		
	return activity
}