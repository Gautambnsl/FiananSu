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
	images: {
		loader: 'akamai',
		path: '',
	  },
	  trailingSlash: true,
	  distDir: 'build',
};

module.exports = nextConfig;
