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
	if (typeof window === "undefined") {
		return util.format(format, ...args);
	}

	return format.replaceAll(
		/%([sfdD]|%\([^)]*\))/g,
		(match: string, flag: string, width?: number): string => {
			const value: unknown = args[index++];

			switch (flag) {
				case "s":
					return value as string;
				case "D":
					return new Date(String(value)).toISOString();
				case "d":
					return Number.parseInt(value as string, 10).toString();
				case "f":
					return Number.parseFloat(value as string).toString();
				default:
					if (match) return value as string;
					return match;
			}
		},
	);
}

export default sprintf;
