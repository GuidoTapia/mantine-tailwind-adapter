import { describe, expect, test } from "vitest";
import { getColors, getTailwindConfig } from "./get-tailwind-from-mantine";
import { objectMantineToTailwind } from "./get-tailwind-from-mantine";
import {
  mockMantineColorsObject,
  mockShirtSizeObject,
} from "./mantine-config.mocked";

describe("Generic Mantine to Tailwind object Adapter", () => {
  const genericMantineObject = mockShirtSizeObject("numeric", 2, 5, 3);

  const resultTailwindObject = objectMantineToTailwind(genericMantineObject);

  test("Generated object has all the keys from both objects", () => {
    const keys = new Set([...Object.keys(genericMantineObject)]);
    expect(resultTailwindObject).not.toBeUndefined();
    if (resultTailwindObject) {
      expect(Object.keys(resultTailwindObject).length).toBe(keys.size);
      Object.keys(resultTailwindObject).forEach((mantineKey) => {
        expect(keys.has(mantineKey)).toBe(true);
      });
    }
  });

  test("Correct values and predominance", () => {
    expect(resultTailwindObject).not.toBeUndefined();
    if (resultTailwindObject) {
      Object.keys(resultTailwindObject).forEach((key) =>
        expect(resultTailwindObject[key]).toBe(genericMantineObject[key])
      );
    }
  });
});

describe("Mantine to Tailwind colors Adapter", () => {
  const mantineColorsObject = mockMantineColorsObject(2, 2);

  const resultTailwindObject = getColors(mantineColorsObject);

  test("Generated object has all the original colors", () => {
    const keys = new Set(Object.keys(mantineColorsObject));

    expect(resultTailwindObject).not.toBeUndefined();
    if (resultTailwindObject) {
      expect(Object.keys(resultTailwindObject).length).toBe(keys.size);
      Object.entries(resultTailwindObject).forEach(([key, colorsObj]) => {
        expect(keys.has(key)).toBe(true);

        Object.values(colorsObj).forEach((color) =>
          expect(mantineColorsObject[key]?.includes(color as string)).toBe(true)
        );
      });
    }
  });

  test("All colors from generated object has the right keys", () => {
    const colorKeys = [
      "50",
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "950",
    ];

    expect(resultTailwindObject).not.toBeUndefined();
    if (resultTailwindObject) {
      Object.values(resultTailwindObject).forEach((colorsObj) => {
        Object.keys(colorsObj).forEach((key, i) =>
          i < 11
            ? expect(key).toBe(colorKeys[i])
            : expect(key).toBe(`mantine-${i + 1}`)
        );
      });
    }
  });
});
