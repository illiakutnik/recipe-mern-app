const timeFormatter = min => {
	let minNum = Number(min)

	let hours = Math.floor(minNum / 60)
	let minutes = minNum % 60
	if (minutes === 0) minutes = '00'
	return !hours ? `${minutes}m` : `${hours}h:${minutes}m`
}

export default timeFormatter
