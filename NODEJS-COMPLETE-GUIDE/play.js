
const fetchData = () => {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Done!");
		}, 2000);
	});
	
	return promise;
}

setTimeout(()=>{
	console.log("First timer.")
	fetchData().then(data => {
		console.log(data)
	})
},1000);