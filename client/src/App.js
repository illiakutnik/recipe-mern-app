import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import theme from './utils/theme/theme'
import GlobalStyles from './utils/theme/global'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import Create from './components/create'
import Edit from './components/edit'
import Navbar from './components/Navbar/Navbar'
import List from './components/List/List'

const AppBackground = styled.div`
	background: var(--main);
	height: 100vh;
	overflow: auto;
`
const AppWrapper = styled.div`
	background-color: white;
	max-width: 1000px;
	margin: 0 auto;
	margin-top: 100px;
	margin-bottom: 50px;
	box-shadow: var(--shadow);
	border-radius: 20px;
`

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<>
						<AppBackground>
							<AppWrapper>
								<Navbar />
								<Switch>
									<Route exact path='/' component={List} />
									<Route exact path='/create' component={Create} />
									<Route exact path='/edit' component={Edit} />
								</Switch>
							</AppWrapper>
						</AppBackground>
						<GlobalStyles />
					</>
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	)
}

export default App
