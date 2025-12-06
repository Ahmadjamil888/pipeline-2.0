import { acme, apex, avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, celestial, echo, instagram, linkedin, pin, pulse, quantum, x, youtube } from "@/public";
import { features } from "process";

/**
 * An array of navigation items, each with an id, title, and href.
 * These items are used to build the main navigation menu of the application.
 */
export const navigationItems = [
   {
      id: 1,
      title: 'Home',
      href: '/'
   },
   {
      id: 2,
      title: 'About',
      href: '/about'
   },
   {
      id: 3,
      title: 'Features',
      href: '/features'
   },
   {
      id: 4,
      title: 'Contact',
      href: '/contact'
   }
];

export const pricingTiers = [
   {
      id: 1,
      title: "Free",
      monthlyPrice: 0,
      buttonText: "Get started for free",
      popular: false,
      inverse: false,
      features: [
         "Up to 5 project members",
         "Unlimited tasks and projects",
         "2GB storage",
         "Integrations",
         "Basic support",
      ],
   },
   {
      id: 2,
      title: "Pro",
      monthlyPrice: 9,
      buttonText: "Sign up now",
      popular: true,
      inverse: true,
      features: [
         "Up to 50 project members",
         "Unlimited tasks and projects",
         "50GB storage",
         "Integrations",
         "Priority support",
         "Advanced support",
         "Export support",
      ],
   },
   {
      id: 3,
      title: "Business",
      monthlyPrice: 19,
      buttonText: "Sign up now",
      popular: false,
      inverse: false,
      features: [
         "Up to 5 project members",
         "Unlimited tasks and projects",
         "200GB storage",
         "Integrations",
         "Dedicated account manager",
         "Custom fields",
         "Advanced analytics",
         "Export capabilities",
         "API access",
         "Advanced security features",
      ],
   },
];

export const testimonials = [
   {
      id: 1,
      text: "ZehanX Tech's research in quantum algorithms has opened new possibilities for our computational chemistry simulations. Their expertise is exceptional.",
      src: avatar9,
      name: "Dr. Ahsan Khalid",
      username: "Quantum Physicist",
   },
   {
      id: 2,
      text: "As a product designer, I’m always exploring innovative tech—and Zehanx instantly impressed me with its clean development and smart automation.",
      src: avatar1,
      name: "Dr. Sana Farooq",
      username: "AI Researcher",
   },
   {
      id: 3,
      text: "Our productivity skyrocketed after integrating Zehanx’s AI tools. Tasks that took hours now complete in minutes.",
      src: avatar2,
      name: "Dr. Bilal Ahmed",
      username: "Quantum Engineer",
   },
   {
      id: 4,
      text: "The multi-agent coordination frameworks developed by ZehanX have transformed our distributed AI systems research.",
      src: avatar3,
      name: "Dr. Maria Sheikh",
      username: "Computer Scientist",
   },
   {
      id: 5,
      text: "ZehanX's quantum error correction methods are advancing the reliability of our quantum computing experiments substantially.",
      src: avatar4,
      name: "Dr. Humza Tariq",
      username: "Research Scientist",
   },
   {
      id: 6,
      text: "Their AI-powered systems help us track operations efficiently and prevent workflow bottlenecks. It’s a game-changer.",
      src: avatar5,
      name: "Dr. Laiba Noor",
      username: "Cognitive Scientist",
   },
   {
      id: 7,
      text: "The quantum information theory research from ZehanX has been instrumental in advancing our quantum cryptography protocols.",
      src: avatar6,
      name: "Dr. Rehan Malik",
      username: "Cryptography Expert",
   },
   {
      id: 8,
      text: "Collaborating on reinforcement learning for agentic AI has yielded remarkable results. ZehanX brings exceptional research depth.",
      src: avatar7,
      name: "Dr. Farhan Ali",
      username: "Machine Learning Researcher",
   },
   {
      id: 9,
      text: "Their quantum state manipulation techniques have significantly improved our quantum sensing applications. Excellent collaboration.",
      src: avatar8,
      name: "Dr. Imran Siddiqui",
      username: "Quantum Technologist",
   },
];

export const logoMarqueeItems = [
   {
      id: 1,
      src: apex
   },
   {
      id: 2,
      src: acme
   },
   {
      id: 3,
      src: celestial
   },
   {
      id: 4,
      src: echo
   },
   {
      id: 5,
      src: pulse
   },
   {
      id: 6,
      src: quantum
   }
];

export const footerItems = [
   {
      id: 1,
      title: 'About',
      href: '/about'
   },
   {
      id: 2,
      title: 'Features',
      href: '/features'
   },
   
   {
      id: 3,
      title: 'Contact',
      href: '/contact'
   },
];

export const contactInfo = {
   email: 'zehanxtech@gmail.com',
   phone: '+92 344 2693910',
   company: 'ZehanX Technologies',
   slogan: 'Advancing Quantum Mechanics and Agentic AI Research'
};

export const footerSocialsItems = [
   {
      id: 1,
      src: instagram,
      href: "/"
   },
   {
      id: 2,
      src: linkedin,
      href: "/"
   },
   {
      id: 3,
      src: pin,
      href: "/"
   },
   {
      id: 4,
      src: x,
      href: "/"
   },
   {
      id: 5,
      src: youtube,
      href: "/"
   },
];

export const pricingItems = [
   {
      id: 1,
      title: 'Starter',
      price: 0,
      btn: "Get Started Free",
      features: [
         {
            id: 1,
            feature: "5 AI models per month",
         },
         {
            id: 2,
            feature: "Basic model architectures",
         },
         {
            id: 3,
            feature: "Public datasets only",
         },
         {
            id: 4,
            feature: "Community support",
         },
         {
            id: 5,
            feature: "Standard training speed",
         },
      ]
   },
   {
      id: 2,
      title: 'Professional',
      price: 49,
      btn: "Start Building",
      features: [
         {
            id: 1,
            feature: "Unlimited AI models",
         },
         {
            id: 2,
            feature: "Advanced architectures",
         },
         {
            id: 3,
            feature: "Custom dataset upload",
         },
         {
            id: 4,
            feature: "Priority training queue",
         },
         {
            id: 5,
            feature: "API access",
         },
         {
            id: 6,
            feature: "Real-time monitoring",
         },
         {
            id: 7,
            feature: "Priority support",
         },
      ]
   },
   {
      id: 3,
      title: 'Enterprise',
      price: 199,
      btn: "Contact Sales",
      features: [
         {
            id: 1,
            feature: "Everything in Professional",
         },
         {
            id: 2,
            feature: "Dedicated GPU resources",
         },
         {
            id: 3,
            feature: "Custom model architectures",
         },
         {
            id: 4,
            feature: "Private deployment",
         },
         {
            id: 5,
            feature: "Team collaboration",
         },
         {
            id: 6,
            feature: "SLA guarantee",
         },
         {
            id: 7,
            feature: "Dedicated support engineer",
         },
      ]
   },
];