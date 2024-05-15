## node
sprintf Typed:
2 212 784 ops/s, ±0.84%   | fastest

fastPrintf:
418 153 ops/s, ±14.51%     | 81.1% slower

tannin Sprintf:
982 603 ops/s, ±0.67%     | 55.59% slower

extsprintf:
652 827 ops/s, ±0.90%     | 70.5% slower

sprintf Js:
304 920 ops/s, ±20.28%     | slowest, 86.22% slower

Finished 5 cases!
Fastest: sprintf Typed
Slowest: sprintf Js

Saved to: benchmark\results\sprintf-node.json

## window
sprintf Typed:
969 634 ops/s, ±0.91%   | fastest

fastPrintf:
184 477 ops/s, ±67.45%   | 80.97% slower

tannin Sprintf:
239 435 ops/s, ±4.17%   | 75.31% slower

extsprintf:
157 016 ops/s, ±4.30%   | 83.81% slower

sprintf Js:
73 402 ops/s, ±66.86%    | slowest, 92.43% slower

Finished 5 cases!
Fastest: sprintf Typed
Slowest: sprintf Js

Saved to: benchmark\results\sprintf-window.json




