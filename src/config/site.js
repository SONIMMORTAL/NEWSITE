/**
 * Site-wide constants and canonical organization data.
 * Single source of truth for metadata, structured data, and route paths.
 */
export const SITE = {
    name: 'Public Advocate Social Society',
    shortName: 'Public Advocate',
    description:
        'A Brooklyn community organization enriching the lives of our members, their families, and the community through social services, youth programs, food assistance, and advocacy.',
    founded: '1980',
    phone: '+1-718-612-8948',
    email: 'Publicadvocatessocialsociety@gmail.com',
    address: {
        poBox: 'P.O Box 340491',
        locality: 'Jamaica',
        region: 'NY',
        postalCode: '11434',
        country: 'US',
    },
    ogImage: '/og-image.jpg',
};

/**
 * Payment destinations. These are real money endpoints — only ever set them
 * from details the organization has confirmed.
 *
 * Cash App and PayPal.me both accept an amount in the URL path, so the amount
 * chosen on the donate page is carried straight into the app.
 */
export const PAYMENTS = {
    // https://cash.app/$PassInc5 — confirmed, live.
    cashAppHandle: 'PassInc5',

    // TODO: paste the PayPal.me handle (the part after paypal.me/).
    // While this is empty the PayPal option is hidden entirely, so a wrong or
    // placeholder link can never take a donation.
    payPalHandle: '',

    // Flip to true only once a server endpoint creates and confirms a
    // PaymentIntent. See CheckoutModal — the form takes no money until then.
    stripeEnabled: false,
};

/** Builds a Cash App URL, prefilling the amount when there is one. */
export const cashAppUrl = (amount) =>
    `https://cash.app/$${PAYMENTS.cashAppHandle}${amount ? `/${amount}` : ''}`;

/** Builds a PayPal.me URL, prefilling the amount when there is one. */
export const payPalUrl = (amount) =>
    `https://paypal.me/${PAYMENTS.payPalHandle}${amount ? `/${amount}` : ''}`;

/** Page-key → URL path. Keeps legacy `navigate('our-work')` calls working. */
export const PAGE_PATHS = {
    home: '/',
    'our-work': '/our-work',
    programs: '/programs',
    'food-pantry': '/food-pantry',
    products: '/products',
    calendar: '/calendar',
    donations: '/donations',
    about: '/about',
};

/**
 * Organization structured data. Emitted once on every page so search engines
 * can build a knowledge panel for the nonprofit.
 */
export const organizationJsonLd = (origin = '') => ({
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    foundingDate: SITE.founded,
    url: origin || undefined,
    logo: origin ? `${origin}/favicon.png` : undefined,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.poBox,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
    },
    areaServed: {
        '@type': 'Place',
        name: 'Brooklyn, New York',
    },
});
