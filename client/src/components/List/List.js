import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllRecipes, cleanStore } from '../../actions/recipe'
import styled from 'styled-components'
import ListItem from './ListItem'
import Pagination from './Pagination'
import Loader from '../Loader'

const StyledList = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	flex-wrap: wrap;
	padding: 15px;
`
const ErrorMsg = styled.p`
	font-weight: 700;
	color: red;
	text-align: center;
	padding: 10px 0 30px 0;
`

const List = ({
	recipes,
	isLoaded,
	error,
	loading,
	getAllRecipes,
	cleanStore
}) => {
	const [page, setPage] = useState(1)

	useEffect(() => {
		getAllRecipes(page)
		return () => {
			cleanStore()
		}
	}, [page])

	const changePage = i => {
		setPage(i)
	}

	return (
		<>
			{!isLoaded ? (
				loading ? (
					<Loader />
				) : null
			) : (
				<StyledList>
					{recipes.recipes.length > 0 ? (
						<>
							{recipes.recipes.map(recipe => {
								return <ListItem key={recipe._id} recipe={recipe} />
							})}
							<Pagination
								recipesCount={recipes.totalCount}
								changePage={changePage}
								currentPage={page}
							/>
						</>
					) : (
						<h2>no recipes yet</h2>
					)}
				</StyledList>
			)}
			{error ? <ErrorMsg>{error}</ErrorMsg> : null}
		</>
	)
}

const mapStateToProps = state => ({
	recipes: state.recipe.recipes.recipes,
	isLoaded: state.recipe.recipes.isLoaded,
	error: state.recipe.error,
	loading: state.recipe.loading
})

export default connect(mapStateToProps, { getAllRecipes, cleanStore })(List)
