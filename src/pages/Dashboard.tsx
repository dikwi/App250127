import React from 'react';
import { Activity, Users, ShoppingCart, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-semibold">1,234</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded">
              <ShoppingCart className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Orders</p>
              <p className="text-2xl font-semibold">567</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Revenue</p>
              <p className="text-2xl font-semibold">$12,345</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded">
              <Activity className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Active Users</p>
              <p className="text-2xl font-semibold">892</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center py-2 border-b last:border-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
