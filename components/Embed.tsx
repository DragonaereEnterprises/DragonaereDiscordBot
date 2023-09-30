import { Embed } from "reacord"
import React from "react"


export function EmbedMessage({title, description}: any) {
	return (
		<Embed
			title={title}
			description={description}
			color={0xF46904}
			timestamp={Date.now()}
		/>
	)
}

export function EmbedError({description}: any) {
	return (
		<Embed
			title="Error"
			description={description}
			color={0xF40000}
			timestamp={Date.now()}
		/>
	)
}

export function EmbedDefaultError() {
	return (
		<Embed
			title="Error"
			description="An error has occurred"
			color={0xF40000}
			timestamp={Date.now()}
		/>
	)
}