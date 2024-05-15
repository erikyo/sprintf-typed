type Specifiers = {
	s: string;
	d: number;
	b: boolean;
	"%": string;
	D: Date;
};
export type S = keyof Specifiers;

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

export type SprintfArgs<T extends string> =
	ExtractUnnamedPlaceholders<T> extends never
		? [values: ExtractNamedPlaceholders<T>]
		: ExtractUnnamedPlaceholders<T>;
