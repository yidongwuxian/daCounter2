
export function setLocalStorage(key, value) {
	var data = {
		value: value,
		expirse: new Date().getTime() + 24 * 60 * 60 * 1000
	};
	return localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) {
	var data = JSON.parse(localStorage.getItem(key));
	if (data !== null) {
		if (data.expirse != null && data.expirse < new Date().getTime()) {
			localStorage.removeItem(key);
		} else {
			return data.value;
		}
	}
}

export function removeLocalStorage(key) {
	// console.log(key)
	return localStorage.removeItem(key);
}

