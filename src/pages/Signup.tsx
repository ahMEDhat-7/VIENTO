
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '../hooks/useRedux';
import { login } from '../store/userSlice';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      dispatch(login({
        id: '1',
        name: name,
        email: email,
        addresses: []
      }));
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-gray-700 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-300 mt-2">Join CapStore today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-200">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
