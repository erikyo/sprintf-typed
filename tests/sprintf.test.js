import assert from "node:assert";
import { describe, it } from "node:test";

import sprintf from "../dist/index.js";

describe("tests sprintf types", () => {
	it("should work", () => {
		console.log();
		assert(sprintf("Hello %s", "Erik") === "Hello Erik", "yup");
	});
	it("it works as expected", () => {
		sprintf(
			"this is a %s and it is %b years old, right?%d %D",
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
