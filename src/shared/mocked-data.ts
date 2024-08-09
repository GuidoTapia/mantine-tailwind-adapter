import { type Config } from "tailwindcss";

export const shirtSizes = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
];
export const tailwindColorShades = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

export const tailwindExtendedColorShades = [
  "50",
  ...tailwindColorShades,
  "950",
];

export type UnitType = "numeric" | "px" | "rem" | "em";

export function randomInteger(rangeA: number, rangeB: number = 0) {
  const min = Math.min(rangeA, rangeB);
  const max = Math.max(rangeA, rangeB);

  return Math.floor(Math.random() * (max - min) + min);
}

export function formatToUnit(value: number, unit: UnitType) {
  switch (unit) {
    case "numeric":
      return value;
    case "px":
      return `${value}px`;
    case "rem":
      return `${value}rem`;
    case "em":
      return `${value}em`;
    default:
      return value;
  }
}

export function randomString(stringLength: number) {
  const chars = "abcdefghiklmnopqrstuvwxyz";
  return Array.from(
    { length: stringLength },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join();
}

export function randomColor() {
  const chars = "0123456789ABCDEF";
  return `#${Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join()}`;
}
