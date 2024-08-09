import {
  DefaultMantineColor,
  MantineColorsTuple,
  MantineSize,
} from "@mantine/core";
import { type Config } from "tailwindcss";
import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

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

const mantineColors = [
  "dark",
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "green",
  "lime",
  "yellow",
  "orange",
  "teal",
];

export function mockShirtSizeObject<T extends string>(
  valuesUnit: UnitType = "px",
  initValue: number,
  standardSizes: number = 5,
  randomKeys: number = 0
): Record<T | (string & {}), string> {
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

export function mockMantineColorsObject(
  additionalColorsAmount: number = 0,
  randomKeys: number = 0
): Record<DefaultMantineColor | string, MantineColorsTuple> {
  return Object.fromEntries([
    ...mantineColors.map((color) => [
      color,
      Array.from({ length: 10 + additionalColorsAmount }, () => randomColor()),
    ]),
    ...Array.from({ length: randomKeys }, () => [
      randomString(8),
      Array.from({ length: 10 + additionalColorsAmount }, () => randomColor()),
    ]),
  ]);
}
