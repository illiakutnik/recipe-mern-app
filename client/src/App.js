import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from './store'
import theme from './utils/theme/theme'
import GlobalStyles from './utils/theme/global'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Create from './components/Create'
import Edit from './components/Edit'
import Navbar from './components/Navbar/Navbar'
import List from './components/List/List'
import RecipePage from './components/RecipePage/RecipePage'

const AppBackground = styled.div`
	background: var(--main);
	height: 100vh;
	overflow: auto;
`
const AppWrapper = styled.div`
	background-color: white;
	max-width: 1000px;
	min-height: 80vh;
	margin: 0 auto;
	margin-top: 100px;
	margin-bottom: 50px;
	box-shadow: var(--shadow);
	border-radius: 20px;
`

const App = () => {
	const recipe = useSelector(state => state.recipe.currentRecipe.currentRecipe)
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<>
					<AppBackground>
						<AppWrapper>
							<Navbar />
							<Switch>
								<Route exact path='/' component={List} />
								<Route exact path='/create' component={Create} />
								{recipe && <Route exact path='/edit' component={Edit} />}
								<Route exact path='/recipe/:id' component={RecipePage} />
								<Redirect to='/' />
							</Switch>
						</AppWrapper>
					</AppBackground>
					<GlobalStyles />
				</>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App
