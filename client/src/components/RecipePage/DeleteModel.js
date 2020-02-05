import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { deleteRecipe } from '../../actions/recipe'

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 75vh;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 5;
`
const BackDrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 4;
	background-color: rgba(0, 0, 0, 0.7);
`
const InnerWrapper = styled.div`
	background: var(--whitesmoke);
	display: flex;
	flex-direction: column;
	padding: 35px 15px 15px 15px;
	border-radius: 10px;
`
const BtnWrapper = styled.div`
	align-self: center;
	display: flex;
	width: 60%;
	margin: 25px 0 15px 0;
	justify-content: space-between;
`
const Button = styled.button`
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

const CancelBtn = styled(Button)`
	background: var(--mainDeep);
`

const DeleteBtn = styled(Button)`
	background: var(--red);
`

const Modal = ({ close, deleteRecipe, id }) => {
	const onClick = () => {
		deleteRecipe(id)
		close()
	}

	return ReactDOM.createPortal(
		<>
			<BackDrop />
			<Wrapper>
				<InnerWrapper>
					<h2>Are you sure you wanna delete this recipe?</h2>
					<BtnWrapper>
						<DeleteBtn onClick={onClick}>Delete</DeleteBtn>
						<CancelBtn onClick={close}>Cancel</CancelBtn>
					</BtnWrapper>
				</InnerWrapper>
			</Wrapper>
		</>,
		document.getElementById('root-modal')
	)
}

export default connect(null, { deleteRecipe })(Modal)
