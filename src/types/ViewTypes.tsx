import { Views } from "../enums/view-type";

const { LIST, TILE } = Views;

export type ViewTypes = typeof LIST | typeof TILE;
