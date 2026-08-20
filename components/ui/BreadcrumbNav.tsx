import Link from "next/link";

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
        className="text-sm text-gray-400 flex flex-wrap items-center gap-1"
      >
        {items.map((item, index) => (
          <span key={item.href} className="flex items-center gap-1">
            {index < items.length - 1 ? (
              <>
                <Link
                  href={item.href}
                  prefetch={true}
                  className="hover:text-orange-400 transition-colors text-slate-300"
                >
                  {item.label}
                </Link>
                <span aria-hidden="true" className="text-slate-500">
                  /
                </span>
              </>
            ) : (
              <span className="text-slate-200 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
