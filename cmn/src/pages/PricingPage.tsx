import React, { useState } from 'react';
import { Check, Sparkles, Crown, Zap } from 'lucide-react';

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      icon: <Sparkles className="h-6 w-6" />,
      price: { monthly: 0, annual: 0 },
      description: 'Get started with basic video generation',
      features: [
        '5 video generations per month',
        'Basic quality videos',
        'Standard resolution',
        'Community support',
        'Access to gallery',
      ],
      limitations: [
        'No camera controls',
        'No scene builder',
        'No audio generation',
      ],
      buttonText: 'Get Started',
      buttonStyle: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      popular: false,
    },
    {
      name: 'CMN Pro',
      icon: <Zap className="h-6 w-6" />,
      price: { monthly: 19.99, annual: 15.99 },
      description: 'For creators and professionals',
      features: [
        '100 video generations per month',
        'High quality videos',
        '1080p resolution',
        'Camera controls',
        'Scene builder',
        'Basic audio generation',
        'Priority support',
        'Extended video lengths',
        'Asset management',
      ],
      buttonText: 'Start Pro Trial',
      buttonStyle: 'bg-primary-600 text-white hover:bg-primary-700',
      popular: true,
    },
    {
      name: 'CMN Ultra',
      icon: <Crown className="h-6 w-6" />,
      price: { monthly: 49.99, annual: 39.99 },
      description: 'For studios and advanced filmmakers',
      features: [
        'Unlimited video generations',
        'Ultra high quality',
        '4K resolution',
        'Advanced camera controls',
        'Multi-scene builder',
        'Native audio generation',
        'Early access to features',
        'Custom model fine-tuning',
        'Dedicated support',
        'Commercial license',
        'Team collaboration',
      ],
      buttonText: 'Start Ultra Trial',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Creative Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Unlock the full potential of AI video generation with our flexible plans
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular ? 'border-primary-500 scale-105' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      plan.popular ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {plan.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-500 ml-1">
                        /{isAnnual ? 'month' : 'month'}
                      </span>
                    )}
                  </div>
                  {isAnnual && plan.price.monthly > 0 && (
                    <div className="text-sm text-gray-500">
                      Billed annually (${(plan.price.annual * 12).toFixed(2)}/year)
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Compare All Features
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 pr-4">Features</th>
                  <th className="text-center py-4 px-4">Free</th>
                  <th className="text-center py-4 px-4">Pro</th>
                  <th className="text-center py-4 px-4">Ultra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 pr-4 font-medium">Video generations per month</td>
                  <td className="text-center py-4 px-4">5</td>
                  <td className="text-center py-4 px-4">100</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium">Video quality</td>
                  <td className="text-center py-4 px-4">Basic</td>
                  <td className="text-center py-4 px-4">High</td>
                  <td className="text-center py-4 px-4">Ultra</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium">Camera controls</td>
                  <td className="text-center py-4 px-4">—</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium">Scene builder</td>
                  <td className="text-center py-4 px-4">—</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium">Audio generation</td>
                  <td className="text-center py-4 px-4">—</td>
                  <td className="text-center py-4 px-4">Basic</td>
                  <td className="text-center py-4 px-4">Native</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto text-left space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I change my plan at any time?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes, all paid plans come with a 7-day free trial. No credit card required to start.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What happens to my videos if I cancel?
              </h3>
              <p className="text-gray-600">
                Your generated videos remain accessible in your account even after cancellation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;