import { surveyQuestions } from './surveyQuestions';
import { legalDictionary } from './legalDictionary';

export interface SurveyAnswers {
  [key: string]: string | string[];
}

export interface DomainResult {
  primaryDomain: string;
  confidence: number;
  secondaryDomains: string[];
  legalRequirements: LegalRequirement[];
  recommendations: string[];
}

export interface LegalRequirement {
  title: string;
  description: string;
  resources?: string;
}


function getIndustryDomain(industry: string): string {
  const domainMap: { [key: string]: string } = {
    fintech: 'fintech',
    healthtech: 'healthtech',
    edtech: 'edtech',
    ecommerce: 'ecommerce',
    saas: 'saas',
    marketplace: 'marketplace',
    media: 'media',
    logistics: 'logistics',
    proptech: 'proptech',
    agritech: 'agritech',
    other: 'general',
  };
  return domainMap[industry] || 'general';
}

function getDomainsFromOption(optionValue: string): string[] {
  const step = surveyQuestions[0];
  const question = step.questions.find((q) => q.id === 'q1');
  const option = question?.options.find((o) => o.value === optionValue);
  return option?.domains || [];
}

function getDomainsFromCustomer(customerType: string): string[] {
  const step = surveyQuestions[1];
  const question = step.questions.find((q) => q.id === 'q3');
  const option = question?.options.find((o) => o.value === customerType);
  return option?.domains || [];
}

function getDomainsFromTech(tech: string): string[] {
  const step = surveyQuestions[2];
  const question = step.questions.find((q) => q.id === 'q5');
  const option = question?.options.find((o) => o.value === tech);
  return option?.domains || [];
}

function getDomainsFromRevenue(revenueModel: string): string[] {
  const step = surveyQuestions[3];
  const question = step.questions.find((q) => q.id === 'q7');
  const option = question?.options.find((o) => o.value === revenueModel);
  return option?.domains || [];
}

function addLegalFocus(dataType: string, legalSet: Set<string>) {
  const step = surveyQuestions[2];
  const question = step.questions.find((q) => q.id === 'q6');
  const option = question?.options.find((o) => o.value === dataType);
  if (option?.legalFocus) {
    option.legalFocus.forEach((legal) => legalSet.add(legal));
  }
}

function addLegalRequirement(reg: string, legalSet: Set<string>) {
  const step = surveyQuestions[5];
  const question = step.questions.find((q) => q.id === 'q10');
  const option = question?.options.find((o) => o.value === reg);
  if (option?.legal) {
    const legal = Array.isArray(option.legal) ? option.legal : [option.legal];
    legal.forEach((l) => legalSet.add(l));
  }
}

function addFundingLegal(funding: string, legalSet: Set<string>) {
  const step = surveyQuestions[5];
  const question = step.questions.find((q) => q.id === 'q11');
  const option = question?.options.find((o) => o.value === funding);
  if (option?.legal) {
    const legal = Array.isArray(option.legal) ? option.legal : [option.legal];
    legal.forEach((l) => legalSet.add(l));
  }
}

function addIPLegal(ip: string, legalSet: Set<string>) {
  const step = surveyQuestions[6];
  const question = step.questions.find((q) => q.id === 'q12');
  const option = question?.options.find((o) => o.value === ip);
  if (option?.legal) {
    const legal = Array.isArray(option.legal) ? option.legal : [option.legal];
    legal.forEach((l) => legalSet.add(l));
  }
}

function addFounderLegal(founders: string, legalSet: Set<string>) {
  const step = surveyQuestions[7];
  const question = step.questions.find((q) => q.id === 'q13');
  const option = question?.options.find((o) => o.value === founders);
  if (option?.legal) {
    const legal = Array.isArray(option.legal) ? option.legal : [option.legal];
    legal.forEach((l) => legalSet.add(l));
  }
}

