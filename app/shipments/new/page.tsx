'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ShipmentForm from '../../components/shipments/ShipmentForm';
import PackageForm from '../../components/shipments/PackageForm';
import ShippingOptions from '../../components/shipments/ShippingOptions';
import { toast } from 'react-hot-toast';

export default function NewShipmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Shipment created successfully!');
      router.push('/shipments');
    } catch (error) {
      toast.error('Failed to create shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Shipment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Fill in the details to create a new shipment
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === stepNumber
                      ? 'bg-blue-600 text-white'
                      : step > stepNumber
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > stepNumber
                        ? 'bg-green-600'
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Shipment Details</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Package Info</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Shipping Options</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            {step === 1 && <ShipmentForm />}
            {step === 2 && <PackageForm />}
            {step === 3 && <ShippingOptions />}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-2 rounded-lg ${
                step === 1
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              Previous
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Shipment'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Create New Shipment | LogiTrack',
  description: 'Create a new shipment for tracking and delivery',
};