import assert from "node:assert";
import { describe, it } from "node:test";

import sprintf from "../dist/index.js";

describe("tests sprintf types", () => {
	it("should work", () => {
		const p = process;
		// biome-ignore lint/suspicious/noGlobalAssign: <testing purposes>
		process = undefined;
		console.log(sprintf("Hello %s %d", "Erik", 404));
		assert(
			sprintf("Hello %s %d", "Erik", 404) === "Hello Erik 404",
			"Hello Erik 404",
		);
		// biome-ignore lint/suspicious/noGlobalAssign: <testing purposes>
		process = p;
	});
});

describe("tests sprintf", () => {
	it("it works as expected", () => {
		assert(sprintf("Hello %s", "Erik") === "Hello Erik", "Hello Erik");
		sprintf(
			"this is a %s and it has %d cats, right?%b %D",
			"erik",
			20,
			true,
			new Date(),
		); // not ok, wrong type
		sprintf(
			"this is a %s and it is %b%b%b%byears old, right?%d %D",
			"erik",
			20,
			true,
			new Date(),
		); // not ok, too many arguments
		sprintf("Hello %s", "John"); // ok
		sprintf("Hello %s", "John", "Doe"); // not ok, too many arguments
		sprintf("Hello %s", false); // not ok, wrong type
		sprintf("Hello %s", false); // not ok, wrong type
		sprintf("Ciao %(names)s", { names: "erik" }); // ok named placeholder
		sprintf("Ciao %(names)s %(years)d", { names: "erik", years: 20 }); // ok multiple named placeholder
		sprintf("Ciao %(names)s %(years)d", { names: "erik", years: "20" }); // not ok, wrong type
	});
});
