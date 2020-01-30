import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import logo from '../../logowhite.png'
import { Plus } from 'styled-icons/typicons/Plus'

const NavBar = styled.div`
	display: flex;
	max-width: 1000px;
	justify-content: space-between;
	margin: 0 auto;
	background: var(--whitesmoke);
	padding: 20px;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
`

const StyledLogo = styled(Link)`
	color: black;
	display: flex;
	align-items: center;
	> img {
		background: var(--main);
		padding: 5px;
		border-radius: 50%;
		width: 55px;
		color: black;
		box-shadow: var(--smallShadow);
	}
	> p {
		font-family: 'Bangers', cursive;
		letter-spacing: 3px;
		margin-left: 10px;
		font-size: 30px;
		font-weight: 400;
	}
`
const AddButton = styled(Link)`
	background: var(--main);
	display: flex;
	align-items: center;
	border-radius: 30px;
	color: white;
	padding: 0 5px;
	box-shadow: var(--smallShadow);
	transition: all 0.2s;
	&:hover {
		transform: scale(1.05);
	}
	> p {
		font-weight: 700;
		padding: 0 15px 0 10px;
	}
`
const PlusStyled = styled(Plus)`
	color: white;
	width: 30px;
`

const Navbar = () => {
	return (
		<NavBar>
			<StyledLogo to='/'>
				<img src={logo} alt='' />
				<p>My Recipes</p>
			</StyledLogo>
			<AddButton to='/create'>
				<PlusStyled />
				<p>ADD A NEW ONE</p>
			</AddButton>
		</NavBar>
	)
}

export default Navbar
