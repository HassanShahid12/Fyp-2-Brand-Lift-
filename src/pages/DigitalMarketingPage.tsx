import { Target, CheckCircle, Layers, BarChart2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DigitalMarketingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow">
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-10 h-10 text-pink-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Digital Marketing Services</h1>
              <p className="text-gray-600 mt-1">Grow your business online with our tech-driven, results-oriented digital marketing solutions.</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            At our computer & IT startup, we help businesses increase visibility, generate leads, and boost sales through
            measurable digital strategies. Our team combines technology and marketing to deliver sustained growth.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Search Engine Optimization (SEO)</h2>
              <p className="text-gray-600 mt-2">We help your website rank higher on Google and attract organic traffic.</p>
              <ul className="mt-3 space-y-1 text-gray-700">
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Keyword research & strategy</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />On-page SEO optimization</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Technical SEO (speed, mobile, security)</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Off-page SEO & backlinks</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Local SEO (Google Maps ranking)</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Monthly SEO reports</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">Result: More traffic • Better rankings • Long-term growth</p>
              <p className="text-sm text-gray-500 mt-2">Tools: Google Analytics, Google Search Console</p>
            </section>

            <section className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><Layers className="w-5 h-5 text-blue-500" /> Content Marketing</h2>
              <p className="text-gray-600 mt-2">High-quality, SEO-optimized content that builds trust and authority.</p>
              <ul className="mt-3 space-y-1 text-gray-700">
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Blog writing (tech & IT niche)</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Website content & product descriptions</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Case studies, tutorials & guides</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Content calendar planning</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">Result: Authority • Engagement • Organic leads</p>
            </section>

            <section className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-indigo-500" /> Social Media & PPC</h2>
              <p className="text-gray-600 mt-2">We manage platforms and run paid campaigns that deliver measurable results.</p>
              <ul className="mt-3 space-y-1 text-gray-700">
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Profile optimization & content creation</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Paid campaigns (Search, Display, Social)</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Remarketing & conversion tracking</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Analytics & performance reporting</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">Platforms: Google Ads, Facebook & Instagram Ads, LinkedIn, YouTube</p>
            </section>

            <section className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><Mail className="w-5 h-5 text-yellow-500" /> Email & CRO</h2>
              <p className="text-gray-600 mt-2">Convert leads into customers and improve conversion rates across your funnels.</p>
              <ul className="mt-3 space-y-1 text-gray-700">
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Email templates, automation & newsletters</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Landing page & form optimization</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />A/B testing & strong CTAs</li>
                <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Trust elements & testimonials</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">Result: Higher conversions • Better user experience • Improved ROI</p>
            </section>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Analytics & Reporting</h3>
            <p className="text-gray-600 mt-2">We believe in data-driven marketing — we track traffic, conversion rates, lead sources and ROI with clear monthly reports.</p>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">Why Choose Us?</h3>
            <ul className="mt-2 text-gray-700 space-y-1">
              <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Tech-focused digital marketing experts</li>
              <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Affordable startup-friendly packages</li>
              <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Transparent reporting & customized strategies</li>
              <li><CheckCircle className="w-4 h-4 text-green-500 inline-block mr-2" />Latest tools & dedicated support team</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = 'mailto:hello@example.com?subject=Free%20Digital%20Marketing%20Consultation'}
              className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span>Get a Free Digital Marketing Consultation</span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
