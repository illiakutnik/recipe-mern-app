import React from 'react'

const ListItem = ({
	recipe: {
		name,
		description,
		image,
		servings,
		ingredients,
		preparation,
		time,
		date,
		updated
	}
}) => {
	return (
		<div>
			<h1>{name}</h1>
			<h2>{description}</h2>
			<h3>{servings}</h3>
			<h3>{time}</h3>
		</div>
	)
}

export default ListItem
