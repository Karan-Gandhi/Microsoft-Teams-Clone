module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			minWidth: {
				0: "0",
				"1/4": "25%",
				"1/2": "50%",
				// 32: "8rem",
				// 64: "16rem",
				// 128: "32rem",
				fit: "fit-content",
				"1/3": "33.333333333333333%",
				"2/3": "66.666666666666666%",
				"3/4": "75%",
				full: "100%",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
