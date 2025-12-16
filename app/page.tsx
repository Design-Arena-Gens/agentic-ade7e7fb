'use client';

import { useState } from 'react';
import { Users, FileText, CheckCircle, MessageSquare, Building2, Phone, Mail, MapPin } from 'lucide-react';

type Agent = {
  id: string;
  name: string;
  role: string;
  icon: any;
  status: 'idle' | 'active' | 'completed';
  description: string;
};

type OnboardingStep = {
  id: string;
  title: string;
  agentId: string;
  status: 'pending' | 'in-progress' | 'completed';
  details: string;
};

export default function Home() {
  const [selectedDealer, setSelectedDealer] = useState<string>('');
  const [dealerInfo, setDealerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    businessType: ''
  });
  const [onboardingStarted, setOnboardingStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const agents: Agent[] = [
    {
      id: 'welcome',
      name: 'Welcome Agent',
      role: 'Initial Contact',
      icon: Users,
      status: 'idle',
      description: 'Greets new dealers and collects basic information'
    },
    {
      id: 'verification',
      name: 'Verification Agent',
      role: 'Document Verification',
      icon: FileText,
      status: 'idle',
      description: 'Verifies business licenses, tax IDs, and legal documents'
    },
    {
      id: 'training',
      name: 'Training Agent',
      role: 'Product Training',
      icon: MessageSquare,
      status: 'idle',
      description: 'Provides product catalogs, pricing, and training materials'
    },
    {
      id: 'setup',
      name: 'Setup Agent',
      role: 'System Setup',
      icon: Building2,
      status: 'idle',
      description: 'Sets up dealer portal access, payment systems, and inventory tools'
    },
    {
      id: 'completion',
      name: 'Completion Agent',
      role: 'Final Review',
      icon: CheckCircle,
      status: 'idle',
      description: 'Conducts final review and activates dealer account'
    }
  ];

  const [steps, setSteps] = useState<OnboardingStep[]>([
    { id: '1', title: 'Welcome & Information Collection', agentId: 'welcome', status: 'pending', details: 'Collecting dealer information...' },
    { id: '2', title: 'Document Verification', agentId: 'verification', status: 'pending', details: 'Verifying business licenses and tax documents...' },
    { id: '3', title: 'Product Training', agentId: 'training', status: 'pending', details: 'Providing product catalogs and training materials...' },
    { id: '4', title: 'System Setup', agentId: 'setup', status: 'pending', details: 'Setting up dealer portal and payment systems...' },
    { id: '5', title: 'Final Review & Activation', agentId: 'completion', status: 'pending', details: 'Reviewing all information and activating account...' }
  ]);

  const startOnboarding = () => {
    if (!dealerInfo.name || !dealerInfo.email || !dealerInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }
    setOnboardingStarted(true);
    processNextStep(0);
  };

  const processNextStep = (stepIndex: number) => {
    if (stepIndex >= steps.length) return;

    setCurrentStep(stepIndex);

    const newSteps = [...steps];
    newSteps[stepIndex].status = 'in-progress';
    setSteps(newSteps);

    setTimeout(() => {
      const completedSteps = [...steps];
      completedSteps[stepIndex].status = 'completed';
      setSteps(completedSteps);

      if (stepIndex < steps.length - 1) {
        processNextStep(stepIndex + 1);
      }
    }, 3000);
  };

  const resetOnboarding = () => {
    setOnboardingStarted(false);
    setCurrentStep(0);
    setSteps(steps.map(s => ({ ...s, status: 'pending' })));
    setDealerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      businessType: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Dealer Onboarding System</h1>
          <p className="text-xl text-gray-600">AI-Powered Agents Working Together to Onboard Your Dealers</p>
        </div>

        {!onboardingStarted ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">New Dealer Registration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dealer Name *
                </label>
                <input
                  type="text"
                  value={dealerInfo.name}
                  onChange={(e) => setDealerInfo({ ...dealerInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter dealer name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={dealerInfo.email}
                    onChange={(e) => setDealerInfo({ ...dealerInfo, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="dealer@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={dealerInfo.phone}
                    onChange={(e) => setDealerInfo({ ...dealerInfo, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Type
                </label>
                <select
                  value={dealerInfo.businessType}
                  onChange={(e) => setDealerInfo({ ...dealerInfo, businessType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select business type</option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="distributor">Distributor</option>
                  <option value="franchise">Franchise</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={dealerInfo.address}
                    onChange={(e) => setDealerInfo({ ...dealerInfo, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123 Main St, City, State, ZIP"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={startOnboarding}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105"
            >
              Start Onboarding Process
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Onboarding: {dealerInfo.name}</h2>
                <button
                  onClick={resetOnboarding}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`border-2 rounded-lg p-6 transition-all duration-300 ${
                      step.status === 'completed'
                        ? 'border-green-500 bg-green-50'
                        : step.status === 'in-progress'
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.status === 'completed'
                              ? 'bg-green-500'
                              : step.status === 'in-progress'
                              ? 'bg-blue-500 animate-pulse'
                              : 'bg-gray-300'
                          }`}
                        >
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.details}</p>
                        </div>
                      </div>
                      <div>
                        {step.status === 'completed' && (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        )}
                        {step.status === 'in-progress' && (
                          <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {step.status === 'pending' && (
                          <div className="h-8 w-8 border-4 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {steps.every(s => s.status === 'completed') && (
                <div className="mt-8 bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Onboarding Complete!</h3>
                  <p className="text-green-700">
                    {dealerInfo.name} has been successfully onboarded. Welcome to the team!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Onboarding Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              const agentStep = steps.find(s => s.agentId === agent.id);
              const isActive = agentStep?.status === 'in-progress';
              const isCompleted = agentStep?.status === 'completed';

              return (
                <div
                  key={agent.id}
                  className={`border-2 rounded-xl p-6 transition-all duration-300 ${
                    isCompleted
                      ? 'border-green-500 bg-green-50'
                      : isActive
                      ? 'border-blue-500 bg-blue-50 shadow-xl'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500'
                          : isActive
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    {isActive && (
                      <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                    {isCompleted && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{agent.name}</h3>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{agent.role}</p>
                  <p className="text-sm text-gray-600">{agent.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
