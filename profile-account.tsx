'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, CreditCard, Package, Settings, User } from 'lucide-react'

export default function ProfileAccount() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [avatarUrl, setAvatarUrl] = useState('/placeholder.svg')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError('Failed to update profile. Please try again.')
    }
  }

  const tabContent = {
    cart: "Your shopping cart items will appear here.",
    payments: "Your payment history and methods will be displayed here.",
    parcels: "Track your parcels and view shipping information here.",
    settings: "Manage your account settings and preferences here."
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Profile Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
            <div className="flex">
              <TabsList className="flex-col space-y-2 mr-4 h-auto">
                <TabsTrigger value="profile" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="cart" className="w-full justify-start">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart
                </TabsTrigger>
                <TabsTrigger value="payments" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="parcels" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Parcels
                </TabsTrigger>
                <TabsTrigger value="settings" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
              <div className="flex-grow">
                <TabsContent value="profile">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" onClick={() => alert('Upload functionality would go here')}>
                        Change Avatar
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {success && (
                      <Alert>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="cart">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shopping Cart</CardTitle>
                    </CardHeader>
                    <CardContent>{tabContent.cart}</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payments</CardTitle>
                    </CardHeader>
                    <CardContent>{tabContent.payments}</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="parcels">
                  <Card>
                    <CardHeader>
                      <CardTitle>Parcels</CardTitle>
                    </CardHeader>
                    <CardContent>{tabContent.parcels}</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent>{tabContent.settings}</CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}