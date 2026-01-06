import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LegalRequirementsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Legal Requirements for Your Startup</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Understanding and fulfilling legal requirements is crucial for starting and operating your business in Pakistan. 
              This guide covers the essential legal steps you need to take.
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">1. SECP Registration</h2>
                <p className="text-gray-600">
                  Register your company with the Securities and Exchange Commission of Pakistan (SECP). 
                  Choose between a Private Limited Company, Single Member Company, or Partnership.
                </p>
                <a 
                  href="https://www.secp.gov.pk/company-formation/fee-calculator/company-incorporation-fee-calculator/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline text-sm mt-2 inline-block"
                >
                  SECP Fee Calculator →
                </a>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">2. State Bank of Pakistan (SBP) Payment System Regulations</h2>
                <a 
                  href="https://www.sbp.org.pk/psd/2014/C3-Annex.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline text-sm mt-2 inline-block"
                >
                  Rules for Payment System Operators and Payment Service Providers (PDF) →
                </a>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">3. NTN (National Tax Number)</h2>
                <p className="text-gray-600">
                  Obtain your NTN from the Federal Board of Revenue (FBR). This is mandatory for all businesses 
                  and required for opening a business bank account.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">4. STRN (Sales Tax Registration Number)</h2>
                <p className="text-gray-600">
                  If your annual turnover exceeds the threshold, register for Sales Tax with FBR. 
                  This enables you to collect and remit sales tax on your products or services.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Business Bank Account</h2>
                <p className="text-gray-600">
                  Open a dedicated business bank account using your SECP registration certificate and NTN. 
                  This separates your business finances from personal accounts.
                </p>
              </div>

              <div className="border-l-4 border-pink-600 pl-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Trademark Registration</h2>
                <p className="text-gray-600">
                  Protect your brand by registering your trademark with the Intellectual Property Organization (IPO) of Pakistan. 
                  This prevents others from using your brand name or logo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

