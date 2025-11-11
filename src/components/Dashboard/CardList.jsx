import Image from "next/image"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

const latestTransactions = [
    {
        id: 1,
        title: "Subscription Renewal",
        badge: "Michael Johnson",
        image: "https://resizing.flixster.com/91zS0O2BNGHThjVqEC9XsYnXU1w=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/235135_v9_bc.jpg",
        count: 300
    },
    {
        id: 2,
        title: "Subscription Renewal",
        badge: "Michael Johnson",
        image: "https://resizing.flixster.com/91zS0O2BNGHThjVqEC9XsYnXU1w=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/235135_v9_bc.jpg",
        count: 300
    },
    {
        id: 3,
        title: "Subscription Renewal",
        badge: "Michael Johnson",
        image: "https://resizing.flixster.com/91zS0O2BNGHThjVqEC9XsYnXU1w=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/235135_v9_bc.jpg",
        count: 300
    },
    {
        id: 4,
        title: "Subscription Renewal",
        badge: "Michael Johnson",
        image: "https://resizing.flixster.com/91zS0O2BNGHThjVqEC9XsYnXU1w=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/235135_v9_bc.jpg",
        count: 300
    },
    {
        id: 5,
        title: "Subscription Renewal",
        badge: "Michael Johnson",
        image: "https://resizing.flixster.com/91zS0O2BNGHThjVqEC9XsYnXU1w=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/235135_v9_bc.jpg",
        count: 300
    },
]

const popularContent = [
    {
        id: 1,
        title: "Javascript Tutorial",
        badge: "Coding",
        image: "https://static.vecteezy.com/system/resources/previews/012/697/298/non_2x/3d-javascript-logo-design-free-png.png",
        count: 4300
    },

    {
        id: 2,
        title: "Javascript Tutorial",
        badge: "Coding",
        image: "https://static.vecteezy.com/system/resources/previews/012/697/298/non_2x/3d-javascript-logo-design-free-png.png",
        count: 4300
    },
    {
        id: 3,
        title: "Javascript Tutorial",
        badge: "Coding",
        image: "https://static.vecteezy.com/system/resources/previews/012/697/298/non_2x/3d-javascript-logo-design-free-png.png",
        count: 4300
    },
    {
        id: 4,
        title: "Javascript Tutorial",
        badge: "Coding",
        image: "https://static.vecteezy.com/system/resources/previews/012/697/298/non_2x/3d-javascript-logo-design-free-png.png",
        count: 4300
    },
    {
        id: 5,
        title: "Javascript Tutorial",
        badge: "Coding",
        image: "https://static.vecteezy.com/system/resources/previews/012/697/298/non_2x/3d-javascript-logo-design-free-png.png",
        count: 4300
    },

]

const CardList = ({ title }) => {

    const list = title === "Popular Content" ? popularContent : latestTransactions
    return (
        <div>

            <h1 className="text-lg font-medium mb-6">{title}</h1>

            <div className="flex flex-col gap-2">

                {
                    list.map(item => (
                        <Card key={item.id} className="flex-row items-center justify-between gap-4 p-2">

                            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                                {/* <Image src={item.image} alt={item.title} fill className="object-cover">

                                </Image> */}
                            </div>

                            <CardContent className="p-0">
                                <CardTitle className="text-sm font-medium ">{item.title}</CardTitle>
                                <Badge variant="secondary">{item.badge}</Badge>
                            </CardContent>
                            <CardFooter>{item.count / 1000}K</CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default CardList