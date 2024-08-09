# Mantine + Tailwind Adapter

This is a demo library to help to work with two of the most popular UI tools for React Projects.

## Features

- Mantine and Tailwind working together
- Get the Tailwind config without any change from your theme setup for Mantine
- Get the Mantine theme config from your Tailwind config

### Mantine to Tailwind Adapter

In case you already have a Mantine Theme config, you can use `getTailwindConfig` function and export the result as a tailwind config object.

```ts tailwindcss-config.ts
import { type Config } from "tailwindcss";
import { getTailwindConfig } from "mantine-tailwind-adapter";
import { mantineTheme } from "-your-file-route-mantine-theme-";

export default getTailwindConfig(mantineTheme) satisfies Config;
```

### Tailwind to Mantine Adapter

In case you already have a Tailwind config, you can use `getMantineTheme` function and export the result as a matine theme object.

```ts mantine-theme.ts
import { getMantineTheme } from "mantine-tailwind-adapter";
import tailwindcssConfig from "-your-file-route-tailwindcss-config-";
import { MantineThemeOverride } from "@mantine/core";

export const mantineTheme: MantineThemeOverride =
  getMantineTheme(tailwindcssConfig);
```

## Instalation

Run `npm install mantine-tailwind-adapter` into your project

## Prerequisites

This documentation assumes you are already familiar with Mantine and Tailwind. This library does not replace Mantine or Tailwind, it only provides bindings between them.

This library was build considering the following versions:

| Package version | Mantine version | Tailwind version |
| --------------- | --------------- | ---------------- |
| 0.0.1           | ^7              | ^3               |

### Tailwind

It's recomended to use a custom name and file for tailwind config to avoid errors when importing and using the config adapter, you can check how to do it in:

[https://tailwindcss.com/docs/configuration#using-a-different-file-name](https://tailwindcss.com/docs/configuration#using-a-different-file-name)

Also update the main css file in case you have this:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add a layer to lowerize tailwind base, thanks to @layer rule, tailwind base get lower "priority" than mantine css rules even if they have same specificity. Thanks to this, we CAN use preflight reset from tailwind.

```css
@layer tailwind {
  @tailwind base;
}
@tailwind components;
@tailwind utilities;
```
