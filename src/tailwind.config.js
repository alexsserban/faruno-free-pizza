module.exports = {
    theme: {
        extend: {
            fontFamily: {
                table: ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
            },

            textColor: {
                th: '#909399',
                te: '#606266',
                primary: '4e382d'
            }
        },

        backgroundColor: theme => ({
            ...theme('colors'),
            main: '#918085',
            secondary: '#5B5750'
        })
    },
    variants: {
        opacity: ['responsive', 'hover', 'focus', 'disabled'],
        backgroundColor: ['responsive', 'hover', 'focus', 'disabled']
    },
    plugins: []
};
