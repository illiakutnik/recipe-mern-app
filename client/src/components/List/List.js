import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllRecipes } from '../../actions/recipe'
import styled from 'styled-components'
import ListItem from './ListItem'

const StyledList = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	flex-wrap: wrap;
	padding: 15px;
`

const List = ({ recipes, loading, error, getAllRecipes }) => {
	useEffect(() => {
		getAllRecipes()
	}, [])

	return (
		<>
			{/* <h1>List</h1> */}
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<StyledList>
					{recipes.length > 0 ? (
						<>
							{recipes.map(recipe => {
								return <ListItem key={recipe._id} recipe={recipe} />
							})}
						</>
					) : (
						<h2>no recipes yet</h2>
					)}
				</StyledList>
			)}
		</>
	)
}

const mapStateToProps = state => ({
	recipes: state.recipe.recipes,
	loading: state.recipe.loading,
	error: state.recipe.error
})

export default connect(mapStateToProps, { getAllRecipes })(List)
