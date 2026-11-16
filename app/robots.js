const BASE = 'https://www.indianroutesandtrails.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/thank-you',
          '/privacy',
          '/terms',
        ],
      },
      /* Block common AI training crawlers */
      { userAgent: 'GPTBot',         disallow: '/' },
      { userAgent: 'ChatGPT-User',   disallow: '/' },
      { userAgent: 'CCBot',          disallow: '/' },
      { userAgent: 'anthropic-ai',   disallow: '/' },
      { userAgent: 'ClaudeBot',      disallow: '/' },
    ],
    sitemap:  `${BASE}/sitemap.xml`,
    host:     BASE,
  };
}
