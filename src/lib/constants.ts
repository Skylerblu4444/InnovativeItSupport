// src/lib/constants.ts
// Constants and configuration for Innovative IT Services

export const COMPANY_INFO = {
  name: 'Innovative IT Services',
  parent: 'Innovative Information Technology Resolutions LLC',
  founder: 'Skyler',
  email: 'contact@innovativeitsolutions.com',
  phone: '+1 (800) 555-0199',
  emergencyPhone: '+1 (800) 555-0911',
  address: '123 Tech Boulevard, Suite 500, Your City, ST 12345',
  website: 'https://innovativeitsolutions.com'
};

export const CERTIFICATIONS = [
  'Certified Ethical Hacker (CEH)',
  'Offensive Security Certified Professional (OSCP)',
  'GIAC Penetration Tester (GPEN)',
  'Certified Information Systems Security Professional (CISSP)',
  'AWS Certified Solutions Architect',
  'Microsoft Certified: Azure Solutions Architect',
  'Certified Kubernetes Administrator (CKA)',
  'CompTIA Security+',
  'ISO 27001 Lead Auditor'
];

export const SPECIALTIES = [
  'Advanced Penetration Testing',
  'Red Team Operations',
  'Cloud Security Architecture',
  'Full-Stack Development',
  'DevSecOps Implementation',
  'Zero Trust Architecture',
  'Incident Response & Forensics',
  'Compliance & Regulatory',
  'API Security',
  'Container Security'
];

export const TECHNOLOGIES = {
  programming: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Java', 'C#', 'PHP', 'Ruby'],
  frontend: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Material-UI'],
  backend: ['Node.js', 'Express', 'Django', 'FastAPI', '.NET Core', 'Spring Boot'],
  databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB'],
  cloud: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean', 'Kubernetes', 'Docker'],
  security: ['Metasploit', 'Burp Suite', 'Nmap', 'Wireshark', 'Kali Linux', 'OWASP ZAP'],
  devops: ['Jenkins', 'GitLab CI/CD', 'Terraform', 'Ansible', 'Prometheus', 'Grafana']
};

export const SERVICE_CATEGORIES = [
  { id: 'security', label: 'Security Services', icon: 'Shield' },
  { id: 'cloud', label: 'Cloud Solutions', icon: 'Cloud' },
  { id: 'development', label: 'Development', icon: 'Code' },
  { id: 'managed', label: 'Managed Services', icon: 'Monitor' },
  { id: 'consulting', label: 'Consulting', icon: 'Briefcase' },
  { id: 'training', label: 'Training', icon: 'Award' }
];

export const PRIORITY_COLORS = {
  critical: 'text-red-700 bg-red-100 border-red-300',
  high: 'text-orange-700 bg-orange-100 border-orange-300',
  medium: 'text-yellow-700 bg-yellow-100 border-yellow-300',
  low: 'text-blue-700 bg-blue-100 border-blue-300'
};

export const STATUS_COLORS = {
  active: 'text-green-700 bg-green-100',
  maintenance: 'text-yellow-700 bg-yellow-100',
  down: 'text-red-700 bg-red-100',
  open: 'text-blue-700 bg-blue-100 border-blue-300',
  'in-progress': 'text-purple-700 bg-purple-100 border-purple-300',
  resolved: 'text-green-700 bg-green-100 border-green-300',
  closed: 'text-gray-700 bg-gray-100 border-gray-300'
};

export const ALERT_COLORS = {
  critical: 'bg-red-50 border-red-400 text-red-800',
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
  info: 'bg-blue-50 border-blue-400 text-blue-800',
  success: 'bg-green-50 border-green-400 text-green-800'
};

export const COMPLIANCE_FRAMEWORKS = [
  'SOC 2 Type II',
  'ISO 27001',
  'HIPAA',
  'PCI-DSS',
  'GDPR',
  'NIST Cybersecurity Framework',
  'CIS Controls',
  'CMMC'
];

export const SLA_TIERS = {
  critical: { responseTime: '15 minutes', resolutionTime: '4 hours' },
  high: { responseTime: '1 hour', resolutionTime: '8 hours' },
  medium: { responseTime: '4 hours', resolutionTime: '24 hours' },
  low: { responseTime: '8 hours', resolutionTime: '72 hours' }
};