window.onload = () => {
	setupGreet();
	triangle();
	strings();
	_array();
	timer();
}

let clearForms = () => {
	console.log('a');
	for (let el of document.getElementsByTagName('form')){
		console.log(el);
		el.reset();
	}
}


let setupGreet = () => {
	let greet = document.getElementById('greetings');
	let greet_msg = document.getElementById('greet_msg');
	let greet_enter = document.getElementById('greetings_enter_name');

	let show_greet = name => {
		if(name == '' || !name)
			greet_msg.innerText = 'Ну привет';
		else
			greet_msg.innerText = `Ну здарова ${name}`;

		greet.classList.remove('hidden');
		greet_enter.classList.add('hidden');
	}

	let show_change_name = () => {
		greet.classList.add('hidden');
		greet_enter.classList.remove('hidden');
	}


	let greet_name = document.getElementById('greet_name');
	document.getElementById('greet_submit').onclick = e =>{
		e.preventDefault();
		localStorage.setItem('userName', greet_name.value);
		show_greet(greet_name.value);
	}

	document.getElementById('greet_other_name').onclick = e => {
		e.preventDefault();
		greet_name.value = '';
		localStorage.removeItem('userName');
		show_change_name();
	}

	let name = localStorage.getItem('userName');
	if(name != null && name !='') {
		show_greet(name);
	}
}

let triangle = () => {
	let height = document.getElementById('height');
	let base = document.getElementById('base');
	let triangle_submit = document.getElementById('triangle_submit');
	let triangle_area = document.getElementById('triangle_area');

	triangle_submit.onclick = e =>{
		e.preventDefault();
		triangle_area.innerText = height.value * base.value / 2;
	}
}

let strings = () => {
	let str1 = document.getElementById('str1');
	let str2 = document.getElementById('str2');
	let strres = document.getElementById('strres');
	document.getElementById('strCompareButton').onclick = e => {
		e.preventDefault();
		if(str1.value.length === str2.value.length)
			strres.innerText = 'Строки с одинаковой длины';
		else
			strres.innerText = 'Строки разной длины';
	}
}

let _array = () => {
	let arr = document.getElementById('arr');
	let arrRes1 = document.getElementById('arrRes1');
	let arrRes2 = document.getElementById('arrRes2');
	document.getElementById('arrSubm').onclick = e => {
		e.preventDefault();
		let elems = arr.value.split(' ');
		let min = elems[0];
		let max = elems[0];
		for (let el of elems){
			if(el < min) min = el;
			if(el > max) max = el;
		}
		arrRes1.innerText = max;
		arrRes2.innerText = min;
	}
}

let timer = () => {
	let disp = document.getElementById('timerDisplay');
	let start = document.getElementById('timerStart');
	let stop = document.getElementById('timerStop');
	let reset = document.getElementById('timerReset');

	let lastTime;
	let time = 0;

	let isRunning = false;

	let timerTick = () =>{
		let _time = Date.now();
		time += (_time - lastTime);
		lastTime = _time;

		let _t = Math.floor(time/1000)

		let substr1 = (Math.floor(_t/60)).toString();
		let substr2 = (_t%60).toString();

		while (substr1.length < 2) substr1 = '0' + substr1;
		while (substr2.length < 2) substr2 = '0' + substr2;

		if(time % 1000 < 500) disp.innerText = `${substr1}:${substr2}`;
		else disp.innerText = `${substr1} ${substr2}`;

		if(isRunning) window.requestAnimationFrame(timerTick);
	}

	start.onclick = () =>{
		lastTime = Date.now();
		isRunning = true;
		timerTick();
		start.disabled = 'true';
	}

	stop.onclick = () => {
		isRunning = false;
		start.disabled = '';
	}

	reset.onclick = () =>{
		stop.onclick();
		window.requestAnimationFrame(()=>{
			time = 0;
			disp.innerText = '00:00';
		});
	}
}
