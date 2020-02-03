import React from 'react'
import { Link } from 'react-router-dom'
import { Time } from 'styled-icons/boxicons-regular/Time'
import styled from 'styled-components'
import timeFormatter from '../../utils/timeFormatter'

const StyledListItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	background: var(--whitesmoke);
	flex-basis: 30%;
	margin: 10px;
	padding: 10px;
	height: 400px;
	min-width: 300px;
	border-radius: 10px;
	box-shadow: var(--smallShadow);
`
const Name = styled.h2`
	height: 44px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: 100%;
`
const Description = styled.p`
	height: 40px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: 100%;
	font-size: 14px;
`
const ImageContainer = styled.div`
	height: 240px;
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
const TimeSpan = styled.span`
	font-weight: 700;
	height: 38px;
	display: flex;
	align-items: center;
`
const TimeIcon = styled(Time)`
	height: 22px;
	margin-right: 5px;
`
const Button = styled(Link)`
	background: var(--main);
	color: white;
	align-self: center;
	flex-basis: 10%;
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

const ListItem = ({
	recipe: { _id, name, description, image, time, date, updated }
}) => {
	return (
		<StyledListItem>
			<Name>{name}</Name>
			<Description>{description}</Description>
			<ImageContainer>
				<Image src={image} alt='' />
			</ImageContainer>
			<TimeSpan>
				<TimeIcon /> {timeFormatter(time)}
			</TimeSpan>
			<Button to={`recipe/${_id}`}>See more</Button>
		</StyledListItem>
	)
}

export default ListItem
