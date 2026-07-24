'use client';

import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Shipment, Driver } from '../../types';

interface StatsCardsProps {
  shipments: Shipment[];
  drivers: Driver[];
  isLoading?: boolean; // Make this optional
}

export function StatsCards({ shipments, drivers, isLoading = false }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = {
    totalShipments: shipments.length,
    activeShipments: shipments.filter(s => s.status !== 'delivered' && s.status !== 'cancelled').length,
    totalDrivers: drivers.length,
    availableDrivers: drivers.filter(d => d.status === 'available' || d.status === 'on_duty').length,
    deliveredToday: shipments.filter(s => {
      const today = new Date();
      const deliveryDate = new Date(s.estimatedDelivery);
      return s.status === 'delivered' && 
        deliveryDate.getDate() === today.getDate() &&
        deliveryDate.getMonth() === today.getMonth() &&
        deliveryDate.getFullYear() === today.getFullYear();
    }).length,
    delayedShipments: shipments.filter(s => s.status === 'delayed').length,
    onTimeRate: Math.round((shipments.filter(s => s.status === 'delivered').length / 
      Math.max(shipments.filter(s => s.status === 'delivered' || s.status === 'delayed').length, 1)) * 100),
    totalWeight: shipments.reduce((sum, s) => sum + (s.totalWeight || 0), 0)
  };

  const statCards = [
    {
      title: 'Total Shipments',
      value: stats.totalShipments,
      icon: Package,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      trend: '+12%'
    },
    {
      title: 'Active Deliveries',
      value: stats.activeShipments,
      icon: Truck,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      trend: '+5%'
    },
    {
      title: 'On-Time Rate',
      value: `${stats.onTimeRate}%`,
      icon: CheckCircle,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      trend: '+2.3%'
    },
    {
      title: 'Delayed',
      value: stats.delayedShipments,
      icon: AlertCircle,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      trend: '-1.2%'
    },
    {
      title: 'Total Drivers',
      value: stats.totalDrivers,
      icon: Truck,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      trend: '+2'
    },
    {
      title: 'Available',
      value: stats.availableDrivers,
      icon: Clock,
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
      trend: '3 active'
    },
    {
      title: 'Delivered Today',
      value: stats.deliveredToday,
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      trend: 'Today'
    },
    {
      title: 'Total Weight',
      value: `${stats.totalWeight.toFixed(1)} kg`,
      icon: Package,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      trend: '+45.2kg'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
      {statCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {stat.title}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}