/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				Wind: "#b3dec1",
				Rock: "#e8c660",
				Electric: "#aa7eee",
				Grass: "#bacd84",
				Water: "#698ae8",
				Fire: "#f0a762",
				Ice: "#b9dfe4",
			},
			width: {
				128: '32rem',
			},
		},
	},
	plugins: [require("daisyui"), require("tailwindcss-animated")],
	daisyui: {
		themes: false,
	},
};
