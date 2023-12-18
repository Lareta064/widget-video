document.addEventListener('DOMContentLoaded', ()=>{

	const vwWrapper = document.querySelector('#video-widget');
	const youtubeWrapper = document.querySelector('#youtube-wrapper');
	const customWrapper = document.querySelector('#custom-wrapper');

	// Attach logic to YT videos
	for(let yVideo of youtubeWrapper.children){
		yVideoHandler(yVideo);
	}

	// Attach logic to Custom videos
	for (let cVideo of customWrapper.children)
	{
		cVideoHandler(cVideo);
	}

	function yVideoHandler(yVideo){

		function yVideoCloseHandler(e, yVideo) {
			console.log('CLICKED YV CLOSE BTN!');
			console.log(yVideo);

			e.preventDefault();
			if (!(yVideo instanceof HTMLElement)) return;
			yVideo.classList.add('d-none');
		}

		const closeBtn = yVideo.querySelector('.video-widget__close');
		const videoLink = yVideo.querySelector('a[href^="https://www.youtube.com"]');

		if (closeBtn && videoLink)
		{
			closeBtn.addEventListener('click', (e) => yVideoCloseHandler(e, yVideo))
			console.log('LISTENER ATTACHED TO YT VIDEO!');
		}
	}

	function cVideoHandler(cVideo){
		const closeBtn = cVideo.querySelector('.video-widget__close');
		const video = cVideo.querySelector('video');

		if (closeBtn && video) {
			closeBtn.addEventListener('click', 
				(e) => cVideoCloseHandler({event: e, wrapper: cVideo, video }));

			video.addEventListener('click', 
				(e) => cVideoClickHandler({ event: e, wrapper: cVideo, video }));

			console.log('LISTENERS ATTACHED TO CUSTOM VIDEO!');
		}

		function cVideoCloseHandler(argumentObj) {
			console.log('CUSTOM VIDEO BTN HANDLER FIRED!');
			
			// Destructure argument
			const { event, wrapper, video } = argumentObj;
			
			// Argument Guard clause
			if (
				!event 
				|| !wrapper 
				|| !video
				|| !event instanceof PointerEvent
				|| !(wrapper instanceof HTMLElement)
				|| !(video instanceof HTMLVideoElement)
				) return;

			// Stop default behaviour
			event.preventDefault();

			// If container minimized -> close video entirely
			if (!wrapper.classList.contains('vw--open'))
				cVideoClose();
			// If container maximized and video has poster
			else if (video.getAttribute('poster')) 
				cVideoCollapsePoster()
			// If container maximized and video has preview
			else
				cVideoCollapsePreview();
			
			function cVideoCollapsePoster() {
				console.log('CUSTOM VIDEO - COLLAPSE WITH POSTER FIRED!');
				wrapper.classList.remove('vw--open');
				video.muted = true;
				video.controls = false;
				video.pause();
				video.load();
				video.currentTime = 0;
			};

			function cVideoCollapsePreview(){
				console.log('CUSTOM VIDEO - COLLAPSE WITH PREVIEW FIRED!');
				wrapper.classList.remove('vw--open');
				video.muted = true;
				video.controls = false;
				video.loop = true;

				const previewSrc = video.getAttribute('data-preview');

				if(!previewSrc) return;

				video.src = previewSrc;
			}

			function cVideoClose() {
				console.log('CUSTOM VIDEO CLOSE FIRED!');
				video.pause();
				wrapper.classList.add('d-none');
			};
		}

		function cVideoClickHandler(argumentObj) {
			console.log('CUSTOM VIDEO CLICKED!');

			const { event, wrapper, video } = argumentObj;
			console.log(event, wrapper, video)
			// Argument Guard clause
			if (
				!event
				|| !wrapper
				|| !video
				|| !event instanceof PointerEvent
				|| !(wrapper instanceof HTMLElement)
				|| !(video instanceof HTMLVideoElement)
			) return;

			// Stop default behaviour
			event.preventDefault();

			// If container minimized
			if (!wrapper.classList.contains('vw--open'))
				cVideoClickMinimized();

			// If container maximized
			else
				cVideoClickMaximized();

			function cVideoClickMaximized(){
				console.log('CLICKED MAXIMIZED VIDEO!');
				// If paused
				if(video.paused)
					cVideoClickMaxPaused();

				// If playing
				else
					cVideoClickMaxPlaying();

				function cVideoClickMaxPaused(){
					console.log('CLICKED MAXIMIZED PAUSED!');
					video.play();
					video.muted = false; 
				};

				function cVideoClickMaxPlaying(){
					console.log('CLICKED MAXIMIZED PLAYING!');
					video.pause(); 
					video.muted = true;
				};
			};

			function cVideoClickMinimized(){
				console.log('CLICKED MINIMIZED VIDEO!');
				wrapper.classList.add('vw--open');
				// If with poster
				if (video.getAttribute('poster'))
					cVideoClickMinPoster();
				
				// If with preview
				else
					cVideoClickMinPreview();
				

				function cVideoClickMinPoster(){
					console.log('CLICKED MINIMIZED VIDEO WITH POSTER!');
					video.controls = true;
					video.play();
				};

				function cVideoClickMinPreview(){
					console.log('CLICKED MINIMIZED VIDEO WITH POSTER!');

					video.controls = true;
					video.muted = false;
					video.loop = false;

					const fullSrc = video.getAttribute('data-src');
					if (!fullSrc) return;
					video.src = fullSrc;
				};

			};
		}
	}
})



