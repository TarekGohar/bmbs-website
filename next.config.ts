import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {eslint: {ignoreDuringBuilds: true}, typescript: {ignoreBuildErrors: true}};

export default withNextIntl(nextConfig);