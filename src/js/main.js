const vidWidget = document.querySelector('.video-widget');
if (vidWidget){
	const vidWidgetClose = vidWidget.querySelectorAll('.video-widget__close');
	
	/* ===== remove widget =====*/
	for (let item of vidWidgetClose){
		item.addEventListener('click', function(){
			vidWidget.remove();
		})
	}

	/*===== widget as link for youtube ======  */
	const vwy = vidWidget.querySelector('.vwy-wrapper');
	if (vwy) {
		vwy.querySelector('.vwy__close').addEventListener('click', function (e) {
			vwy.remove();
		});
	}

	/*===== widget as mp4 clip ======  */
	const vw = vidWidget.querySelector('.vw');
	if (vw) {

		const vwContent = vw.querySelector('#vw-video');
		const vwClose = vw.querySelector('.vw__close');
		const collapseBtn = vw.querySelector('.video__collapse');

		vw.addEventListener('click', function (e) {
			e.preventDefault();
			
			if (e.target != vwClose) {
				if(){}
			
				if (vw.classList.contains('vw--open')) {
					if (e.target != collapseBtn){
						vwContent.pause();
					}else{
						this.classList.remove('vw--open');
						vwContent.muted = true;
						vwContent.controls = false;
						vwContent.loop = true;

						const previewSrc = vwContent.getAttribute('data-preview');
						vwContent.src = previewSrc;
						console.log(vwContent.src);
						if(!previewSrc) return;
						

					}
				} else {
					
					this.classList.add('vw--open');
					vwContent.controls = true;
					vwContent.muted = false;
					vwContent.loop = false;

					const fullSrc = e.target.getAttribute('data-src');
					if (!fullSrc)return;
					e.target.src = fullSrc;
				}
 			}

		});

		vwContent.addEventListener('ended', function (e) {
			vw.classList.remove('vw--open');
			vwContent.load();
			vwContent.muted = true;
			vwContent.controls = false;
			vwContent.loop = true;
			const previewSrc = e.target.getAttribute('data-preview');
			if (!previewSrc) return;
			e.target.src = previewSrc;
			
		});

	}

}