import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllRecipes } from '../../actions/recipe'
import ListItem from './ListItem'

const List = ({ recipes, loading, error, getAllRecipes }) => {
	useEffect(() => {
		getAllRecipes()
	}, [])

	return (
		<div>
			<h1>List</h1>
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<div>
					{recipes.length > 0 ? (
						<div>
							{recipes.map(recipe => {
								return <ListItem key={recipe._id} recipe={recipe} />
							})}
						</div>
					) : (
						<h2>no recipes yet</h2>
					)}
				</div>
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	recipes: state.recipe.recipes,
	loading: state.recipe.loading,
	error: state.recipe.error
})

export default connect(mapStateToProps, { getAllRecipes })(List)
