export default class Page {

	constructor() {
		this.apiButton();
		$('.webpack-work-flow').text('injected by /client/src/js');
	}

	apiButton(): void {
		$('button.api').on('click', () => {
			$.ajax({
				url: '/api/data-example',
				method: 'post',
				data: {
					say: (window as any).utils.getHello() || '',
					again: 'again'
				},
			}).done((response) => {
				$('.result').append(response);
			});
		});
	}

}
