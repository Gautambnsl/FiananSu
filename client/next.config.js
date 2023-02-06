/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	async redirects() {
		return [
			{
				source: "/",
				destination: "/bridge",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
