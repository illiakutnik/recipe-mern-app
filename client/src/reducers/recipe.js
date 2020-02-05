import {
	LOADING,
	CLEAN_STORE,
	CREATE_RECIPE,
	GET_ALL_RECIPES,
	CREATE_RECIPE_FAIL,
	GET_ALL_RECIPES_FAIL,
	GET_RECIPE,
	GET_RECIPE_FAIL,
	EDIT_RECIPE,
	EDIT_RECIPE_FAIL,
	DELETE_RECIPE,
	DELETE_RECIPE_FAIL
} from '../actions/types'

const initialState = {
	recipes: { recipes: null, isLoaded: false },
	currentRecipe: { currentRecipe: null, isLoaded: false },
	loading: false,
	error: null
}

export default function(state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case LOADING:
			return { ...state, loading: true }
		case CLEAN_STORE:
			return initialState
		case CREATE_RECIPE:
			return { ...state, loading: false, error: false }
		case CREATE_RECIPE_FAIL:
			return { ...state, loading: false, error: payload }
		case GET_ALL_RECIPES:
			return {
				...state,
				recipes: { recipes: payload, isLoaded: true },
				loading: false
			}
		case GET_ALL_RECIPES_FAIL:
			return { ...state, loading: false, error: payload }
		case GET_RECIPE:
			return {
				...state,
				currentRecipe: { currentRecipe: payload, isLoaded: true },
				loading: false
			}
		case GET_RECIPE_FAIL:
			return { ...state, loading: false, error: payload }
		case EDIT_RECIPE:
			return { ...state, loading: false, error: false }
		case EDIT_RECIPE_FAIL:
			return { ...state, loading: false, error: payload }
		case DELETE_RECIPE:
			return { ...state, loading: false }
		case DELETE_RECIPE_FAIL:
			return { ...state, loading: false, error: payload }
		default:
			return state
	}
}
