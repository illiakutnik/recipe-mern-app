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
	}
	> p {
		font-family: 'Bangers', cursive;
		/* font-family: 'Zhi Mang Xing', cursive; */
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
	> p {
		font-weight: 700;
		padding: 0 5px;
		font-size: 18px;
	}
`
const Plus1 = styled(Plus)`
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
				<Plus1 />
				<p>ADD A NEW ONE</p>
			</AddButton>
		</NavBar>
	)
}

export default Navbar
