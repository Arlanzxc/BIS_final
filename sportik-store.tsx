import { useState } from "react"
import { Star, Dumbbell, DumbbellIcon as Barbell, PenIcon as Paddle, ShoppingBasketIcon as Basketball, BusIcon as SoccerBall, Shirt, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "All Products",
    items: [],
  },
  {
    name: "Sporting Goods",
    items: [
      { name: "Treadmill", price: 400, score: 5.0, icon: Dumbbell },
      { name: "Dumbbells", price: 200, score: 4.5, icon: Dumbbell },
      { name: "Barbells", price: 250, score: 4.6, icon: Barbell },
      { name: "Paddles for barbells", price: 250, score: 5.0, icon: Paddle },
    ],
  },
  {
    name: "Accessories",
    items: [
      { name: "Sports Equipment", price: 100, score: 3.8, icon: Dumbbell },
      { name: "Wheel", price: 50, score: 4.5, icon: Dumbbell },
      { name: "Basketball", price: 80, score: 5.0, icon: Basketball },
      { name: "Soccer Ball", price: 80, score: 5.0, icon: SoccerBall },
    ],
  },
  {
    name: "Apparel",
    items: [
      { name: "Sports Sweatshirt", price: 40, score: 4.4, icon: Shirt },
      { name: "Compression T-Shirt", price: 50, score: 4.8, icon: Shirt },
      { name: "Sports Pants", price: 80, score: 4.0, icon: Shirt },
    ],
  },
]

// Populate "All Products" category
categories[0].items = categories.slice(1).flatMap(category => category.items)

export default function SportikStore() {
  const [activeCategory, setActiveCategory] = useState(categories[0])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sportik Store</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.name}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    activeCategory.name === category.name ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4">{activeCategory.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.items.map((item) => (
              <Card key={item.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <item.icon className="w-6 h-6" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1">{item.score.toFixed(1)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}