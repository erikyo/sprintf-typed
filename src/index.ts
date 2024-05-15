// node internal library
import * as util from "node:util";
// types
import type { SprintfArgs } from "./types";

/**
 * The sprintf function
 *
 * @param format
 * @param args
 */
export function sprintf<T extends string>(
	format: T,
	...args: SprintfArgs<T>
): string {
	let index = 0;
	if (typeof process !== "undefined") {
		return util.format(format, ...args);
	}

	/**
	 * The format specifier
	 *
	 * @param match
	 * @param flag
	 * @param width
	 */
	const formatSpecifier = (
		match: string,
		flag: string,
		width?: number,
	): string => {
		const value: unknown = args[index++];

		switch (flag) {
			case "s":
				return String(value);
			case "D":
				return new Date(String(value)).toISOString();
			case "d":
				return Number.parseInt(value as string, 10).toString();
			case "f":
				return Number.parseFloat(value as string).toString();
			default:
				if (match) return match;
		}
	};

	return format.replaceAll(/%([sfdD]|%\([^)]*\))/g, formatSpecifier);
}

export default sprintf;
