import './style.css';

const track = document.querySelector('#carousel-track');
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dots = Array.from(document.querySelectorAll('.carousel-dot'));

if (track && slides.length > 0 && dots.length === slides.length) {
	let currentIndex = 0;
	const intervalMs = 5000;
	let timerId = null;

	const setSlide = (index) => {
		currentIndex = (index + slides.length) % slides.length;
		track.style.transform = `translateX(-${currentIndex * 100}%)`;
		dots.forEach((dot, dotIndex) => {
			dot.classList.toggle('is-active', dotIndex === currentIndex);
		});
	};

	const startAutoPlay = () => {
		if (timerId) {
			clearInterval(timerId);
		}
		timerId = setInterval(() => {
			setSlide(currentIndex + 1);
		}, intervalMs);
	};

	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			setSlide(index);
			startAutoPlay();
		});
	});

	document.addEventListener('visibilitychange', () => {
		if (document.hidden) {
			clearInterval(timerId);
			timerId = null;
		} else {
			startAutoPlay();
		}
	});

	setSlide(0);
	startAutoPlay();
}