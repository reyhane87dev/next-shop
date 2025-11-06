import localFont from 'next/font/local'

const vazir = localFont({
    src : [
        {
            path : "./../public/vazir.ttf",
        }
    ],
    variable : '--font-vazir',
    display : 'swap',
    preload : true,
})

export default vazir