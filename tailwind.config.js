module.exports = {
    theme: {
        extend: {
            fontFamily: {
                table: ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
            },

            textColor: {
                th: '#2D2521',
                te: '#606266'
            }
        },

        backgroundColor: theme => ({
            ...theme('colors'),
            main: '#2D2521',
            secondary: '#5B5750'
        })
    },
    variants: {
        opacity: ['responsive', 'hover', 'focus', 'disabled'],
        backgroundColor: ['responsive', 'hover', 'focus', 'disabled']
    },
    plugins: []
};
