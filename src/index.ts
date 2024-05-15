import * as util from "node:util";
type Specifiers = {
	s: string;
	d: number;
	b: boolean;
	D: Date;
};
type S = keyof Specifiers;

type ExtractNamedPlaceholders<T extends string> =
	T extends `${string}%(${infer Key})${infer Spec}${infer Rest}`
		? Spec extends S
			? { [K in Key]: Specifiers[Spec] } & ExtractNamedPlaceholders<Rest>
			: never
		: Record<string, unknown>;

type ExtractUnnamedPlaceholders<T extends string> =
	T extends `${string}%${infer Spec}${infer Rest}`
		? Spec extends S
			? [Specifiers[Spec], ...ExtractUnnamedPlaceholders<Rest>]
			: never
		: [];

type SprintfArgs<T extends string> = ExtractUnnamedPlaceholders<T> extends never
	? [values: ExtractNamedPlaceholders<T>]
	: ExtractUnnamedPlaceholders<T>;

/**
 * The sprintf function
 *
 * @param format
 * @param args
 */
export default function sprintf<T extends string>(
	format: T,
	...args: SprintfArgs<T>
): string {
	let index = 0;
	if (
		typeof process !== "undefined" &&
		process.versions &&
		process.versions.node
	) {
		return util.format(format, ...args);
	}

	/**
	 * The format specifier
	 *
	 * @param match
	 * @param a
	 */
	const formatSpecifier = (match: string, ...a: unknown[]): string => {
		// @ts-ignore
		const { flag, width, precision, type } = a;
		let value: unknown;

		if (type === "%") {
			return "%";
		}

		// Get the argument to format
		if (index < args.length) {
			value = args[index++];
		} else {
			return "";
		}

		switch (type) {
			case "(":
				value = String(value);
				break;
			case "s":
				value = String(value);
				break;
			case "d":
				value = Number.parseInt(value as string, 10);
				break;
			case "f":
				value = Number.parseFloat(value as string);
				if (precision !== undefined) {
					value = (value as number).toFixed(precision);
				}
				break;
			default:
				return match;
		}

		// Apply width padding
		if (width !== undefined) {
			const paddingChar: string = flag === "0" ? "0" : " ";
			value = String(value);
			const padLength = width - (value as string).length;
			if (padLength > 0) {
				const padding = paddingChar.repeat(padLength);
				value = flag === "-" ? value + padding : padding + value;
			}
		}

		return value as string;
	};

	return format.replace(
		/%([-+0#]*)(\d+)?(?:\.(\d+))?([sd%f])/g,
		formatSpecifier,
	);
}
