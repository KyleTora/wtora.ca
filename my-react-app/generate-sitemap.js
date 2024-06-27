const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

// Define your URLs
const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
  { url: '/services', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 }
];
const sitemap = new SitemapStream({ hostname: 'https://wtora.ca' });

(async () => {
  try {
    const writeStream = createWriteStream(resolve(__dirname, 'public/sitemap.xml'));
    sitemap.pipe(writeStream);

    links.forEach(link => sitemap.write(link));
    sitemap.end();

    await streamToPromise(sitemap);
    console.log('Sitemap created!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();