const modalFramesOpen = document.querySelectorAll('[frame-btn]');
const modalFrames = document.querySelectorAll('[frame-modal]');
const bodyEl = document.body;
const awClose = document.querySelector('.aw__close');
setTimeout(function () { document.querySelector('.aw-wrapper').classList.add('visible') }, 2000);
awClose.addEventListener('click', function () {
	this.closest('.aw-wrapper').classList.toggle('aw-collapse');
});

if (modalFrames.length > 0) {
	const modalFramesClose = document.querySelectorAll('[frame-close]');

	for (let item of modalFramesOpen) {
		item.addEventListener('click', function (e) {
			
			for (let item of modalFrames) {
				item.classList.remove('visible');

				bodyEl.classList.remove('lock');
			}
			e.preventDefault();
			const itemAttr = item.getAttribute('frame-btn');
			if (itemAttr != '') {
				for (let frame of modalFrames) {
					const frameAttr = frame.getAttribute('frame-modal');
					if (frameAttr == itemAttr) {
						frame.classList.add('visible');
						bodyEl.classList.add('lock');

					}
				}
			}
		});
	}
	/*==  закрыть модалки  frame-modal по клику на крестик ======*/
	for (let item of modalFramesClose) {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			item.closest('[frame-modal]').classList.remove('visible');
			bodyEl.classList.remove('lock');


		});
	}
	/*=============== закрыть модалки по клику вне ===============*/
	for (let frame of modalFrames) {
		frame.addEventListener('click', function (e) {
			if (e.target === e.currentTarget) {
				this.classList.remove(`visible`);
				bodyEl.classList.remove('lock');
			}
		});
	}
}
// CUSTOM SELECT
const selectElements = document.querySelectorAll('.form-select');
if (selectElements.length>0) {
	for (let selectElement of selectElements){
		const selectInput = selectElement.querySelector('input');
		const selectOptions = selectElement.querySelector('.form-select__options');
		const selectArrow = selectElement.querySelector('.form-select__icon');



		selectArrow.addEventListener('click', function () {

			if (selectOptions.classList.contains('active')) {
				this.classList.remove('rotate');
				selectOptions.classList.remove('active');
			} else {
				this.classList.add('rotate');
				selectOptions.classList.add('active');
			}

		});

		//клик по выпадающему списку селекта
		selectOptions.addEventListener('click', function (e) {
			const selectItems = selectOptions.querySelectorAll('li');
			if (e.target.tagName == 'LI') {
				selectInput.value = e.target.textContent;
				for(let item of selectItems){
					item.classList.remove('active');
				}
				e.target.classList.add('active');
				this.classList.remove('active');
				selectArrow.classList.remove('rotate');
				
			}

		});
	}
}