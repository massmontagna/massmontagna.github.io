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

	/* Hero card: yaw rate gain chart (same formula as the code shown beside it) */
	var chartCanvas = document.getElementById('yaw-chart');
	if (chartCanvas && chartCanvas.getContext) initYawChart(chartCanvas);

	function initYawChart(cv) {
		var cx = cv.getContext('2d');
		var L = 2.8, vMax = 50, yMax = 6;
		var curves = [{ k: 0.003, c: '--accent-2', a: 0.65 }, { k: 0.005, c: '--accent', a: 1 }, { k: 0.008, c: '--chart-3', a: 0.75 }];
		var pad = { l: 34, r: 56, t: 22, b: 26 };
		var W, H, dpr, running = false, start = 0, visible = true;
		var gain = function (v, k) { return v / (L + k * v * v); };
		var vch = Math.sqrt(L / curves[1].k);
		var ease = function (x) { return 1 - Math.pow(1 - x, 3); };

		function size() {
			var r = cv.getBoundingClientRect();
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			W = r.width; H = r.height;
			cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
			cx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}
		function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
		function px(v) { return pad.l + (v / vMax) * (W - pad.l - pad.r); }
		function py(g) { return H - pad.b - (g / yMax) * (H - pad.t - pad.b); }

		function draw(t) {
			var dim = css('--text-dim'), border = css('--border');
			cx.clearRect(0, 0, W, H);
			cx.font = '10px ' + css('--font-mono');
			cx.lineWidth = 1;

			// grid + ticks
			cx.fillStyle = dim; cx.strokeStyle = border;
			cx.textAlign = 'center'; cx.textBaseline = 'top';
			for (var x = 0; x <= vMax; x += 10) {
				cx.beginPath(); cx.moveTo(px(x), pad.t); cx.lineTo(px(x), H - pad.b); cx.stroke();
				cx.fillText(x, px(x), H - pad.b + 6);
			}
			cx.textAlign = 'right'; cx.textBaseline = 'middle';
			for (var y = 0; y <= yMax; y += 2) {
				cx.beginPath(); cx.moveTo(pad.l, py(y)); cx.lineTo(W - pad.r, py(y)); cx.stroke();
				cx.fillText(y, pad.l - 6, py(y));
			}
			cx.textAlign = 'left'; cx.textBaseline = 'top';
			cx.fillText(W < 400 ? 'gain (1/s)' : 'yaw rate gain (1/s)', pad.l, 4);
			cx.textAlign = 'left';
			cx.fillText('m/s', px(vMax) + 14, H - pad.b + 6);

			// curves draw in one after another
			curves.forEach(function (cv_, i) {
				var p = Math.min(Math.max((t - i * 0.35) / 1.4, 0), 1);
				if (p <= 0) return;
				var vEnd = vMax * ease(p), color = css(cv_.c);
				cx.beginPath();
				for (var v = 0; v <= vEnd; v += 0.5) {
					var X = px(v), Y = py(gain(v, cv_.k));
					if (v === 0) cx.moveTo(X, Y); else cx.lineTo(X, Y);
				}
				cx.globalAlpha = cv_.a; cx.strokeStyle = color; cx.lineWidth = i === 1 ? 2.2 : 1.6; cx.stroke();
				if (p >= 1) {
					cx.fillStyle = color; cx.textAlign = 'left'; cx.textBaseline = 'middle';
					cx.fillText('k=' + cv_.k, px(vMax) + 5, py(gain(vMax, cv_.k)));
				}
				cx.globalAlpha = 1;
			});

			// marker sweeping along the middle curve
			if (t > 2.4) {
				var u = reduceMotion ? vch / vMax : 0.5 + 0.5 * Math.sin((t - 2.4) * 0.55 - 1.2);
				var mv = 2 + u * (vMax - 4), mg = gain(mv, curves[1].k), mx = px(mv), my = py(mg);
				var accent = css('--accent-2');
				cx.strokeStyle = accent; cx.globalAlpha = 0.35; cx.setLineDash([3, 3]);
				cx.beginPath(); cx.moveTo(mx, my); cx.lineTo(mx, H - pad.b); cx.stroke();
				cx.setLineDash([]); cx.globalAlpha = 1;
				cx.fillStyle = accent; cx.beginPath(); cx.arc(mx, my, 3.5, 0, Math.PI * 2); cx.fill();
				cx.globalAlpha = 0.25; cx.beginPath(); cx.arc(mx, my, 8, 0, Math.PI * 2); cx.fill(); cx.globalAlpha = 1;
				cx.fillStyle = css('--text'); cx.textAlign = 'right'; cx.textBaseline = 'top';
				cx.fillText('v=' + mv.toFixed(1) + ' m/s' + (W < 400 ? '' : '   gain=' + mg.toFixed(2)), W - pad.r + 22, 4);
			}
		}

		function frame(now) {
			if (!running) return;
			draw((now - start) / 1000);
			requestAnimationFrame(frame);
		}
		function setRunning(v) {
			if (v && !running) { running = true; if (!start) start = performance.now(); requestAnimationFrame(frame); }
			else if (!v) running = false;
		}

		size();
		if (window.ResizeObserver) new ResizeObserver(function () { size(); if (!running) draw(10); }).observe(cv);
		if (reduceMotion) { draw(10); return; }
		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (e) { visible = e[0].isIntersecting; setRunning(visible && !document.hidden); }).observe(cv);
		} else { setRunning(true); }
		document.addEventListener('visibilitychange', function () { setRunning(visible && !document.hidden); });
	}

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
