/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://kovaisafetynets.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    additionalSitemaps: [],
  },
  exclude: [
    "/404",
    "/404/",
    "/_not-found",
    "/admin",
    "/admin/*",
    "/admin/**",
    "/api/*",
    "/api/**",
    "/icon.png",
    "/icon.svg",
    "/icon.png/",
    "/icon.svg/",
  ],
  transform: async (config, path) => {
    // Custom priority mapping for maximum SEO impact
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/" || path === "") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path.startsWith("/services/")) {
      priority = 0.9;
    } else if (path.startsWith("/locations/") || path.startsWith("/blog/")) {
      priority = 0.8;
    } else if (path === "/gallery/" || path === "/contact/" || path === "/about/" || path === "/testimonials/") {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