function addEmploymentLegal(employment: string, legalSet: Set<string>) {
  const step = surveyQuestions[7];
  const question = step.questions.find((q) => q.id === 'q14');
  const option = question?.options.find((o) => o.value === employment);
  if (option?.legal) {
    const legal = Array.isArray(option.legal) ? option.legal : [option.legal];
    legal.forEach((l) => legalSet.add(l));
  }
}

function extractLegalRequirements(answers: SurveyAnswers): LegalRequirement[] {
  const legalSet = new Set<string>();

  // Collect legal requirements from survey answers using existing functions
  if (answers.q6) addLegalFocus(answers.q6 as string, legalSet);
  if (answers.q10) {
    (answers.q10 as string[]).forEach((r) => addLegalRequirement(r, legalSet));
  }
  if (answers.q11) addFundingLegal(answers.q11 as string, legalSet);
  if (answers.q12) {
    (answers.q12 as string[]).forEach((ip) => addIPLegal(ip, legalSet));
  }
  if (answers.q13) addFounderLegal(answers.q13 as string, legalSet);
  if (answers.q14) addEmploymentLegal(answers.q14 as string, legalSet);

  // Convert legal keys to LegalRequirement objects using the dictionary
  return Array.from(legalSet)
    .filter(key => legalDictionary[key])
    .map(key => ({
      title: legalDictionary[key].title,
      description: legalDictionary[key].description
    }));
}

function generateRecommendations(domain: string, answers: SurveyAnswers): string[] {
  const recommendations: string[] = [];
  
  recommendations.push(`Focus on ${domain} industry best practices`);
  
  if (answers.q2 === 'idea') {
    recommendations.push('Start with company registration and basic legal setup');
  }
  
  if (answers.q11 && answers.q11 !== 'bootstrapped') {
    recommendations.push('Prepare cap table and shareholder agreements early');
  }
  
  return recommendations;
}

export function predictDomain(answers: SurveyAnswers): DomainResult {
  const domainScores: { [key: string]: number } = {};

  // Q9 (Industry) has highest weight (40%)
  if (answers.q9) {
    const industryDomain = getIndustryDomain(answers.q9 as string);
    domainScores[industryDomain] = (domainScores[industryDomain] || 0) + 40;
  }

  // Q1 (Business Focus) - 20% weight
  if (answers.q1) {
    const domains = getDomainsFromOption(answers.q1 as string);
    domains.forEach((d) => {
      domainScores[d] = (domainScores[d] || 0) + 20;
    });
  }

  // Q3 (Target Customer) - 15% weight
  if (answers.q3) {
    const domains = getDomainsFromCustomer(answers.q3 as string);
    domains.forEach((d) => {
      domainScores[d] = (domainScores[d] || 0) + 15;
    });
  }

  // Q5 (Technology) - 15% weight
  if (Array.isArray(answers.q5)) {
    answers.q5.forEach((tech) => {
      const domains = getDomainsFromTech(tech);
      domains.forEach((d) => {
        domainScores[d] = (domainScores[d] || 0) + 15 / answers.q5.length;
      });
    });
  }

  // Q7 (Revenue Model) - 10% weight
  if (Array.isArray(answers.q7)) {
    answers.q7.forEach((model) => {
      const domains = getDomainsFromRevenue(model);
      domains.forEach((d) => {
        domainScores[d] = (domainScores[d] || 0) + 10 / answers.q7.length;
      });
    });
  }

  // Sort domains by score
  const sortedDomains = Object.entries(domainScores).sort(([, a], [, b]) => b - a);
  const primaryDomain = sortedDomains[0]?.[0] || 'general';
  const confidence = Math.min(100, Math.round(sortedDomains[0]?.[1] || 0));
  const secondaryDomains = sortedDomains.slice(1, 3).map(([domain]) => domain);

  // Extract legal requirements from survey answers
  const extractedLegalRequirements = extractLegalRequirements(answers);

  return {
    primaryDomain,
    confidence,
    secondaryDomains,
    legalRequirements: extractedLegalRequirements,
    recommendations: generateRecommendations(primaryDomain, answers),
  };
}

