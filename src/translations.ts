/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from './types';
import { CONTACT_EMAIL } from './config';

export const translations = {
  sq: {
    nav: {
      about: "Rreth Nesh",
      services: "Shërbimet",
      whyUs: "Pse Ne",
      tools: "Kalkulator & Burime",
      contact: "Kontakt",
      cta: "Na Kontaktoni"
    },
    hero: {
      badge: "Vlorë, Shqipëri · Aktiv që nga 2013",
      title1: "Ekspertizë Financiare",
      titleAccent: "që Ndërton Besim",
      sub: "Auditim ligjor, kontabilitet i certifikuar dhe konsulencë financiare për bizneset shqiptare. Operojmë sipas standardeve më të larta ndërkombëtare ISA dhe SNRF.",
      ctaPrimary: "Na Kontaktoni",
      ctaSecondary: "Shërbimet Tona",
      statYears: "Vjet Eksperiencë",
      statServices: "Fusha Shërbimi",
      statStandards: "Standardet ISA / SNRF"
    },
    about: {
      tag: "Rreth Nesh",
      title: "Partnerë të Besuar të Rritjes Tuaj",
      sub: "Themeluar në vitin 2013 në Vlorë, KEI-AL Auditing ka ndërtuar një reputacion të fortë dhe të palëkundur në tregun shqiptar. Të drejtuar nga Arqile Mishtaku, ne kombinojmë standardet më të larta ndërkombëtare me njohuritë e thella të legjislacionit lokal për t'ju ofruar siguri maksimale financiare.",
      foundedLabel: "Viti i Themelimit",
      infoNIPT: "NIPT: L37023201C · Rregulluar & Licencuar",
      pillars: [
        {
          icon: "shield",
          title: "E Licencuar & e Rregulluar",
          description: "Firma operon plotësisht konform legjislacionit shqiptar me licencë zyrtare të auditimit ligjor."
        },
        {
          icon: "globe",
          title: "Standarde Ndërkombëtare",
          description: "Kryejmë auditime sipas Standardeve ISA dhe raportime sipas SNRF (IFRS) dhe SKK vjetore."
        },
        {
          icon: "handshake",
          title: "Premtim Besueshmërie",
          description: "Zgjedhim konfidencialitetin rigoroz, profesionalizmin dhe komunikimin transparent me çdo klient."
        }
      ]
    },
    services: {
      tag: "Shërbimet Tona",
      title: "Zgjidhje Financiare nga Ekspertë",
      sub: "Pesë fusha kryesore të shërbimit, të programuara për të siguruar përputhshmëri të plotë ligjore dhe optimizim të burimeve të biznesit tuaj.",
      items: [
        {
          id: "accounting",
          icon: "bar-chart",
          num: "01",
          title: "Konsulencë Kontabël",
          description: "Mbajtja e plotë e kontabilitetit profesional dhe përgatitja e pasqyrave financiare në përputhje me Standardet Kombëtare të Kontabilitetit (SKK) dhe SNRF.",
          points: [
            "Mbajtje e rregullt e ditarëve dhe kontabilitetit dyjar",
            "Përgatitja e pasqyrave financiare vjetore dhe anekseve",
            "Analizë financiare e trendeve dhe raporte performance",
            "Asistencë në rindërtimin e llogarive dhe sistemeve financiare"
          ]
        },
        {
          id: "audit",
          icon: "search",
          num: "02",
          title: "Auditim Ligjor & i Brendshëm",
          description: "Auditime të pavarura dhe rigoroze të pasqyrave financiare për kompani private, organizata (OJQ) dhe ndërmarrje publike sipas standardeve ISA.",
          points: [
            "Auditim i jashtëm ligjor i pasqyrave vjetore",
            "Auditime të brendshme dhe vlerësim i sistemeve të kontrollit",
            "Rishikimi i informacionit financiar të ndërmjetëm",
            "Dhënie opinioni të certifikuar për aksionerët dhe bankat"
          ]
        },
        {
          id: "payroll",
          icon: "users",
          num: "03",
          title: "Shërbime për Pagat & HR",
          description: "Menaxhimi i plotë i listëpagesave, llogaritjes së kontributeve të sigurimeve, dhe deklarimeve zyrtare pa asnjë gabim ose vonesë.",
          points: [
            "Përgatitje dhe procesim mujor i pay-slip dhe listëpagesave",
            "Deklarimet e sigurimeve shoqërore dhe shëndetësore",
            "Njoftimet zyrtare për fillimet dhe përfundimet e marrëdhënieve të punës",
            "Asistencë me kontratat e punës dhe legjislacionin e punës"
          ]
        },
        {
          id: "tax",
          icon: "receipt",
          num: "04",
          title: "Tatime & Këshillim Fiskal",
          description: "Planifikim dhe deklarim tatimor i saktë për TVSH-në, tatim-fitimin, TAP-in dhe taksat vendore, duke minimizuar rreziqet e penaliteteve.",
          points: [
            "Deklarim mujor i TVSH, librave të shitjes dhe blerjes",
            "Përgatitje e deklaratave të tatim-fitimit vjetor",
            "Këshillim dhe asistencë gjatë kontrolleve dhe auditeve tatimore",
            "Përfaqësues Fiskal për kompani të huaja jorezidente në Shqipëri"
          ]
        },
        {
          id: "other",
          icon: "briefcase",
          num: "05",
          title: "Këshillim Biznesi & Ekspertizë Gjyqësore",
          description: "Mbështetje strategjike për hapjen e bizneseve, hartimin e planeve të biznesit dhe vlerësimin e rreziqeve ekonomike.",
          points: [
            "Hartimi i planeve të biznesit dhe studimeve të fizibilitetit",
            "Ekspertizë kontabël-financiare dhe vlerësime për çështje gjyqësore",
            "Zgjidhje dhe asistencë gjatë proceseve të likujdimit të shoqërive",
            "Konsulencë për strukturimin e kapitalit dhe marrëveshjeve"
          ]
        }
      ]
    },
    whyUs: {
      tag: "Pse të Zgjidhni KEI-AL?",
      title: "Standarde të Larta, Rezultate Konkrete",
      sub: "Ne besojmë se një marrëdhënie e shëndetshme financiare ndërtohet mbi saktësinë, transparencën dhe konfidencialitetin absolut. Ja pse bizneset na besojnë prej vitesh.",
      items: [
        {
          id: "exp",
          icon: "award",
          title: "Mbi 10 Vjet Eksperiencë",
          description: "Themeluar në 2013-ën, ne kemi mbështetur me sukses dhjetëra biznese lokale dhe kombëtare në rritjen e tyre."
        },
        {
          id: "standards",
          icon: "clipboard",
          title: "Përputhshmëri me Standardet",
          description: "Auditime krejtësisht konform Standardeve Ndërkombëtare ISA dhe ligjit shqiptar për audituesit e ligjshëm."
        },
        {
          id: "sec",
          icon: "lock",
          title: "Konfidencialitet i Mbrojtur",
          description: "Informacioni juaj tregtar dhe financiar mbrohet me kujdesin më të lartë, sipas rregullave strikte etike."
        },
        {
          id: "time",
          icon: "zap",
          title: "Efikasitet dhe Saktësi",
          description: "Asnjë vonesë in kalkulime ose në dorëzimin e deklaratave. Siguri e plotë ndaj gjobave dhe penaliteteve."
        },
        {
          id: "place",
          icon: "map",
          title: "Prezencë Lokale & Kombëtare",
          description: "Me qendër kryesore në Vlorë, ne mbulojmë shërbimet tona për klientë në të gjithë Shqipërinë."
        },
        {
          id: "tailor",
          icon: "lightbulb",
          title: "Zgjidhje të Adaptuara",
          description: "Nuk ekziston një recetë e vetme. Çdo paketë shërbimi pershtatet posaçërisht për madhësinë dhe sektorin e biznesit tuaj."
        },
        {
          id: "bilingual",
          icon: "globe",
          title: "Bilingual (AL/EN)",
          description: "Ofrojmë raporte, deklarata dhe komunikime të dyanshme si në shqip ashtu edhe në anglisht për partnerët tuaj të huaj."
        },
        {
          id: "support",
          icon: "phone",
          title: "Mbështetje 365 Ditë",
          description: "Nuk kufizohemi vetëm në mbylljen e bilanceve. Ju mbështesim med këshillim proaktiv përgjatë gjithë vitit."
        }
      ]
    },
    tools: {
      tag: "Burime dhe Asistencë",
      title: "Dizajnuar për Biznesin Shqiptar",
      sub: "Njihuni me detyrimet tuaja dhe bëni vlerësime fillestare të shpejta fiskale përpara se të konsultoheni me ekspertin tonë.",
      calcTitle: "Kalkulatori i Thjeshtuar i Detyrimeve 2026",
      calcDesc: "Kalkuloni vlerësimin e përafërt të kontributeve të sigurimeve shoqërore mbi pagën ose tatimet mbi dividentin me normat aktuale në Shqipëri.",
      selectType: "Zgjidhni llojin e kalkulimit:",
      typeSalary: "Kontributet e Pagës (Sigurimet Shoqërore & TAP)",
      typeDividend: "Tatim Dividenti",
      salaryLabel: "Paga Bruto Mujore (ALL):",
      dividendLabel: "Fitimi i Shpërndarë si Divident (ALL):",
      calcBtn: "Kalkulo Vlerat",
      resultTitle: "Vlerësimi i Kalkuluar:",
      resSocialEmp: "Sigurime Shoqërore (Punëdhënësi - 15%):",
      resSocialWork: "Sigurime Shoqërore (Punëtori - 9.5%):",
      resHealthEmp: "Sigurime Shëndetësore (Punëdhënësi - 1.7%):",
      resHealthWork: "Sigurime Shëndetësore (Punëtori - 1.7%):",
      resTax: "Tatim mbi të Ardhurat nga Paga (TAP):",
      resTotalDeductions: "Totali i Sigurimeve (Punëmarrës):",
      resNetSalary: "Paga Neto e Përafërt:",
      resDivTax: "Tatim Dividenti (8%):",
      resDivNet: "Vlera Neto për t'u paguar:",
      disclaimer: "*Ky është një kalkulim i thjeshtuar referues. Për llogaritje të detajuara zyrtare dhe raste të veçanta (p.sh. paga mbi tavanin maksimal, status i veçantë), ju lutemi na kontaktoni direkt.",
      checkpointsTitle: "Lista e Kontrollit të Përputhshmërisë Ligjore",
      checkpointsDesc: "Sigurohuni që biznesi juaj po ndjek procedurat e sakta fiskale në Shqipëri për vitin 2026:",
      checkpoints: [
        { title: "Deklarimi i Librave të TVSH-së", text: "Dorëzohet çdo muaj deri në datën 14 të muajit pasardhës përmes portalit e-Albania." },
        { title: "Bilanci Vjetor (Pasqyrat)", text: "Dorëzohet zyrtarisht në QKB dhe Administratën Tatimore jo më vonë se data 31 korrik." },
        { title: "Deklarimi i Listëpagesës (E-Sig)", text: "Deri në datën 20 të çdo muaji pasardhës, së bashku me kontributet përkatëse." },
        { title: "Tatim Fitimi (Parapagimi)", text: "Pagesat këst-pas-kësti kryhen sipas njoftimit tatimor përkatës vjetor." }
      ]
    },
    contact: {
      tag: "Kontaktoni Me Ne",
      title: "Na Shkruani për një Konsultë Falas",
      sub: "Ekipi ynë është i gatshëm të dëgjojë nevojat tuaja financiare dhe të propozojë zgjidhjen optimale.",
      addressLabel: "Adresa e Zyrës",
      addressText: "Lagjja 29 Nëntori, Pallati 455, Ap.3, Kati 2, Vlorë, Shqipëri",
      phoneLabel: "Telefon & WhatsApp",
      phoneText: "+355 68 209 5535 / 033 409 839",
      emailLabel: "Posta Elektronike",
      emailText: CONTACT_EMAIL,
      hoursLabel: "Orari i Punës",
      hoursText: "E Hënë – E Premte: 09:00 – 17:00",
      formTitle: "Dërgoni Mesazh të Shpejtë",
      formName: "Emri dhe Mbiemri",
      formNamePh: "Shkruani emrin tuaj të plotë",
      formCompany: "Kompania (Opsionale)",
      formCompanyPh: "Emri i subjektit apo biznesit",
      formEmail: "Adresa Email",
      formEmailPh: "emri@kompania.al",
      formService: "Shërbimi i Kërkuar",
      formServicePh: "Zgjidhni një nga shërbimet tona",
      formMsg: "Mesazhi ose Pyetja Juaj",
      formMsgPh: "Shkruani detaje mbi nevojat tuaja ose pyetjen specifike...",
      formSubmit: "Dërgo Mesazh",
      formSuccess: "Faleminderit! Mesazhi juaj u dërgua me sukses. Ekipi i KEI-AL do t'ju kontaktojë brenda 24 orëve të ardhshme.",
      formError: "Ju lutemi plotësoni të gjitha fushat e kërkuara me saktësi.",
      formSendError: "Mesazhi nuk u dërgua për shkak të një problemi teknik. Ju lutemi provoni përsëri ose na shkruani direkt:",
      mapLabel: "Vendndodhja Jonë në Hartë (Vlorë)",
      whatsappAction: "Na kontaktoni direkt në WhatsApp"
    },
    footer: {
      desc: "Firma profesionale e auditimit ligjor dhe konsulencës financiare me seli në Vlorë. Mbështesim rritjen dhe përputhshmërinë ligjore të biznesit tuaj që nga viti 2013.",
      servicesTitle: "Shërbimet Tona",
      linksTitle: "Lidhjet e Shpejta",
      legalDisclaimer: "Të gjitha të drejtat e rezervuara. KEI-AL Auditing SH.P.K. është organizatë e licencuar me NIPT L37023201C.",
      credits: "Dizajnuar në përputhje me standardet e mbrojtjes së të dhënave."
    }
  },
  en: {
    nav: {
      about: "About Us",
      services: "Services",
      whyUs: "Why Us",
      tools: "Calculator & Checklist",
      contact: "Contact",
      cta: "Contact Us"
    },
    hero: {
      badge: "Vlorë, Albania · Active since 2013",
      title1: "Financial Expertise",
      titleAccent: "that Builds Trust",
      sub: "Legal auditing, certified accounting, and strategic financial advisory for businesses in Albania. Operating in strict accordance with international standards (ISA and IFRS).",
      ctaPrimary: "Contact Us",
      ctaSecondary: "Our Services",
      statYears: "Years of Experience",
      statServices: "Service Practice Areas",
      statStandards: "ISA & IFRS Compliant"
    },
    about: {
      tag: "About Us",
      title: "Trusted Partners for Your Growth",
      sub: "Established in 2013 in Vlorë, KEI-AL Auditing has built a strong reputation in the Albanian market. Led by Arqile Mishtaku, we combine high international standards with deep insights into local legislation to provide you with maximum financial security.",
      foundedLabel: "Year Established",
      infoNIPT: "NIPT: L37023201C · Fully Licensed & Regulated",
      pillars: [
        {
          icon: "shield",
          title: "Licensed & Regulated",
          description: "The firm is fully licensed and operates in strict compliance with Albanian legislation for statutory legal audits."
        },
        {
          icon: "globe",
          title: "International Standards",
          description: "We conduct audits in accordance with International Standards on Auditing (ISA) and report under IFRS / National Accounting Standards."
        },
        {
          icon: "handshake",
          title: "Professional Integrity",
          description: "We guarantee rigorous confidentiality, exceptional professionalism, and transparent communication with every client."
        }
      ]
    },
    services: {
      tag: "Our Services",
      title: "Expert Financial & Auditing Solutions",
      sub: "Five core areas of service, designed to ensure full legal compliance and optimize your business resources.",
      items: [
        {
          id: "accounting",
          icon: "bar-chart",
          num: "01",
          title: "Accounting & Bookkeeping",
          description: "Professional bookkeeping and annual financial statement preparation in accordance with National Accounting Standards (SKK) and IFRS.",
          points: [
            "Regular bookkeeping and double-entry accounting",
            "Preparation of annual financial statements and disclosures",
            "Financial performance analysis and reporting",
            "Assistance with account reconstruction and financial systems"
          ]
        },
        {
          id: "audit",
          icon: "search",
          num: "02",
          title: "Statutory & Internal Auditing",
          description: "Independent and rigorous audits of financial statements for private companies, non-profit organizations (NGOs), and public enterprises under ISA.",
          points: [
            "Statutory external audit of annual financial statements",
            "Internal audits and evaluation of internal control systems",
            "Review of interim financial information",
            "Providing certified independent opinions for shareholders and banks"
          ]
        },
        {
          id: "payroll",
          icon: "users",
          num: "03",
          title: "Payroll & HR Services",
          description: "Full management of payroll, social security contributions, and official declarations without errors or delays.",
          points: [
            "Monthly payroll preparation and pay-slip processing",
            "Social security and health insurance declarations",
            "Official declarations for hiring, job changes, and employment terminations",
            "Assistance with employment contracts and labor legislation compliance"
          ]
        },
        {
          id: "tax",
          icon: "receipt",
          num: "04",
          title: "Tax & Fiscal Advisory",
          description: "Accurate tax planning and declaration of VAT, corporate income tax, withholding taxes, and local duties, minimizing compliance risks.",
          points: [
            "Monthly VAT declarations, purchase/sales ledgers filings",
            "Preparation of annual corporate tax declarations",
            "Advisory and support during tax controls and audits",
            "Fiscal representation services for non-resident foreign companies"
          ]
        },
        {
          id: "other",
          icon: "briefcase",
          num: "05",
          title: "Business Advisory & Judicial Expertise",
          description: "Strategic support for business startups, business plan writing, risk analysis, and forensic accounting reports.",
          points: [
            "Drafting of business plans and feasibility studies",
            "Financial and accounting expertise reports for court proceedings",
            "Support and advisory during corporate liquidation processes",
            "Advisory on capital restructuring and business agreements"
          ]
        }
      ]
    },
    whyUs: {
      tag: "Why Choose KEI-AL?",
      title: "High Standards, Solid Ground",
      sub: "We believe a solid financial partnership is built on accuracy, transparency, and absolute confidentiality. Here is why businesses trust us.",
      items: [
        {
          id: "exp",
          icon: "award",
          title: "Over 10 Years of Experience",
          description: "Established in 2013, we have successfully assisted dozens of local and national businesses in their growth."
        },
        {
          id: "standards",
          icon: "clipboard",
          title: "Compliance with Standards",
          description: "Our audits are executed fully in accordance with International Standards on Auditing (ISA) and local laws."
        },
        {
          id: "sec",
          icon: "lock",
          title: "Rigorous Confidentiality",
          description: "Your commercial and financial information is protected with the highest level of confidentiality and care."
        },
        {
          id: "time",
          icon: "zap",
          title: "Efficiency and Accuracy",
          description: "No delays in calculations or filing submissions. Complete security against penalties and audits."
        },
        {
          id: "place",
          icon: "map",
          title: "Local & National Presence",
          description: "Headquartered in Vlorë, we provide our services to clients all across Albania."
        },
        {
          id: "tailor",
          icon: "lightbulb",
          title: "Tailored Solutions",
          description: "Every service package is customized to meet the size and specific sector of your business."
        },
        {
          id: "bilingual",
          icon: "globe",
          title: "Bilingual Services (AL/EN)",
          description: "We provide bilingual reporting, financial statements, and correspondence in Albanian and English."
        },
        {
          id: "support",
          icon: "phone",
          title: "Year-Round Support",
          description: "We provide ongoing, proactive advisory and support throughout the entire year."
        }
      ]
    },
    tools: {
      tag: "Resources & Advisory Tools",
      title: "Designed for Albanian Businesses",
      sub: "Understand your tax obligations and perform initial estimates before consulting with our experts.",
      calcTitle: "Simplified Tax & Salary Calculator 2026",
      calcDesc: "Calculate approximate social security contributions, salary taxes, or dividend tax under current Albanian rates.",
      selectType: "Select Calculation Type:",
      typeSalary: "Salary Contributions (Social Security & PAYE)",
      typeDividend: "Dividend Tax",
      salaryLabel: "Monthly Gross Salary (ALL):",
      dividendLabel: "Distributed Dividend (ALL):",
      calcBtn: "Calculate",
      resultTitle: "Calculated Summary:",
      resSocialEmp: "Social Security (Employer - 15%):",
      resSocialWork: "Social Security (Employee - 9.5%):",
      resHealthEmp: "Health Insurance (Employer - 1.7%):",
      resHealthWork: "Health Insurance (Employee - 1.7%):",
      resTax: "Income Tax on Salary (PAYE/TAP):",
      resTotalDeductions: "Total Contributions (Employee):",
      resNetSalary: "Approximate Net Salary:",
      resDivTax: "Dividend Tax (8%):",
      resDivNet: "Net Dividend Payout:",
      disclaimer: "*This is a simplified reference calculation. For detailed calculations and special cases (e.g. salaries above maximum cap, special statuses), please contact us directly.",
      checkpointsTitle: "Legal Compliance Checklist",
      checkpointsDesc: "Ensure your business complies with key tax and legal deadlines in Albania for 2026:",
      checkpoints: [
        { title: "VAT Books Declaration", text: "Submitted monthly by the 14th of the following month via the e-Albania portal." },
        { title: "Annual Balance Sheet (Financial Statements)", text: "Officially submitted to the NBC (QKB) and Tax Administration no later than July 31st." },
        { title: "Payroll Declaration (E-Sig)", text: "Submitted by the 20th of each following month, along with corresponding social security payments." },
        { title: "Income Tax (Advance Payments)", text: "Installment payments made in accordance with the annual tax notification." }
      ]
    },
    contact: {
      tag: "Contact Us",
      title: "Write to Us for a Free Consultation",
      sub: "Our team is ready to listen to your financial needs and propose the optimal solutions.",
      addressLabel: "Office Address",
      addressText: "Lagjja 29 Nëntori, Pallati 455, Ap.3, Kati 2, Vlorë, Albania",
      phoneLabel: "Phone & WhatsApp",
      phoneText: "+355 68 209 5535 / 033 409 839",
      emailLabel: "Email Address",
      emailText: CONTACT_EMAIL,
      hoursLabel: "Office Hours",
      hoursText: "Monday – Friday: 09:00 – 17:00",
      formTitle: "Send a Quick Message",
      formName: "Full Name",
      formNamePh: "Your first and last name",
      formCompany: "Company Name (Optional)",
      formCompanyPh: "Name of your business or company",
      formEmail: "Email Address",
      formEmailPh: "name@company.com",
      formService: "Requested Service",
      formServicePh: "Select one of our services",
      formMsg: "Your Message or Question",
      formMsgPh: "Provide details about your needs or specific questions...",
      formSubmit: "Send Message",
      formSuccess: "Thank you! Your message has been sent successfully. The KEI-AL team will contact you within 24 hours.",
      formError: "Please fill in all required fields accurately.",
      formSendError: "Your message could not be sent because of a technical problem. Please try again or contact us directly:",
      mapLabel: "Our Location on the Map (Vlorë)",
      whatsappAction: "Contact us directly via WhatsApp"
    },
    footer: {
      desc: "Professional auditing and financial consulting firm based in Vlorë. Supporting the growth and compliance of your business since 2013.",
      servicesTitle: "Our Services",
      linksTitle: "Quick Links",
      legalDisclaimer: "All rights reserved. KEI-AL Auditing SH.P.K. is a fully registered, licensed accounting service structure with NIPT: L37023201C.",
      credits: "Designed in accordance with data protection guidelines."
    }
  }
};
