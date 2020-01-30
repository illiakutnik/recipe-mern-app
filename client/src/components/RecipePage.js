import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getRecipe } from '../actions/recipe'
import { connect } from 'react-redux'

const recipe = {
	name: 'Stew potato with something',
	description:
		'tuda suda tuda suda tuda susdadadad ad d a ytyty,. dfdf. .dfdfdfd jdf',
	image: 'img',
	servings: 3,
	time: '30m',
	ingredients: ['potato', 'something', 'another something', 'i take'],
	steps: [
		'potato another something another something',
		'something another something another something',
		'another something another something another something another something',
		'i take'
	]
}

const Wrapper = styled.div`
	padding: 20px;
`
const SpanWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
`
const Servings = styled.span``

const Time = styled.span``

const LowWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`
const Ingredients = styled.ul`
	flex-basis: 30%;
	font-size: 18px;
`
const Steps = styled.ul`
	font-size: 18px;
	flex-basis: 65%;
`
const ListName = styled.p`
	font-size: 20px;
	font-weight: 700;
	text-align: center;
	margin-bottom: 10px;
`

const ListItem = styled.li`
	padding: 5px;
	margin-top: 5px;
	&:nth-of-type(even) {
		background-color: var(--whitesmoke);
	}
`

const RecipePage = ({ location, getRecipe, loading, recipe }) => {
	useEffect(() => {
		getRecipe(location.pathname.slice(8))
	}, [])
	return (
		<>
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<Wrapper>
					<h2>{recipe.name}</h2>
					<h3>{recipe.description}</h3>
					<div
						style={{ width: '100%', height: '400px', background: 'green' }}
					></div>
					<SpanWrapper>
						<Servings>{recipe.servings} servings</Servings>
						<Time>Total time: {recipe.time}</Time>
					</SpanWrapper>
					{/* <LowWrapper>
						<Ingredients>
							<ListName>Ingredients</ListName>
							{recipe.ingredients.map((item, i) => {
								return <ListItem key={i}>{item}</ListItem>
							})}
						</Ingredients>
						<Steps>
							<ListName>Preparation steps</ListName>
							{recipe.steps.map((item, i) => {
								return (
									<ListItem key={i}>
										Step {i + 1}: {item}
									</ListItem>
								)
							})}
						</Steps>
					</LowWrapper> */}
				</Wrapper>
			)}
		</>
	)
}

const mapStateToProps = state => ({
	recipe: state.recipe.currentRecipe,
	loading: state.recipe.loading,
	error: state.recipe.error
})

export default connect(mapStateToProps, { getRecipe })(RecipePage)
