// Dynamically create a user input form and append to document body
(function(){
	if (typeof document === 'undefined') return;

	const form = document.createElement('form');
	form.style.maxWidth = '600px';
	form.style.margin = '20px';

	function addField(labelText, input){
		const wrapper = document.createElement('div');
		wrapper.style.marginBottom = '10px';
		const label = document.createElement('label');
		label.textContent = labelText;
		label.style.display = 'block';
		label.style.fontWeight = '600';
		wrapper.appendChild(label);
		wrapper.appendChild(input);
		return wrapper;
	}

	// name
	const nameInput = document.createElement('input');
	nameInput.type = 'text';
	nameInput.name = 'name';
	nameInput.required = true;
	nameInput.style.width = '100%';

	// email
	const emailInput = document.createElement('input');
	emailInput.type = 'email';
	emailInput.name = 'email';
	emailInput.required = true;
	emailInput.style.width = '100%';

	// message (limit 500 words)
	const messageInput = document.createElement('textarea');
	messageInput.name = 'message';
	messageInput.rows = 6;
	messageInput.style.width = '100%';
	messageInput.required = true;

	const wordCount = document.createElement('div');
	wordCount.style.fontSize = '12px';
	wordCount.style.color = '#555';
	wordCount.textContent = '0 / 500 words';

	messageInput.addEventListener('input', ()=>{
		const words = messageInput.value.trim().split(/\s+/).filter(Boolean).length;
		wordCount.textContent = words + ' / 500 words';
		if(words > 500) {
			wordCount.style.color = 'red';
		} else {
			wordCount.style.color = '#555';
		}
	});

	// age
	const ageInput = document.createElement('input');
	ageInput.type = 'number';
	ageInput.name = 'age';
	ageInput.min = '0';
	ageInput.style.width = '100%';
	ageInput.required = true;

	// sports selector (10 sports)
	const sportsSelect = document.createElement('select');
	sportsSelect.name = 'sport';
	sportsSelect.required = true;
	sportsSelect.style.width = '100%';
	const sports = ['Soccer','Basketball','Tennis','Cricket','Baseball','Rugby','Swimming','Volleyball','Badminton','Hockey'];
	const placeholderOpt = document.createElement('option');
	placeholderOpt.value = '';
	placeholderOpt.textContent = '-- Select a sport --';
	placeholderOpt.disabled = true;
	placeholderOpt.selected = true;
	sportsSelect.appendChild(placeholderOpt);
	sports.forEach(s=>{
		const o = document.createElement('option'); o.value = s; o.textContent = s; sportsSelect.appendChild(o);
	});

	// tp number (integer, 10 digits)
	const tpInput = document.createElement('input');
	tpInput.type = 'tel';
	tpInput.name = 'tp';
	tpInput.placeholder = '10 digit number';
	tpInput.required = true;
	tpInput.style.width = '100%';

	// submit
	const submit = document.createElement('button');
	submit.type = 'submit';
	submit.textContent = 'Submit';

	form.appendChild(addField('Name', nameInput));
	form.appendChild(addField('Email', emailInput));
	const msgWrap = addField('Message (max 500 words)', messageInput);
	msgWrap.appendChild(wordCount);
	form.appendChild(msgWrap);
	form.appendChild(addField('Age', ageInput));
	form.appendChild(addField('Sport', sportsSelect));
	form.appendChild(addField('TP Number (10 digits)', tpInput));
	form.appendChild(submit);

	form.addEventListener('submit', (e)=>{
		e.preventDefault();
		const msgWords = messageInput.value.trim().split(/\s+/).filter(Boolean).length;
		if(msgWords > 500){ alert('Message exceeds 500 words'); return; }
		const ageVal = parseInt(ageInput.value,10);
		if(isNaN(ageVal)) { alert('Invalid age'); return; }
		const tp = tpInput.value.replace(/[^0-9]/g,'');
		if(!/^\d{10}$/.test(tp)) { alert('TP number must be 10 digits'); return; }

		const data = {
			name: nameInput.value.trim(),
			email: emailInput.value.trim(),
			message: messageInput.value.trim(),
			age: ageVal,
			sport: sportsSelect.value,
			tp: tp
		};
		// handle submission - currently logs to console
		console.log('Form submitted:', data);
		alert('Submitted successfully');
		form.reset();
		wordCount.textContent = '0 / 500 words';
	});

	document.body.appendChild(form);
})();

