/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1B1C31",
        darkColor: "#070710",
        primary: "#6048E8",
        hovprimary: "#0D69E1",
        shadowBlock: "#040110FF",
      },
      flex: {
        1.5: "1.2 1 0%",
      },
      borderRadius: {
        roundedButt: "20px",
        defaultRounded: "40px",
      },
      width: {
        widthLine: "1px",
        mediumW: "300px",
        biggW: "500px",
        hugeW: "600px",
        superW: "800px",
      },
      height: {
        hightLine: "1px",
        smallH: "400px",
        smallHplus: "500px",
        mediumH: "600px",
        height700: "700px",
        biggH: "800px",
        xLarge: "900px",
        resizeBG: "1000px",
        hugeH: "1300px",
      },
      margin: {
        between: "650px",
        between2: "450px",
        between3: "150px",
        between4: "350px",
      },
      screens: {
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
        "2.5xl": "1800px",
        // => @media (min-width: 1800px) { ... }
        "2.8xl": "2000px",
        // => @media (min-width: 2000px) { ... }
        "3xl": "2500px",
        // => @media (min-width: 1700px) { ... }
      },
      maxWidth: {
        lgMw: "700px",
      },
    },
  },
  plugins: [],
};
