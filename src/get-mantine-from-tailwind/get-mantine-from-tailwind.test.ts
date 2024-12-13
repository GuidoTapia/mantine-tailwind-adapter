import { expect, test, describe } from "vitest";
import {
  getBreakpoints,
  getColors,
  getFontSizes,
  getMantineTheme,
  objectTailwindToMantine,
} from "./get-mantine-from-tailwind";
import {
  mockShirtSizeObject,
  mockTailwindBreakpointsObject,
  mockTailwindColorsObject,
  mockTailwindFontSizesObject,
} from "./tailwind-config.mocked";

describe("Generic Tailwind to Mantine object Adapter", () => {
  const genericTailwindObject = mockShirtSizeObject("numeric", 2, 5, 3);
  const genericExtendTailwindObject = mockShirtSizeObject("numeric", 1, 2, 3);

  const resultMantineObject = objectTailwindToMantine(
    genericTailwindObject,
    genericExtendTailwindObject
  );

  test("Generated object has all the keys from both objects", () => {
    const keys = new Set([
      ...Object.keys(genericTailwindObject),
      ...Object.keys(genericExtendTailwindObject),
    ]);
    expect(resultMantineObject).not.toBeUndefined();
    if (resultMantineObject) {
      expect(Object.keys(resultMantineObject).length).toBe(keys.size);
      Object.keys(resultMantineObject).forEach((mantineKey) => {
        expect(keys.has(mantineKey)).toBe(true);
      });
    }
  });

  test("Correct values and predominance", () => {
    expect(resultMantineObject).not.toBeUndefined();
    if (resultMantineObject) {
      Object.keys(resultMantineObject).forEach((key) =>
        expect(resultMantineObject[key]).toBe(
          genericExtendTailwindObject[key] ?? genericTailwindObject[key]
        )
      );
    }
  });
});

describe("Tailwind to Mantine colors Adapter", () => {
  const tailwindColorsObject = mockTailwindColorsObject(10, 5, false);
  const extendedTailwindColorsObject = mockTailwindColorsObject(5, 2, true, 3);

  const resultMantineObject = getColors(
    tailwindColorsObject,
    extendedTailwindColorsObject
  );

  test("Generated object has all the colors from both objects", () => {
    const keys = new Set([
      ...Object.keys(tailwindColorsObject),
      ...Object.keys(extendedTailwindColorsObject),
    ]);
    expect(resultMantineObject).not.toBeUndefined();
    if (resultMantineObject) {
      expect(Object.keys(resultMantineObject).length).toBe(keys.size);
      Object.entries(resultMantineObject).forEach(([key, colorsArray]) => {
        expect(keys.has(key)).toBe(true);
        const tailwindValue =
          extendedTailwindColorsObject[key] ?? tailwindColorsObject[key];
        expect(keys.has(key)).not.toBeUndefined();
        if (typeof tailwindValue === "string") {
          expect(colorsArray?.includes(tailwindValue)).toBe(true);
        } else if (typeof tailwindValue === "object") {
          Object.values(tailwindValue).forEach((tailwindColor) =>
            expect(colorsArray?.includes(tailwindColor as string)).toBe(true)
          );
        }
      });
    }
  });

  test("All colors from generated object has at least 10 values", () => {
    expect(resultMantineObject).not.toBeUndefined();
    if (resultMantineObject) {
      Object.values(resultMantineObject).forEach((colorsArray) => {
        expect(colorsArray?.length).greaterThanOrEqual(10);
      });
    }
  });
});

describe("Tailwind to Mantine font sizes Adapter", () => {
  const tailwindFontsObject = mockTailwindFontSizesObject("px", 6, 0);
  const extendedTailwindFontsObject = mockTailwindFontSizesObject("px", 3, 2, {
    lineHeight: true,
    letterSpacing: true,
    fontWeight: true,
  });

  const resultMantineObject = getFontSizes(
    tailwindFontsObject,
    extendedTailwindFontsObject
  );

  test("Generated object has all the keys from both objects", () => {
    const keys = new Set([
      ...Object.keys(tailwindFontsObject),
      ...Object.keys(extendedTailwindFontsObject),
    ]);
    expect(resultMantineObject).not.toBeUndefined();
    if (resultMantineObject) {
      expect(Object.keys(resultMantineObject).length).toBe(keys.size);
      Object.keys(resultMantineObject).forEach((mantineKey) => {
        expect(keys.has(mantineKey)).toBe(true);
      });
    }
  });

  test("Correct values and predominance", () => {
    expect(resultMantineObject).not.toBeUndefined();
    if (resultMantineObject) {
      Object.keys(resultMantineObject).forEach((key) => {
        const tailwindValue =
          extendedTailwindFontsObject[key] ?? tailwindFontsObject[key];
        expect(resultMantineObject[key]).toBe(
          typeof tailwindValue === "string" ? tailwindValue : tailwindValue[0]
        );
      });
    }
  });
});

describe("Tailwind to Mantine font breakpoints Adapter", () => {
  const tailwindBreakpointsObject = mockTailwindBreakpointsObject("max", 6, 0);
  const extendedTailwindBreakpointsObject = mockTailwindBreakpointsObject(
    "min",
    2,
    2
  );

  const resultMantineObject = getBreakpoints(
    tailwindBreakpointsObject,
    extendedTailwindBreakpointsObject
  );

  test("Generated object has all the keys from both objects", () => {
    const keys = new Set([
      ...Object.keys(tailwindBreakpointsObject),
      ...Object.keys(extendedTailwindBreakpointsObject),
    ]);
    expect(resultMantineObject).not.toBeUndefined();
    if (resultMantineObject) {
      expect(Object.keys(resultMantineObject).length).toBe(keys.size);
      Object.keys(resultMantineObject).forEach((mantineKey) => {
        expect(keys.has(mantineKey)).toBe(true);
      });
    }
  });

  test("Correct values and predominance", () => {
    expect(resultMantineObject).not.toBeUndefined();
    if (resultMantineObject) {
      Object.keys(resultMantineObject).forEach((key) => {
        const tailwindValue =
          extendedTailwindBreakpointsObject[key] ??
          tailwindBreakpointsObject[key];
        expect(resultMantineObject[key]).toBe(
          typeof tailwindValue === "string"
            ? tailwindValue
            : tailwindValue.min || tailwindValue.max
        );
      });
    }
  });
});
