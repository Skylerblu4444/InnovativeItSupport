// src/lib/types.ts
// Type definitions for Innovative IT Services Portal

export interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'general' | 'security' | 'cloud' | 'development' | 'network' | 'hardware' | 'software' | 'access';
  created: string;
  updated: string;
  assignee: string;
  description?: string;
}

export interface Service {
  id: number;
  name: string;
  status: 'active' | 'maintenance' | 'down';
  uptime: string;
  lastCheck: string;
  clients?: number;
}

export interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info' | 'success';
  message: string;
  time: string;
}

export interface ServiceOffering {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
  features: string[];
  price: string;
  metrics: {
    [key: string]: string | number;
  };
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  color: string;
  popular: boolean;
  buttonText?: string;
  highlighted?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  certifications: string[];
  specialties: string[];
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface SecurityMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'software' | 'service' | 'training' | 'consulting';
  price: string;
  features: string[];
  image?: string;
}

export type TabType = 
  | 'home' 
  | 'services' 
  | 'products' 
  | 'pricing' 
  | 'dashboard' 
  | 'tickets' 
  | 'portfolio' 
  | 'team' 
  | 'contact' 
  | 'emergency';