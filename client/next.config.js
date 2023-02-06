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
	   distDir: 'build',
};

module.exports = nextConfig;
