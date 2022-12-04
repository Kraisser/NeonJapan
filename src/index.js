import 'normalize.css';
import './style.scss';
import Swiper, {Parallax, Mousewheel, FreeMode} from 'swiper';

const swiper = new Swiper('.swiperSliderWrapper', {
	modules: [Parallax, Mousewheel, FreeMode],
	freeMode: true,
	centeredSlides: true,
	mousewheel: true,
	parallax: true,
	slidesPerView: 1,
	breakpoints: {
		1200: {
			slidesPerView: 2.5,
		},
	},
});

document.querySelectorAll('.slide-item-bg-neon').forEach((item) => {
	const imgSrc = item.querySelector('.slide-image').getAttribute('src');
	item.insertAdjacentHTML('beforeend', `<img class='img-bg-neon' src='${imgSrc}' alt="img-bg" />`);
});

function animHeaderColor(selector, duration) {
	const timeLeft = duration / 180;
	const target = document.querySelector(selector);

	const style = window.getComputedStyle(target, null).backgroundImage;
	const styleValue = parseInt(style.match(/\d+deg/gm));
	if (styleValue) {
		const value = styleValue + 1 > 360 ? 1 : styleValue + 1;
		const changedValue = style.replace(/\d+deg/gm, value + 'deg');
		setBackground(target, changedValue);
	} else {
		const changedValue = style.replace(/(?<=gradient\()/gm, '181deg, ');
		setBackground(target, changedValue);
	}

	setTimeout(() => {
		animHeaderColor(selector, duration);
	}, timeLeft);
}

function setBackground(target, value) {
	target.style.backgroundImage = value;
}

// animHeaderColor('.headerWrapper', 4000);