// const vidWidget = document.querySelector('.video-widget');
// if (vidWidget){
// 	const vidWidgetClose = vidWidget.querySelectorAll('.video-widget__close');
	
// 	/* ===== remove widget =====*/
// 	for (let item of vidWidgetClose){
// 		item.addEventListener('click', function(){
// 			vidWidget.remove();
// 		})
// 	}

	

// 	/*===== widget as mp4 clip ======  */
// 	const vw = vidWidget.querySelector('.vw');
// 	if (vw) {

// 		const vwContent = vw.querySelector('#vw-video');
// 		const vwClose = vw.querySelector('.vw__close');
// 		const collapseBtn = vw.querySelector('.video__collapse');

// 		vw.addEventListener('click', function (e) {
// 			e.preventDefault();
			
// 			if (e.target != vwClose) {
// 				const attrPoster = vwContent.getAttribute('poster');
// 				console.log(attrPoster);
// 				// Click the video with the poster
// 				if (attrPoster != null){
// 					// Video is maximized
// 					if (vw.classList.contains('vw--open')) {
// 						// Clicked video body
// 						if (e.target != collapseBtn) {	
// 							// Continue play
// 							if (vwContent.paused) { 
// 								vwContent.play(); 
// 								vwContent.muted = false; 
// 							}						
// 							// Pause the video and mute
// 							else { vwContent.pause(); vwContent.muted = true; }	
							
// 						} 
// 						// Clicked collapse btn
// 						else {
// 							this.classList.remove('vw--open');
// 							vwContent.muted = true;
// 							vwContent.controls = false;
// 							vwContent.pause();
// 							vwContent.load();
// 							vwContent.currentTime = 0;
							
// 						}
// 					} 
// 					// Video is minimized
// 					else {
// 						this.classList.add('vw--open');
// 						vwContent.controls = true;
// 						vwContent.play();
						
// 					}					
// 				}
// 				// Click the video with video-preview
// 				else{
// 					// Video is maximized
// 					if (vw.classList.contains('vw--open')) {
// 						// Clicked video body
// 						if (e.target != collapseBtn){
// 							// Continue paused video
// 							if (vwContent.paused) {
// 								vwContent.play();
								
// 							}
// 							// Pause video
// 							else { vwContent.pause(); }	
// 						}
// 						// Clicked collapse btn
// 						else{
// 							this.classList.remove('vw--open');
// 							vwContent.muted = true;
// 							vwContent.controls = false;
// 							vwContent.loop = true;

// 							const previewSrc = vwContent.getAttribute('data-preview');
// 							vwContent.src = previewSrc;
							
// 							if(!previewSrc) return;
							

// 						}
// 					} 
// 					// Video is minimized
// 					else {
						
// 						this.classList.add('vw--open');
// 						vwContent.controls = true;
// 						vwContent.muted = false;
// 						vwContent.loop = false;

// 						const fullSrc = e.target.getAttribute('data-src');
// 						if (!fullSrc)return;
// 						e.target.src = fullSrc;
// 					}
// 				}
				
//  			}

// 		});

// 		vwContent.addEventListener('ended', function (e) {
// 			vw.classList.remove('vw--open');
// 			vwContent.load();
// 			vwContent.muted = true;
// 			vwContent.controls = false;
// 			vwContent.loop = true;
// 			const previewSrc = e.target.getAttribute('data-preview');
// 			if (!previewSrc) return;
// 			e.target.src = previewSrc;
			
// 		});

// 	}

// }