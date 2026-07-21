import { useEffect } from 'react';
import { SITE } from '../../config/site';

/**
 * Seo — imperative document-head manager.
 *
 * React 18 doesn't hoist <title>/<meta> from the tree, so rather than pulling
 * in react-helmet we upsert the tags directly. Tags are reused across route
 * changes (not duplicated), and injected JSON-LD is removed on unmount.
 */
const upsertMeta = (key, value, content) => {
    if (!content) return;
    let el = document.head.querySelector(`meta[${key}="${value}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(key, value);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
};

const Seo = ({ title, description, image, type = 'website', jsonLd }) => {
    const fullTitle = title ? `${title} | ${SITE.shortName}` : SITE.name;
    const desc = description || SITE.description;
    const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : null;

    useEffect(() => {
        const origin = window.location.origin;
        const url = `${origin}${window.location.pathname}`;
        const img = `${origin}${image || SITE.ogImage}`;

        document.title = fullTitle;

        upsertMeta('name', 'description', desc);
        upsertLink('canonical', url);

        upsertMeta('property', 'og:site_name', SITE.name);
        upsertMeta('property', 'og:title', fullTitle);
        upsertMeta('property', 'og:description', desc);
        upsertMeta('property', 'og:type', type);
        upsertMeta('property', 'og:url', url);
        upsertMeta('property', 'og:image', img);

        upsertMeta('name', 'twitter:card', 'summary_large_image');
        upsertMeta('name', 'twitter:title', fullTitle);
        upsertMeta('name', 'twitter:description', desc);
        upsertMeta('name', 'twitter:image', img);
    }, [fullTitle, desc, image, type]);

    useEffect(() => {
        if (!serializedJsonLd) return undefined;
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = serializedJsonLd;
        document.head.appendChild(script);
        return () => script.remove();
    }, [serializedJsonLd]);

    return null;
};

export default Seo;
