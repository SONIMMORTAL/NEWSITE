import { lazy } from 'react';

/**
 * Route table — the single source of truth for paths, page components,
 * and per-page SEO metadata.
 *
 * Components are lazy() so each page ships as its own chunk instead of
 * riding along in one monolithic bundle.
 *
 * `props` receives the app context (cart + modal openers + legacy navigate)
 * so pages keep their existing prop contracts without being rewritten.
 */
export const ROUTES = [
    {
        path: '/',
        Component: lazy(() => import('../pages/HomePage')),
        title: null, // home uses the bare site name
        description:
            'Public Advocate Social Society has served Brooklyn since 1980 — social services, youth programs, food assistance, and community advocacy.',
        props: (ctx) => ({ navigate: ctx.navigate }),
    },
    {
        path: '/our-work',
        Component: lazy(() => import('../pages/OurWorkPage')),
        title: 'Our Work',
        description:
            'See the impact of Public Advocate Social Society across Brooklyn — food drives, youth services, health fairs, and community programs.',
        props: (ctx) => ({ navigate: ctx.navigate, openGetInvolved: ctx.openGetInvolved }),
    },
    {
        path: '/programs',
        Component: lazy(() => import('../pages/ProgramsPage')),
        title: 'Programs',
        description:
            'Explore our community programs: youth services, educational events, health awareness fairs, resource rooms, and volunteer opportunities.',
        props: (ctx) => ({ openContact: ctx.openContact }),
    },
    {
        path: '/food-pantry',
        Component: lazy(() => import('../pages/FoodPantryPage')),
        title: 'Food Pantry',
        description:
            'Get food assistance or support our Brooklyn food pantry. Learn about distribution times, eligibility, and how to donate.',
        props: () => ({}),
    },
    {
        path: '/products',
        Component: lazy(() => import('../pages/ProductsPage')),
        title: 'Shop',
        description:
            'Shop Public Advocate merchandise — shirts, hoodies, and tote bags. Every purchase funds community programs in Brooklyn.',
        props: (ctx) => ({ addToCart: ctx.addToCart }),
    },
    {
        path: '/calendar',
        Component: lazy(() => import('../pages/CalendarPage')),
        title: 'Community Calendar',
        description:
            'Browse upcoming community workshops, drives, roundtables, and awareness events. Propose your own community event.',
        props: (ctx) => ({ openGetInvolved: ctx.openGetInvolved }),
    },
    {
        path: '/donations',
        Component: lazy(() => import('../pages/DonationsPage')),
        title: 'Donate',
        description:
            'Support Public Advocate Social Society. Your donation funds food assistance, youth programs, and advocacy across Brooklyn.',
        props: (ctx) => ({
            cartTotal: ctx.cartTotal,
            cartItems: ctx.cartItems,
            removeFromCart: ctx.removeFromCart,
        }),
    },
    {
        path: '/about',
        Component: lazy(() => import('../pages/AboutPage')),
        title: 'About Us',
        description:
            'Founded in 1980, Public Advocate Social Society is dedicated to enriching the lives of our members, their families, and the Brooklyn community.',
        props: (ctx) => ({ openGetInvolved: ctx.openGetInvolved }),
    },
];
