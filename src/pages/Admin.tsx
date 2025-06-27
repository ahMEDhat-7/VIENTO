
import React from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddProductForm from '../components/admin/AddProductForm';
import ProductManagement from '../components/admin/ProductManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Admin: React.FC = () => {
  const { user, isLoggedIn } = useAuthStore();

  // Check if user is authenticated and is admin
  if (!isLoggedIn || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Admin Panel</CardTitle>
          </CardHeader>
        </Card>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Manage Products</TabsTrigger>
            <TabsTrigger value="add">Add Product</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
          
          <TabsContent value="add">
            <AddProductForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
