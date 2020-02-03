import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getRecipe, cleanStore } from '../../actions/recipe'
import { connect } from 'react-redux'
import timeFormatter from '../../utils/timeFormatter'
import { Link } from 'react-router-dom'
import { Time } from 'styled-icons/boxicons-regular/Time'
import { Dish } from 'styled-icons/boxicons-regular/Dish'
import DeleteModal from './DeleteModel'

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
`
const ImageContainer = styled.div`
	margin-top: 15px;
	height: 640px;
	align-self: center;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`
const Image = styled.img`
	max-width: 100%;
	max-height: 100%;
`
const SpanWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin: 15px;
`
const ServingsSpan = styled.span`
	font-weight: 700;
	font-size: 22px;
	display: flex;
	align-items: center;
`
const ServingsIcon = styled(Dish)`
	height: 24px;
	margin-right: 5px;
`

const TimeSpan = styled.span`
	font-weight: 700;
	font-size: 22px;
	display: flex;
	align-items: center;
`
const TimeIcon = styled(Time)`
	height: 24px;
	margin-right: 5px;
`

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
const ToolBar = styled.div`
	align-self: center;
	display: flex;
	width: 35%;
	margin: 25px 0 15px 0;
	justify-content: space-between;
`
const DeleteBtn = styled.button`
	background: var(--red);
	color: white;
	align-self: center;
	width: 100px;
	border: none;
	font-size: 18px;
	padding: 5px 10px;
	border-radius: 10px;
	box-shadow: var(--smallShadow);
	transition: all 0.2s;
	&:hover {
		transform: scale(1.05);
	}
`

const EditBtn = styled(Link)`
	background: var(--mainDeep);
	color: white;
	align-self: center;
	text-align: center;
	width: 100px;
	border: none;
	font-size: 18px;
	padding: 3px;
	border-radius: 10px;
	box-shadow: var(--smallShadow);
	transition: all 0.2s;
	&:hover {
		transform: scale(1.05);
	}
`

const RecipePage = ({
	location,
	getRecipe,
	deleteRecipe,
	isLoaded,
	cleanStore,
	recipe
}) => {
	const ID = location.pathname.slice(8)
	console.log(ID)
	useEffect(() => {
		getRecipe(ID)
		// return () => {
		// 	cleanStore()
		// }
	}, [])

	// const timeM = () => {
	// 	let time = recipe.time
	// 	let x = time.split('h:')
	// 	let minutes = Mumber(x[0] * 60)
	// 	// let result = (x[0] * 60)
	// 	console.log(minutes)
	// }

	const [modal, setModal] = useState(false)

	// const deleteHandler = () => {
	// 	deleteRecipe(ID)
	// }

	return (
		<>
			{!isLoaded ? (
				<h2>Loading...</h2>
			) : (
				<>
					<Wrapper>
						<h2>{recipe.name}</h2>
						<h3>{recipe.description}</h3>
						<ImageContainer>
							<Image src={`/${recipe.image}`} alt='' />
						</ImageContainer>
						<SpanWrapper>
							<ServingsSpan>
								<ServingsIcon /> {recipe.servings} servings
							</ServingsSpan>
							<TimeSpan>
								<TimeIcon /> {timeFormatter(recipe.time)}
							</TimeSpan>
						</SpanWrapper>
						<LowWrapper>
							<Ingredients>
								<ListName>Ingredients</ListName>
								{JSON.parse(recipe.ingredients).map((item, i) => {
									return <ListItem key={i}>{item}</ListItem>
								})}
							</Ingredients>
							<Steps>
								<ListName>Preparation steps</ListName>
								{JSON.parse(recipe.preparation).map((item, i) => {
									return (
										<ListItem key={i}>
											<b>Step {i + 1}:</b> {item}
										</ListItem>
									)
								})}
							</Steps>
						</LowWrapper>
						<ToolBar>
							<EditBtn to={`/edit`}>Edit</EditBtn>
							<DeleteBtn onClick={e => setModal(true)}>Delete</DeleteBtn>
						</ToolBar>
					</Wrapper>
					{modal ? (
						<DeleteModal id={recipe._id} close={e => setModal(false)} />
					) : null}
				</>
			)}
		</>
	)
}

const mapStateToProps = state => ({
	recipe: state.recipe.currentRecipe.currentRecipe,
	isLoaded: state.recipe.currentRecipe.isLoaded,
	error: state.recipe.error
})

export default connect(mapStateToProps, {
	getRecipe,
	cleanStore
})(RecipePage)
