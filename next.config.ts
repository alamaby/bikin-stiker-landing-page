import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin("./lib/i18n/i18n.ts");
const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default withMDXConfig(withNextIntl(nextConfig));
