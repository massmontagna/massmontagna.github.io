(function () {
	'use strict';

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var header = document.getElementById('site-header');
	var navToggle = document.getElementById('nav-toggle');
	var navLinks = document.getElementById('nav-links');

	document.getElementById('year').textContent = new Date().getFullYear();

	/* Theme toggle */
	document.getElementById('theme-toggle').addEventListener('click', function () {
		var root = document.documentElement;
		var next = root.dataset.theme === 'light' ? 'dark' : 'light';
		root.dataset.theme = next;
		try { localStorage.setItem('theme', next); } catch (e) {}
	});

	/* Mobile nav */
	function setNav(open) {
		navToggle.setAttribute('aria-expanded', String(open));
		navLinks.classList.toggle('is-open', open);
	}
	navToggle.addEventListener('click', function () {
		setNav(navToggle.getAttribute('aria-expanded') !== 'true');
	});
	navLinks.addEventListener('click', function (e) {
		if (e.target.closest('a')) setNav(false);
	});
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') setNav(false);
	});

	/* Header: border once scrolled, hide on scroll down, show on scroll up */
	var lastY = 0;
	window.addEventListener('scroll', function () {
		var y = window.scrollY;
		header.classList.toggle('is-scrolled', y > 10);
		var menuOpen = navToggle.getAttribute('aria-expanded') === 'true';
		header.classList.toggle('is-hidden', y > lastY && y > 200 && !menuOpen);
		lastY = y;
	}, { passive: true });

	/* Scroll reveal (staggered within each parent) */
	var reveals = document.querySelectorAll('.reveal');
	reveals.forEach(function (el) {
		var siblings = el.parentElement.querySelectorAll(':scope > .reveal');
		el.style.setProperty('--d', (Array.prototype.indexOf.call(siblings, el) * 0.09) + 's');
	});
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
		reveals.forEach(function (el) { io.observe(el); });
	} else {
		reveals.forEach(function (el) { el.classList.add('is-visible'); });
	}

	/* Active nav link */
	var links = {};
	navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
	if ('IntersectionObserver' in window) {
		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting && links[entry.target.id]) {
					Object.keys(links).forEach(function (k) { links[k].classList.remove('is-active'); });
					links[entry.target.id].classList.add('is-active');
				}
			});
		}, { rootMargin: '-45% 0px -50% 0px' });
		Object.keys(links).forEach(function (id) {
			var section = document.getElementById(id);
			if (section) spy.observe(section);
		});
	}

	/* Cursor-follow glow on cards */
	document.querySelectorAll('.card--glow').forEach(function (card) {
		card.addEventListener('pointermove', function (e) {
			var r = card.getBoundingClientRect();
			card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
			card.style.setProperty('--my', (e.clientY - r.top) + 'px');
		});
	});

	/* Hero: animated telemetry traces */
	var canvas = document.getElementById('trace-canvas');
	if (!canvas || !canvas.getContext) return;
	var ctx = canvas.getContext('2d');
	var w, h, dpr, running = true, mouseX = 0.5, mouseY = 0.5, tx = 0.5, ty = 0.5;

	// Each channel is a sum of sines with its own speed, amplitude and vertical band.
	var channels = [
		{ y: 0.28, amp: 26, f: [0.006, 0.013], s: [0.55, 0.9],  p: [0, 1.7],   a: 0.55, lw: 1.6 },
		{ y: 0.42, amp: 18, f: [0.009, 0.021], s: [0.8, -0.6],  p: [2.1, 0.4], a: 0.35, lw: 1.2 },
		{ y: 0.60, amp: 34, f: [0.005, 0.011], s: [-0.45, 0.7], p: [4.0, 2.6], a: 0.5,  lw: 1.6 },
		{ y: 0.74, amp: 14, f: [0.011, 0.027], s: [0.9, -1.1],  p: [1.1, 5.0], a: 0.28, lw: 1 },
		{ y: 0.86, amp: 22, f: [0.007, 0.016], s: [-0.7, 0.5],  p: [3.3, 0.9], a: 0.38, lw: 1.2 }
	];

	function resize() {
		var rect = canvas.getBoundingClientRect();
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		w = rect.width; h = rect.height;
		canvas.width = w * dpr; canvas.height = h * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function draw(t) {
		t = t / 1000;
		tx += (mouseX - tx) * 0.04;
		ty += (mouseY - ty) * 0.04;
		var rgb = getComputedStyle(document.documentElement).getPropertyValue('--trace-rgb').trim() || '96, 165, 250';
		ctx.clearRect(0, 0, w, h);

		// faint grid, like a data-logging plot
		ctx.strokeStyle = 'rgba(' + rgb + ', 0.06)';
		ctx.lineWidth = 1;
		ctx.beginPath();
		for (var gx = 0; gx < w; gx += 80) { ctx.moveTo(gx, 0); ctx.lineTo(gx, h); }
		for (var gy = 0; gy < h; gy += 80) { ctx.moveTo(0, gy); ctx.lineTo(w, gy); }
		ctx.stroke();

		channels.forEach(function (c, i) {
			var depth = 1 + i * 0.35;
			var offX = (tx - 0.5) * 30 * depth;
			var offY = (ty - 0.5) * 20 * depth;
			ctx.beginPath();
			for (var x = 0; x <= w; x += 4) {
				var yy = c.y * h + offY +
					Math.sin(x * c.f[0] + t * c.s[0] + c.p[0] + offX * 0.01) * c.amp +
					Math.sin(x * c.f[1] + t * c.s[1] + c.p[1]) * c.amp * 0.4;
				if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
			}
			var g = ctx.createLinearGradient(0, 0, w, 0);
			g.addColorStop(0, 'rgba(' + rgb + ', 0)');
			g.addColorStop(0.35, 'rgba(' + rgb + ', ' + c.a + ')');
			g.addColorStop(1, 'rgba(' + rgb + ', ' + (c.a * 0.3) + ')');
			ctx.strokeStyle = g;
			ctx.lineWidth = c.lw;
			ctx.stroke();
		});
	}

	function loop(now) {
		if (!running) return;
		draw(now);
		requestAnimationFrame(loop);
	}

	resize();
	window.addEventListener('resize', function () { resize(); if (reduceMotion) draw(2000); });
	if (reduceMotion) { draw(2000); return; }

	window.addEventListener('pointermove', function (e) {
		mouseX = e.clientX / window.innerWidth;
		mouseY = e.clientY / window.innerHeight;
	}, { passive: true });

	// Pause when the hero is offscreen or the tab is hidden.
	function setRunning(v) {
		if (v && !running) { running = true; requestAnimationFrame(loop); }
		else if (!v) running = false;
	}
	var heroVisible = true;
	new IntersectionObserver(function (entries) {
		heroVisible = entries[0].isIntersecting;
		setRunning(heroVisible && !document.hidden);
	}).observe(canvas);
	document.addEventListener('visibilitychange', function () { setRunning(heroVisible && !document.hidden); });
	requestAnimationFrame(loop);
})();
