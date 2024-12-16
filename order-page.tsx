import { useState } from "react"
import { CreditCard, Truck, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Mock data for cart items
const cartItems = [
  { id: 1, name: "Treadmill", price: 400, quantity: 1 },
  { id: 2, name: "Dumbbells", price: 200, quantity: 2 },
  { id: 3, name: "Sports Sweatshirt", price: 40, quantity: 1 },
]

// Mock data for saved payment methods
const savedPaymentMethods = [
  { id: 1, name: "Visa ending in 1234" },
  { id: 2, name: "Mastercard ending in 5678" },
]

// Mock data for saved shipment methods
const savedShipmentMethods = [
  { id: 1, name: "Standard Shipping", price: 10 },
  { id: 2, name: "Express Shipping", price: 20 },
]

export default function OrderPage() {
  const [selectedPayment, setSelectedPayment] = useState(savedPaymentMethods[0].id)
  const [selectedShipment, setSelectedShipment] = useState(savedShipmentMethods[0].id)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = savedShipmentMethods.find(method => method.id === selectedShipment)?.price || 0
  const total = subtotal + shippingCost

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2" />
              Cart Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-bold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPayment.toString()} onValueChange={(value) => setSelectedPayment(Number(value))}>
              {savedPaymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id.toString()} id={`payment-${method.id}`} />
                  <Label htmlFor={`payment-${method.id}`}>{method.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2" />
              Shipment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedShipment.toString()} onValueChange={(value) => setSelectedShipment(Number(value))}>
              {savedShipmentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id.toString()} id={`shipment-${method.id}`} />
                  <Label htmlFor={`shipment-${method.id}`}>{method.name} - ${method.price.toFixed(2)}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">
              Pay ${total.toFixed(2)}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}