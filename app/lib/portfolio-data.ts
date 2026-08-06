export interface PortfolioProject {
  title: string;
  category: string;
  year: string;
  description: string;
  overview: string;
  technologies: string[];
  features: string[];
  image: string;
  mockupImage: string;
  challenge: string;
  solution: string;
  result: string;
  metrics?: Array<{ value: string; label: string }>;
}

export const portfolioData: Record<string, PortfolioProject> = {
'northwave-commerce': {
  title: 'Northwave Commerce Platform',
  category: 'Web Development',
  year: '2024',
  description:
    'A high-conversion e-commerce experience for a modern lifestyle brand.',
  overview:
    'Northwave is a sophisticated e-commerce platform designed to provide a seamless shopping experience. Built with modern technologies, it features intuitive navigation, fast loading times, and a secure checkout process.',
  technologies: [
    'Next.js',
    'React',
    'Node.js',
    'MongoDB',
    'Stripe',
    'Tailwind CSS',
  ],
  features: [
    'Product catalog and search',
    'Secure payment processing',
    'User authentication',
    'Order management',
    'Responsive design',
    'Performance optimization',
  ],
  image: '/portfolio-images/image-1-(NCP).png',
  mockupImage: '/portfolio-images/Card-images/card-img1-(NCP).png',
  challenge:
    'Building a high-performance e-commerce platform with conversion optimization.',
  solution:
    'Implemented a modern tech stack with optimized load times and user-focused design.',
  result:
    'Increased sales conversions and improved customer satisfaction through streamlined shopping experience.',
  metrics: [
    { value: '+182%', label: 'Conversion uplift' },
    { value: '0.9s', label: 'Page speed' },
    { value: '+3.4x', label: 'Mobile revenue' },
  ],
},
'finlight-personal-finance': {
  title: 'Finlight Personal Finance',
  category: 'UI/UX Design',
  year: '2024',
  description:
    'Refreshing personal finance with calm, confident, data-rich design.',
  overview:
    'Finlight is a personal finance management application that helps users track spending, manage budgets, and achieve financial goals. The design focuses on clarity and usability with intuitive data visualization.',
  technologies: [
    'React',
    'Node.js',
    'MongoDB',
    'Chart.js',
    'Tailwind CSS',
  ],
  features: [
    'Expense tracking and categorization',
    'Budget planning and alerts',
    'Financial insights and analytics',
    'Goal setting and monitoring',
    'Secure authentication',
    'Mobile-responsive interface',
  ],
  image: '/portfolio-images/image-2-(FPF).png',
  mockupImage: '/portfolio-images/Card-images/card-img2-(FPF).png',
  challenge:
    'Creating an intuitive finance dashboard that makes complex data easy to understand.',
  solution:
    'Implemented clean UI with data visualization and user-centric design patterns.',
  result:
    'Improved user engagement with financial management through better UX design.',
  metrics: [
    { value: '+64%', label: 'Onboarding completion' },
    { value: '+38%', label: 'DAU' },
    { value: '4.8★', label: 'App Scoring' },
  ],
},
'evergreen-brand-identity': {
  title: 'Evergreen Brand Identity',
  category: 'Branding',
  year: '2024',
  description:
    'A grounded, organic identity system for a sustainable consumer brand.',
  overview:
    'Evergreen is a comprehensive branding project for a sustainable consumer brand. The identity reflects the brand\'s commitment to environmental responsibility through thoughtful design and organic visual elements.',
  technologies: [
    'Figma',
    'Adobe XD',
    'Brand Guidelines',
  ],
  features: [
    'Logo design and variations',
    'Color palette system',
    'Typography guidelines',
    'Brand collateral',
    'Marketing materials',
    'Visual identity guidelines',
  ],
  image: '/portfolio-images/image-3-(SRB).png',
  mockupImage: '/portfolio-images/Card-images/card-images-3.png',
  challenge:
    'Developing an authentic brand identity that communicates sustainability values.',
  solution:
    'Created organic, grounded visual language that resonates with eco-conscious consumers.',
  result:
    'Strong brand recognition and customer connection through meaningful design.',
},
'pulse-analytics-dashboard': {
  title: 'Pulse Analytics Dashboard',
  category: 'UI/UX Design',
  year: '2024',
  description:
    'An analytics suite designed for clarity and faster decisions.',
  overview:
    'Pulse Analytics is a comprehensive business intelligence dashboard that provides real-time insights and performance metrics. The interface prioritizes data clarity and actionable insights for quick decision-making.',
  technologies: [
    'React',
    'Node.js',
    'PostgreSQL',
    'D3.js',
    'Tailwind CSS',
  ],
  features: [
    'Real-time data visualization',
    'Customizable dashboards',
    'Advanced analytics',
    'Performance metrics',
    'Report generation',
    'Data filtering and drill-down',
  ],
  image: '/portfolio-images/image-1-(NCP).png',
  mockupImage: '/portfolio-images/Card-images/card-image-4.png',
  challenge:
    'Presenting complex analytics in a clear and actionable manner.',
  solution:
    'Designed intuitive visualizations with progressive disclosure for data exploration.',
  result:
    'Faster data-driven decision making with improved user understanding of metrics.',
},
'lumen-social-campaign': {
  title: 'Lumen Social Campaign',
  category: 'Digital Marketing',
  year: '2024',
  description:
    'A multi-channel digital campaign that drove engagement across platforms.',
  overview:
    'Lumen is a comprehensive digital marketing campaign that leveraged multiple social channels to build brand awareness and engagement. The campaign focused on consistent messaging and platform-specific content optimization.',
  technologies: [
    'Social Media Marketing',
    'Content Creation',
    'Analytics',
    'A/B Testing',
  ],
  features: [
    'Multi-platform strategy',
    'Engaging content creation',
    'Influencer partnerships',
    'Performance tracking',
    'Community management',
    'Campaign optimization',
  ],
  image: '/portfolio-images/image-2-(FPF).png',
  mockupImage: '/portfolio-images/Card-images/card-img5.png',
  challenge:
    'Creating cohesive messaging across multiple social platforms.',
  solution:
    'Developed platform-specific content strategies while maintaining brand consistency.',
  result:
    'Increased engagement, expanded reach, and improved brand presence across social channels.',
},
'savor-restaurant-booking': {
  title: 'Savor Restaurant Booking',
  category: 'Web Development',
  year: '2024',
  description:
    'A booking-first restaurant site that lifted reservations 3x.',
  overview:
    'Savor is a restaurant reservation and discovery platform that simplifies the dining experience. The platform offers seamless booking, restaurant discovery, and personalized recommendations through an elegant interface.',
  technologies: [
    'Next.js',
    'React',
    'Node.js',
    'MongoDB',
    'Stripe',
    'Tailwind CSS',
  ],
  features: [
    'Restaurant discovery and search',
    'Easy reservation booking',
    'Table availability management',
    'User reviews and ratings',
    'Payment processing',
    'Mobile-responsive design',
  ],
  image: '/portfolio-images/image-3-(SRB).png',
  mockupImage: '/portfolio-images/Card-images/card-img6.png',
  challenge:
    'Building a user-friendly reservation system with real-time availability.',
  solution:
    'Implemented efficient backend with real-time table management and intuitive frontend.',
  result:
    'Significantly increased reservations and improved restaurant utilization rates.',
  metrics: [
    { value: '3.1x', label: 'Conversion uplift' },
    { value: '-42%', label: 'Mobile bounce' },
    { value: '+18%', label: 'Avg. cover' },
  ],
},
};
