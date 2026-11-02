import * as Paths from "../routes/paths";

// Union of every path value in routes/paths, e.g. "/" | "/sale" | "/contact"
export type RoutePath = (typeof Paths)[keyof typeof Paths];

export type TitleMap = Record<RoutePath, string>;
