export interface QuestionOption {
  value: string;
  label: string;
  domains?: string[];
  legal?: string | string[];
  legalFocus?: string[];
  domain?: string;
}

export interface Question {
  id: string;
  question: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  options: QuestionOption[];
}

export interface SurveyStep {
  id: number;
  title: string;
  questions: Question[];
}

export const surveyQuestions: SurveyStep[] = [
  {
    id: 1,
    title: 'Business Fundamentals',
    questions: [
      {
        id: 'q1',
        question: 'What is your startup\'s primary focus?',
        type: 'radio',
        required: true,
        options: [
          { value: 'product', label: 'Product Development', domains: ['saas', 'ecommerce', 'hardware'] },
          { value: 'service', label: 'Service Delivery', domains: ['consulting', 'agency', 'marketplace'] },
          { value: 'platform', label: 'Platform/Marketplace', domains: ['marketplace', 'saas', 'fintech'] },
          { value: 'content', label: 'Content/Media', domains: ['media', 'edtech', 'entertainment'] },
        ],
      },
      {
        id: 'q2',
        question: 'What stage is your startup currently in?',
        type: 'radio',
        required: true,
        options: [
          { value: 'idea', label: 'Idea Stage' },
          { value: 'mvp', label: 'MVP Development' },
          { value: 'launch', label: 'Pre-Launch' },
          { value: 'growth', label: 'Growth Stage' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Target Market & Customers',
    questions: [
      {
        id: 'q3',
        question: 'Who is your primary target customer?',
        type: 'radio',
        required: true,
        options: [
          { value: 'b2b', label: 'Businesses (B2B)', domains: ['saas', 'consulting', 'fintech'] },
          { value: 'b2c', label: 'Individual Consumers (B2C)', domains: ['ecommerce', 'media', 'healthtech'] },
          { value: 'b2b2c', label: 'Both Businesses and Consumers', domains: ['marketplace', 'fintech', 'edtech'] },
          { value: 'b2g', label: 'Government/Public Sector (B2G)', domains: ['govtech', 'consulting'] },
        ],
      },
      {
        id: 'q4',
        question: 'What geographic market are you targeting?',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'local', label: 'Local (City/Region)' },
          { value: 'national', label: 'National (Pakistan)' },
          { value: 'regional', label: 'Regional (South Asia/MENA)' },
          { value: 'global', label: 'Global' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Technology & Innovation',
    questions: [
      {
        id: 'q5',
        question: 'What technology is core to your business?',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'ai_ml', label: 'AI/Machine Learning', domains: ['ai', 'saas', 'fintech'] },
          { value: 'blockchain', label: 'Blockchain/Web3', domains: ['crypto', 'fintech'] },
          { value: 'iot', label: 'IoT/Hardware', domains: ['hardware', 'iot', 'healthtech'] },
          { value: 'mobile', label: 'Mobile Apps', domains: ['mobile', 'saas', 'ecommerce'] },
          { value: 'web', label: 'Web Applications', domains: ['saas', 'ecommerce', 'media'] },
          { value: 'cloud', label: 'Cloud Infrastructure', domains: ['saas', 'devtools'] },
          { value: 'data', label: 'Data Analytics', domains: ['analytics', 'saas', 'fintech'] },
        ],
      },
      {
        id: 'q6',
        question: 'Does your business handle sensitive data?',
        type: 'radio',
        required: true,
        options: [
          { value: 'financial', label: 'Financial Data', legalFocus: ['payment_processing', 'pci_compliance'] },
          { value: 'health', label: 'Health/Medical Data', legalFocus: ['hipaa', 'health_regulations'] },
          { value: 'personal', label: 'Personal User Data', legalFocus: ['gdpr', 'data_protection'] },
          { value: 'none', label: 'No Sensitive Data', legalFocus: ['general_privacy'] },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Business Model',
    questions: [
      {
        id: 'q7',
        question: 'How do you generate revenue?',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'subscription', label: 'Subscription/SaaS', domains: ['saas', 'media'] },
          { value: 'transaction', label: 'Transaction Fees', domains: ['marketplace', 'fintech'] },
          { value: 'sales', label: 'Product Sales', domains: ['ecommerce', 'hardware'] },
          { value: 'advertising', label: 'Advertising', domains: ['media', 'social'] },
          { value: 'licensing', label: 'Licensing', domains: ['software', 'ip'] },
          { value: 'freemium', label: 'Freemium', domains: ['saas', 'mobile'] },
        ],
      },
      {
        id: 'q8',
        question: 'What is your expected annual revenue (Year 1)?',
        type: 'radio',
        required: false,
        options: [
          { value: '0-50k', label: 'Less than PKR 5 Million' },
          { value: '50k-200k', label: 'PKR 5-20 Million' },
          { value: '200k-1m', label: 'PKR 20-100 Million' },
          { value: '1m+', label: 'PKR 100 Million+' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Industry Sector',
    questions: [
      {
        id: 'q9',
        question: 'Which industry does your startup belong to?',
        type: 'radio',
        required: true,
        options: [
          { value: 'fintech', label: 'Financial Technology (FinTech)', domain: 'fintech' },
          { value: 'healthtech', label: 'Healthcare Technology (HealthTech)', domain: 'healthtech' },
          { value: 'edtech', label: 'Education Technology (EdTech)', domain: 'edtech' },
          { value: 'ecommerce', label: 'E-Commerce/Retail', domain: 'ecommerce' },
          { value: 'saas', label: 'Software as a Service (SaaS)', domain: 'saas' },
          { value: 'marketplace', label: 'Marketplace/Platform', domain: 'marketplace' },
          { value: 'media', label: 'Media/Entertainment', domain: 'media' },
          { value: 'logistics', label: 'Logistics/Transportation', domain: 'logistics' },
          { value: 'proptech', label: 'Property Technology (PropTech)', domain: 'proptech' },
          { value: 'agritech', label: 'Agriculture Technology (AgriTech)', domain: 'agritech' },
          { value: 'other', label: 'Other', domain: 'general' },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Regulatory & Compliance',
    questions: [
      {
        id: 'q10',
        question: 'Which regulations might apply to your business?',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'payment', label: 'Payment Processing (SBP Regulations)', legal: 'payment_gateway' },
          { value: 'data', label: 'Data Protection/Privacy', legal: 'data_protection' },
          { value: 'securities', label: 'Securities/Investment', legal: 'secp_securities' },
          { value: 'telecom', label: 'Telecommunications (PTA)', legal: 'pta_compliance' },
          { value: 'food', label: 'Food Safety', legal: 'psqca_food' },
          { value: 'export', label: 'Import/Export', legal: 'customs_trade' },
          { value: 'none', label: 'None of the above', legal: 'general' },
        ],
      },
      {
        id: 'q11',
        question: 'Do you plan to raise external funding?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes_venture', label: 'Yes - Venture Capital', legal: ['cap_table', 'shareholder_agreement'] },
          { value: 'yes_angel', label: 'Yes - Angel Investors', legal: ['cap_table', 'convertible_notes'] },
          { value: 'yes_loan', label: 'Yes - Bank Loans', legal: ['loan_agreements'] },
          { value: 'bootstrapped', label: 'No - Self-funded/Bootstrapped', legal: ['basic_incorporation'] },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Intellectual Property',
    questions: [
      {
        id: 'q12',
        question: 'What intellectual property does your startup have?',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'software', label: 'Software/Code', legal: ['copyright', 'trade_secrets'] },
          { value: 'patent', label: 'Patentable Innovation', legal: ['patent_filing'] },
          { value: 'trademark', label: 'Brand/Logo/Name', legal: ['trademark_registration'] },
          { value: 'content', label: 'Creative Content', legal: ['copyright'] },
          { value: 'none', label: 'None yet', legal: ['ip_strategy'] },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Team & Operations',
    questions: [
      {
        id: 'q13',
        question: 'How many co-founders/partners do you have?',
        type: 'radio',
        required: true,
        options: [
          { value: 'solo', label: 'Solo Founder', legal: ['sole_proprietorship'] },
          { value: '2-3', label: '2-3 Co-founders', legal: ['partnership_agreement', 'equity_split'] },
          { value: '4+', label: '4+ Co-founders', legal: ['detailed_shareholders_agreement'] },
        ],
      },
      {
        id: 'q14',
        question: 'Will you hire employees in the first year?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes_local', label: 'Yes - Local employees', legal: ['employment_contracts', 'eobi_registration'] },
          { value: 'yes_remote', label: 'Yes - Remote/International', legal: ['contractor_agreements', 'tax_implications'] },
          { value: 'no', label: 'No employees planned', legal: ['basic_compliance'] },
        ],
      },
    ],
  },
];

