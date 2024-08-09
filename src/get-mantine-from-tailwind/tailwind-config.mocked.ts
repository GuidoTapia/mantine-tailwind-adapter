import { type Config } from "tailwindcss";
import {
  KeyValuePair,
  ResolvableTo,
  ScreensConfig,
} from "tailwindcss/types/config";
import {
  shirtSizes,
  tailwindColorShades,
  tailwindExtendedColorShades,
  randomInteger,
  formatToUnit,
  randomString,
  randomColor,
  type UnitType,
} from "../shared/mocked-data";

export function mockShirtSizeObject(
  valuesUnit: UnitType = "px",
  initValue: number,
  standardSizes: number = 5,
  randomKeys: number = 0
): ResolvableTo<KeyValuePair> {
  return Object.fromEntries([
    ...shirtSizes
      .slice(0, standardSizes)
      .map((size, index) => [
        size,
        formatToUnit(Math.pow(initValue, index + 1), valuesUnit),
      ]),
    ...Array.from({ length: randomKeys }, () => [
      randomString(8),
      formatToUnit(randomInteger(1, 33), valuesUnit),
    ]),
  ]);
}

export function mockTailwindColorsObject(
  colorGroupsAmount: number,
  singleColorsAmount: number,
  includeExtendedShades: boolean = false,
  randomValues: number = 0
): ResolvableTo<KeyValuePair> {
  return Object.fromEntries([
    ...Array.from({ length: colorGroupsAmount }, () => [
      randomString(8),
      Object.fromEntries([
        ...(includeExtendedShades
          ? tailwindExtendedColorShades.map((shade) => [shade, randomColor()])
          : tailwindColorShades.map((shade) => [shade, ""])),
        ...Array.from({ length: randomValues }, () => [
          randomString(8),
          randomColor(),
        ]),
      ]),
    ]),
    ...Array.from({ length: singleColorsAmount }, () => [
      randomString(8),
      randomColor(),
    ]),
  ]);
}

function getTailwindFontSize(
  value: number,
  unit: UnitType,
  include?: {
    lineHeight: boolean;
    letterSpacing: boolean;
    fontWeight: boolean;
  },
  fontWeight: number = 400
) {
  if (include && (include.letterSpacing || include.fontWeight)) {
    return [
      formatToUnit(value, unit),
      Object.fromEntries(
        Object.entries(include)
          .filter(([_, includeBool]) => includeBool)
          .map(([key]) => [
            key,
            key === "fontWeight" ? fontWeight : formatToUnit(value, unit),
          ])
      ),
    ];
  }
  if (include && include.lineHeight) {
    return [formatToUnit(value, unit), formatToUnit(value, unit)];
  }
  return formatToUnit(value, unit);
}

export function mockTailwindFontSizesObject(
  valuesUnit: UnitType = "px",
  standardSizes: number = 5,
  randomKeys: number = 0,
  include?: {
    lineHeight: boolean;
    letterSpacing: boolean;
    fontWeight: boolean;
  }
): ResolvableTo<
  KeyValuePair<
    string,
    | string
    | [fontSize: string, lineHeight: string]
    | [
        fontSize: string,
        configuration: Partial<{
          lineHeight: string;
          letterSpacing: string;
          fontWeight: string | number;
        }>
      ]
  >
> {
  const initValue =
    valuesUnit === "numeric" || valuesUnit === "px"
      ? randomInteger(10, 19)
      : randomInteger(6, 17) / 10;
  const initWeight = 100;

  return Object.fromEntries([
    ...shirtSizes
      .slice(0, standardSizes)
      .map((size, index) => [
        size,
        getTailwindFontSize(
          initValue +
            (valuesUnit === "numeric" || valuesUnit === "px"
              ? 2 * index
              : 0.2 * index),
          valuesUnit,
          include,
          initWeight + index * 100
        ),
      ]),
    ...Array.from({ length: randomKeys }, () => [
      randomString(8),
      getTailwindFontSize(
        valuesUnit === "numeric" || valuesUnit === "px"
          ? randomInteger(10, 19)
          : randomInteger(6, 17) / 10,
        valuesUnit,
        include,
        randomInteger(1, 10) * 100
      ),
    ]),
  ]);
}

function getTailwindBreakpoint(
  format: "string" | "min" | "max" | "minMax" | "raw",
  value: number
) {
  switch (format) {
    case "string":
      return `${value}px`;
    case "min":
      return { min: `${value}px` };
    case "max":
      return { max: `${value}px` };
    case "minMax":
      return { min: `${value}px`, max: `${value + 240}px` };
    default:
  }
}

export function mockTailwindBreakpointsObject(
  format: "string" | "min" | "max" | "minMax" | "raw",
  standardSizes: number = 5,
  randomKeys: number = 0
): ResolvableTo<ScreensConfig> {
  const initValue = randomInteger(240, 360);

  return Object.fromEntries([
    ...shirtSizes.slice(0, standardSizes).map((size, index) => {
      return [size, getTailwindBreakpoint(format, initValue + 240 * index)];
    }),
    ...Array.from({ length: randomKeys }, () => [
      randomString(8),
      getTailwindBreakpoint(format, randomInteger(240, 1200)),
    ]),
  ]);
}
