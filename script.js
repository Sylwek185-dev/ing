document
	.getElementById('payment-form')
	.addEventListener('submit', function (event) {
		event.preventDefault();

		const amount = parseInt(document.getElementById('amount').value, 10);
		const firstName = document.getElementById('firstName').value;
		const lastName = document.getElementById('lastName').value;
		const email = document.getElementById('email').value;
		const phone = document.getElementById('phone').value;

		const apiEndpoint = 'http://localhost:3000/proxy/payment';
		const headers = new Headers({
			'Content-Type': 'application/json',
		});

		const body = JSON.stringify({
			amount: amount,
			currency: 'PLN',
			serviceId: 'cd1c032d-2315-49a7-84cd-57eef2fe7938',
			orderId: '12',
			customer: {
				email: email,
				firstName: firstName,
				lastName: lastName,
				phone: phone,
			},
		});

		fetch(apiEndpoint, {
			method: 'POST',
			headers: headers,
			body: body,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log('Response data:', data);
				if (data.payment && data.payment.url) {
					window.location.href = data.payment.url;
				} else {
					alert('Płatność sie nie powiodła.');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				alert('Wystąpił błąd. Proszę spróbować ponownie.');
			});
	});
