/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'sq' | 'en';

export interface ServiceItem {
  id: string;
  icon: string;
  num: string;
  title: string;
  description: string;
  points: string[];
}

export interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PillarItem {
  icon: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  service: string;
  message: string;
}

export interface ArticleItem {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
}
