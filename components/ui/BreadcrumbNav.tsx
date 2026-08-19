interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbNav({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://kovaisafetynets.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="text-sm text-gray-500 flex flex-wrap items-center gap-1"
      >
        {items.map((item, index) => (
          <span key={item.href} className="flex items-center gap-1">
            {index < items.length - 1 ? (
              <>
                <a
                  href={item.href}
                  className="hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </a>
                <span aria-hidden="true" className="text-gray-300">
                  /
                </span>
              </>
            ) : (
              <span className="text-gray-700 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
