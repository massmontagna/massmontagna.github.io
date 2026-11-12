(function () {
	'use strict';

	document.getElementById('year').textContent = new Date().getFullYear();

	/* Hero chart: yaw rate gain (same formula as the code shown above it) */
	var chartCanvas = document.getElementById('yaw-chart');
	if (chartCanvas && chartCanvas.getContext) initYawChart(chartCanvas);

	function initYawChart(cv) {
		var cx = cv.getContext('2d');
		var L = 2.8, vMax = 50, yMax = 6, duration = 2.2;
		// Curves are told apart by dash pattern as well as weight, not colour alone.
		var curves = [{ k: 0.003, dash: [6, 4], w: 1.5 }, { k: 0.005, dash: [], w: 2.25 }, { k: 0.008, dash: [1.5, 3.5], w: 1.75 }];
		var pad = { l: 30, r: 64, t: 24, b: 24 };
		var W, H, start = 0, done = false;
		var gain = function (v, k) { return v / (L + k * v * v); };
		var ease = function (x) { return 1 - Math.pow(1 - x, 3); };
		var style = getComputedStyle(document.documentElement);
		var css = function (name) { return style.getPropertyValue(name).trim(); };

		function size() {
			var r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
			W = r.width; H = r.height;
			cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
			cx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}
		function px(v) { return pad.l + (v / vMax) * (W - pad.l - pad.r); }
		function py(g) { return H - pad.b - (g / yMax) * (H - pad.t - pad.b); }

		function draw(t) {
			var dim = css('--text-dim'), rule = css('--rule'), accent = css('--accent');
			cx.clearRect(0, 0, W, H);
			cx.font = '11px ' + css('--font-mono');
			cx.lineWidth = 1; cx.setLineDash([]);
			cx.fillStyle = dim; cx.strokeStyle = rule;

			cx.textAlign = 'center'; cx.textBaseline = 'top';
			for (var x = 0; x <= vMax; x += 10) cx.fillText(x, px(x), H - pad.b + 8);
			cx.textAlign = 'right'; cx.textBaseline = 'middle';
			for (var y = 0; y <= yMax; y += 2) {
				cx.beginPath(); cx.moveTo(pad.l, py(y)); cx.lineTo(W - pad.r, py(y)); cx.stroke();
				cx.fillText(y, pad.l - 8, py(y));
			}
			cx.textAlign = 'left'; cx.textBaseline = 'top';
			cx.fillText('yaw rate gain, 1/s', pad.l, 0);
			cx.fillText('m/s', px(vMax) + 10, H - pad.b + 8);

			curves.forEach(function (c, i) {
				var p = Math.min(Math.max((t - i * 0.3) / 1.4, 0), 1);
				if (p <= 0) return;
				var vEnd = vMax * ease(p);
				cx.beginPath();
				for (var v = 0; v <= vEnd; v += 0.5) {
					if (v === 0) cx.moveTo(px(v), py(gain(v, c.k))); else cx.lineTo(px(v), py(gain(v, c.k)));
				}
				cx.strokeStyle = accent; cx.lineWidth = c.w; cx.setLineDash(c.dash); cx.stroke();
				if (p >= 1) {
					cx.fillStyle = accent; cx.textBaseline = 'middle';
					cx.fillText('k=' + c.k, px(vMax) + 8, py(gain(vMax, c.k)));
				}
			});
			cx.setLineDash([]);
		}

		function frame(now) {
			if (!start) start = now;
			var t = (now - start) / 1000;
			draw(t);
			if (t < duration) requestAnimationFrame(frame); else done = true;
		}

		size();
		// Redraw with the new colours if the OS switches light/dark.
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { draw(done ? duration : 0); });
		if (window.ResizeObserver) new ResizeObserver(function () { size(); draw(done ? duration : 0); }).observe(cv);
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
			done = true; draw(duration); return;
		}
		draw(0);
		// Draw the curves in once, the first time the chart is on screen.
		var io = new IntersectionObserver(function (e) {
			if (e[0].isIntersecting) { io.disconnect(); requestAnimationFrame(frame); }
		}, { threshold: 0.4 });
		io.observe(cv);
	}
})();
