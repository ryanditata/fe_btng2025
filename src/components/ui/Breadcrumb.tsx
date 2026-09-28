import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              {it.to && !isLast ? (
                <Link className="hover:text-gray-700" to={it.to}>
                  {it.label}
                </Link>
              ) : (
                <span className="text-gray-700 dark:text-gray-300">{it.label}</span>
              )}
              {!isLast && <span className="opacity-60">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
