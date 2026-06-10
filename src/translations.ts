/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from './types';

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
          icon: "🏛️",
          title: "E Licencuar & e Rregulluar",
          description: "Firma operon plotësisht konform legjislacionit shqiptar me licencë zyrtare të auditimit ligjor."
        },
        {
          icon: "🌍",
          title: "Standarde Ndërkombëtare",
          description: "Kryejmë auditime sipas Standardeve ISA dhe raportime sipas SNRF (IFRS) dhe SKK vjetore."
        },
        {
          icon: "🤝",
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
          icon: "📊",
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
          icon: "🔍",
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
          icon: "👥",
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
          icon: "🧾",
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
          icon: "💼",
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
          icon: "🏆",
          title: "Mbi 10 Vjet Eksperiencë",
          description: "Themeluar në 2013-ën, ne kemi mbështetur me sukses dhjetëra biznese lokale dhe kombëtare në rritjen e tyre."
        },
        {
          id: "standards",
          icon: "📋",
          title: "Përputhshmëri me Standardet",
          description: "Auditime krejtësisht konform Standardeve Ndërkombëtare ISA dhe ligjit shqiptar për audituesit e ligjshëm."
        },
        {
          id: "sec",
          icon: "🔒",
          title: "Konfidencialitet i Mbrojtur",
          description: "Informacioni juaj tregtar dhe financiar mbrohet me kujdesin më të lartë, sipas rregullave strikte etike."
        },
        {
          id: "time",
          icon: "⚡",
          title: "Efikasitet dhe Saktësi",
          description: "Asnjë vonesë në kalkulime ose në dorëzimin e deklaratave. Siguri e plotë ndaj gjobave dhe penaliteteve."
        },
        {
          id: "place",
          icon: "🗺️",
          title: "Prezencë Lokale & Kombëtare",
          description: "Me qendër kryesore në Vlorë, ne mbulojmë shërbimet tona për klientë në të gjithë Shqipërinë."
        },
        {
          id: "tailor",
          icon: "💡",
          title: "Zgjidhje të Adaptuara",
          description: "Nuk ekziston një recetë e vetme. Çdo paketë shërbimi pershtatet posaçërisht për madhësinë dhe sektorin e biznesit tuaj."
        },
        {
          id: "bilingual",
          icon: "🌐",
          title: "Bilingual (AL/EN)",
          description: "Ofrojmë raporte, deklarata dhe komunikime të dyanshme si në shqip ashtu edhe në anglisht për partnerët tuaj të huaj."
        },
        {
          id: "support",
          icon: "📞",
          title: "Mbështetje 365 Ditë",
          description: "Nuk kufizohemi vetëm në mbylljen e bilanceve. Ju mbështesim me këshillim proaktiv përgjatë gjithë vitit."
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
      emailText: "info@keialauditing.al",
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
      tools: "Calculator & Resources",
      contact: "Contact",
      cta: "Contact Us"
    },
    hero: {
      badge: "Vlorë, Albania · Active since 2013",
      title1: "Financial Expertise",
      titleAccent: "that Builds Trust",
      sub: "Legal auditing, certified accounting, and strategic financial advisory for corporate clients in Albania. Operating per high international ISA and IFRS standards.",
      ctaPrimary: "Contact Us",
      ctaSecondary: "Our Services",
      statYears: "Years of Experience",
      statServices: "Service Sectors",
      statStandards: "ISA & IFRS Compliant"
    },
    about: {
      tag: "About Us",
      title: "Trusted Partners for Your Growth",
      sub: "Established in 2013 in Vlorë, KEI-AL Auditing has forged a solid reputation in the Albanian corporate ecosystem. Led by Arqile Mishtaku, we seamlessly combine global financial compliance models with in-depth local legislative insights to bring certainty and resilience to your operations.",
      foundedLabel: "Year Established",
      infoNIPT: "NIPT: L37023201C · Fully Licensed & Regulated",
      pillars: [
        {
          icon: "🏛️",
          title: "Licensed & Regulated",
          description: "The firm operates under strict Albanian business license mandates for statutory legal audit operations."
        },
        {
          icon: "🌍",
          title: "International Standards",
          description: "All legal audits are aligned with International Standards on Auditing (ISA) and IFRS reports."
        },
        {
          icon: "🤝",
          title: "Pledge of Integrity",
          description: "We are committed to absolute data confidentiality, ethical precision, and transparent relations."
        }
      ]
    },
    services: {
      tag: "Our Services",
      title: "Corporate Accounting & Expert Audit",
      sub: "Five distinct areas of specialization structured to secure complete legal filing compliance and operational tax optimization.",
      items: [
        {
          id: "accounting",
          icon: "📊",
          num: "01",
          title: "Accounting & Certified Advisory",
          description: "Comprehensive double-entry bookkeeping, general ledger administration, and annual reporting compliant with National Accounting Standards (SKK) & IFRS.",
          points: [
            "Continuous transactions logging and sub-ledger accounting",
            "Filing of standard annual financial statements & disclosures",
            "Corporate performance reporting & profitability reviews",
            "Advisory on account reconstruction and internal systems setup"
          ]
        },
        {
          id: "audit",
          icon: "🔍",
          num: "02",
          title: "Statutory & Internal Audit",
          description: "Rigorous and objective independent legal audits of statements for corporations, NGOs, and public sector organizations under strict ISA conventions.",
          points: [
            "Independent external legal auditing for annual balance sheets",
            "Internal audit diagnostic reviews and key control tests",
            "Review of mid-term and interim financial information",
            "Certified opinion delivery for shareholders, partners, and banks"
          ]
        },
        {
          id: "payroll",
          icon: "👥",
          num: "03",
          title: "Payroll Management & HR",
          description: "Complete handling of corporate payroll databases, employee declarations, social insurance computations, and compliance filings with no clerical errors.",
          points: [
            "Monthly payroll processing and pay-slip distribution",
            "Social, health, and pension insurance calculations",
            "Official state registration of hires, job changes, and terminations",
            "Advisory on employment contract conditions and labor laws"
          ]
        },
        {
          id: "tax",
          icon: "🧾",
          num: "04",
          title: "Corporate Tax & Fiscal Filing",
          description: "Proactive planning and filing of monthly VAT reports, corporate income tax (tatim-fitimi), employee withholding tax, and local municipal duties.",
          points: [
            "Monthly VAT declaration & sales/purchase ledger reconciliation",
            "Preparation of annual corporate profit tax returns",
            "Direct legal representation during government fiscal audits",
            "Authorized Fiscal Representation for non-resident multinationals"
          ]
        },
        {
          id: "other",
          icon: "💼",
          num: "05",
          title: "Business Consulting & Forensic Accounting",
          description: "High-value business strategy advice, feasibility evaluations, startup legal structuring, and expert accounting opinions for judicial processes.",
          points: [
            "Business development planning & commercial feasibility assessments",
            "Forensic accounting valuations for court and legal arbitrations",
            "Assistance and structuring for corporate liquidation tracks",
            "Capital structuring advise and corporate partnerships layouts"
          ]
        }
      ]
    },
    whyUs: {
      tag: "Why Choose KEI-AL?",
      title: "Exceptional Integrity, Proven Impact",
      sub: "We believe robust corporate growth is anchored on sound accounting guidance, absolute confidentiality, and rapid execution. Here's why leading enterprises partner with us.",
      items: [
        {
          id: "exp",
          icon: "🏆",
          title: "10+ Years of Excellence",
          description: "Since 2013, we represent an unwavering pillar of stability for dozens of SME clients and state organisations."
        },
        {
          id: "standards",
          icon: "📋",
          title: "Rigorous ISA Compliance",
          description: "All audits adhere precisely to the latest revisions of the International Standards on Auditing (ISA)."
        },
        {
          id: "sec",
          icon: "🔒",
          title: "Guaranteed Confidentiality",
          description: "Your financial data and business blueprints are shielded under strict, secure nondisclosure parameters."
        },
        {
          id: "time",
          icon: "⚡",
          title: "On-Time execution",
          description: "Zero processing backlogs. We keep your fiscal calendars fully tracked, protecting you from tax audits penalties."
        },
        {
          id: "place",
          icon: "🗺️",
          title: "National Coverage",
          description: "With corporate headquarters based in Vlorë, we serve dynamic business partners operating across all of Albania."
        },
        {
          id: "tailor",
          icon: "💡",
          title: "Customized Service Packs",
          description: "No generic templates. Service scopes are specifically scaled to match your precise sector and financial volume."
        },
        {
          id: "bilingual",
          icon: "🌐",
          title: "Dual Language Delivery",
          description: "Reports, meetings, and financial summaries are available in either English or Albanian for your international partners."
        },
        {
          id: "support",
          icon: "📞",
          title: "Constant Professional Access",
          description: "We are your year-round financial guides, ready to consult on strategic opportunities and legislative shifts."
        }
      ]
    },
    tools: {
      tag: "Resources & Advisory Tools",
      title: "Tailored to Albanian Compliance",
      sub: "Equip your business with quick answers to fiscal timelines and compute initial payroll deductions or dividend distributions on-the-fly.",
      calcTitle: "Simplified Fiscal Estimation Tool 2026",
      calcDesc: "Estimate social insurance obligations or corporate dividend distributions under the latest tax parameters applicable in Albania.",
      selectType: "Choose Calculation Category:",
      typeSalary: "Payroll Contributions (Employer/Employee & Tax)",
      typeDividend: "Dividend Tax Distribution",
      salaryLabel: "Monthly Gross Base Salary (ALL):",
      dividendLabel: "Distributed Gross Profits Dividend (ALL):",
      calcBtn: "Calculate Valuation",
      resultTitle: "Estimated Valuation:",
      resSocialEmp: "Social Security (Employer - 15%):",
      resSocialWork: "Social Security (Employee - 9.5%):",
      resHealthEmp: "Health Insurance (Employer - 1.7%):",
      resHealthWork: "Health Insurance (Employee - 1.7%):",
      resTax: "Withholding Value-added Wage Tax (TAP):",
      resTotalDeductions: "Employee Total Deductions:",
      resNetSalary: "Estimated Take-Home Net Salary:",
      resDivTax: "Dividend Tax (8% rate):",
      resDivNet: "Net Divestment Payout:",
      disclaimer: "*This tool provides simplified estimations. Official calculations require adjusting for the national ceiling caps and dynamic tax brackets. Contact us directly for a comprehensive payroll sheet layout.",
      checkpointsTitle: "Essential Compliance Timeline",
      checkpointsDesc: "Ensure your commercial entity complies with basic recurring filing limits in Albania:",
      checkpoints: [
        { title: "VAT Ledgers Submission", text: "Due by the 14th of every following month via the central e-Albania platform logs." },
        { title: "Annual Financial Statement Ledger", text: "Must be officially compiled and reported to QKB and tax offices before July 31st." },
        { title: "E-Insurance Declarations", text: "Must be completed and settled online by the 20th of each following calendar month." },
        { title: "Quarterly Profitable Pre-tax payments", text: "Settled in recurring slots based on corporate performance parameters assigned." }
      ]
    },
    contact: {
      tag: "Connect with Our Office",
      title: "Book a Complimentary Consult Session",
      sub: "Our specialists are ready to analyze your financial parameters and engineer a robust action plan for optimization.",
      addressLabel: "Headquarters",
      addressText: "Lagjja 29 Nëntori, Pallati 455, Ap.3, Kati 2, Vlorë, Albania",
      phoneLabel: "Phone & WhatsApp Direct",
      phoneText: "+355 68 209 5535 or 033 409 839",
      emailLabel: "Electronic Mailbox",
      emailText: "info@keialauditing.al",
      hoursLabel: "Operating Hours",
      hoursText: "Monday – Friday: 09:00 AM – 05:00 PM",
      formTitle: "Instant Callback Inquiry",
      formName: "Full Professional Name",
      formNamePh: "Your first and last name",
      formCompany: "Enterprise Name (Optional)",
      formCompanyPh: "Your enterprise or company business name",
      formEmail: "Contact Email Address",
      formEmailPh: "name@enterprise.com",
      formService: "Target Practice Area",
      formServicePh: "Select whichever represents your primary need",
      formMsg: "Detailed Inquiry",
      formMsgPh: "Detail your needs, commercial size, or ask a specific legal audit question...",
      formSubmit: "Transmit Message",
      formSuccess: "Thank you! Your message was submitted successfully. The KEI-AL advisory team will contact you within 24 business hours.",
      formError: "Please write correct values into all requested fields.",
      mapLabel: "Our Office Map Coordinates (Vlorë)",
      whatsappAction: "Reach Us Seamlessly via WhatsApp"
    },
    footer: {
      desc: "Licensed statutory legal auditing and accounting consulting firm based in Vlorë, Albania. Protecting and ensuring the transparency of your business since 2013.",
      servicesTitle: "Services List",
      linksTitle: "Helpful Navigation",
      legalDisclaimer: "All rights reserved. KEI-AL Auditing SH.P.K. is a fully registered, licensed accounting service structure with NIPT: L37023201C.",
      credits: "Built according to international GDPR and data security protocols."
    }
  }
};
