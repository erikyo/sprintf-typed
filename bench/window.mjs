/**
 * External dependencies
 */
import b from "benny";

/**
 * Internal dependencies
 */
import { default as tanninSprintf } from "@tannin/sprintf";
import { sprintf as extsprintf } from "extsprintf";
import { printf as fastPrintf } from "fast-printf";
import { sprintf as sprintfJs } from "sprintf-js";
import { sprintf as sprintfTyped } from "sprintf-typed";

const window = {
	test: true,
};

if (typeof window !== "undefined") {
	console.log("Testing window performance");
}

const rnd = Math.random();
console.log(sprintfTyped("string %s number %d %f", `STRING${rnd}`, rnd, rnd));
console.log(sprintfJs("string %s number %d %f", `STRING${rnd}`, rnd, rnd));
console.log(tanninSprintf("string %s number %d %f", `STRING${rnd}`, rnd, rnd));
console.log(extsprintf("string %s number %d %f", `STRING${rnd}`, rnd, rnd));
console.log(fastPrintf("string %s number %d %f", `STRING${rnd}`, rnd, rnd));

await b.suite(
	"window",

	b.add("sprintf Typed", () => {
		const rnd = Math.random();
		sprintfTyped(`${rnd} %s ${rnd} %d`, `STRING${rnd}`, rnd);
	}),

	b.add("fastPrintf", () => {
		const rnd = Math.random();
		fastPrintf(`${rnd} %s ${rnd} %d`, `STRING${rnd}`, rnd);
	}),

	b.add("tannin Sprintf", () => {
		const rnd = Math.random();
		tanninSprintf(`${rnd} %s ${rnd} %d`, `STRING${rnd}`, rnd);
	}),

	b.add("extsprintf", () => {
		const rnd = Math.random();
		extsprintf(`${rnd} %s ${rnd} %d`, `STRING${rnd}`, rnd);
	}),

	b.add("sprintf Js", () => {
		const rnd = Math.random();
		sprintfJs(`${rnd} %s ${rnd} %d`, `STRING${rnd}`, rnd);
	}),

	b.cycle(),
	b.complete(),
	b.save({ file: "sprintf-window", version: "1.0.0" }),
);
