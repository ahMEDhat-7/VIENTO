
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [adminFormData, setAdminFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  
  const navigate = useNavigate();

  const handleUserSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User signup:', userFormData);
    
    if (userFormData.password !== userFormData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Simple mock registration
    if (userFormData.email && userFormData.password && userFormData.name) {
      localStorage.setItem('user', JSON.stringify({ 
        email: userFormData.email, 
        name: userFormData.name,
        role: 'user' 
      }));
      navigate('/');
    }
  };

  const handleAdminSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin signup:', adminFormData);
    
    if (adminFormData.password !== adminFormData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (adminFormData.adminCode !== 'ADMIN123') {
      alert('Invalid admin code');
      return;
    }
    
    // Simple mock registration
    if (adminFormData.email && adminFormData.password && adminFormData.name) {
      localStorage.setItem('user', JSON.stringify({ 
        email: adminFormData.email, 
        name: adminFormData.name,
        role: 'admin' 
      }));
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">User Signup</TabsTrigger>
                <TabsTrigger value="admin">Admin Signup</TabsTrigger>
              </TabsList>
              
              <TabsContent value="user">
                <form onSubmit={handleUserSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="user-name">Full Name</Label>
                    <Input
                      id="user-name"
                      type="text"
                      value={userFormData.name}
                      onChange={(e) => setUserFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userFormData.email}
                      onChange={(e) => setUserFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="user-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="user-password"
                        type={showPassword ? 'text' : 'password'}
                        value={userFormData.password}
                        onChange={(e) => setUserFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="user-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="user-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={userFormData.confirmPassword}
                        onChange={(e) => setUserFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up as User
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="admin">
                <form onSubmit={handleAdminSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-name">Full Name</Label>
                    <Input
                      id="admin-name"
                      type="text"
                      value={adminFormData.name}
                      onChange={(e) => setAdminFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={adminFormData.email}
                      onChange={(e) => setAdminFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? 'text' : 'password'}
                        value={adminFormData.password}
                        onChange={(e) => setAdminFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="admin-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="admin-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={adminFormData.confirmPassword}
                        onChange={(e) => setAdminFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="admin-code">Admin Code</Label>
                    <Input
                      id="admin-code"
                      type="text"
                      value={adminFormData.adminCode}
                      onChange={(e) => setAdminFormData(prev => ({ ...prev, adminCode: e.target.value }))}
                      placeholder="Enter admin code"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
