import React from 'react'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
	align-self: flex-end;
	display: flex;
	justify-content: center;
	margin: 25;
	width: 100%;
`

const Button = styled.button`
	background: ${({ currentPage }) =>
		currentPage ? 'var(--mainDeep)' : 'var(--main)'};
	color: white;
	border-radius: 50%;
	border: none;
	box-shadow: var(--smallShadow);
	font-weight: 700;
	font-size: 18;
	padding: 10px 15px;
	margin: 10px;
	cursor: pointer;
	outline: none;
`

const Pagination = ({ recipesCount, changePage, currentPage }) => {
	const pages = Math.ceil(recipesCount / 6)
	let renderItems = []
	for (let i = 0; i < pages; i++) {
		renderItems.push(
			<Button
				key={i}
				onClick={() => changePage(i + 1)}
				currentPage={i + 1 === currentPage}
			>
				{i + 1}
			</Button>
		)
	}
	return <PaginationWrapper>{renderItems}</PaginationWrapper>
}

export default Pagination
