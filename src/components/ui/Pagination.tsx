interface PaginationProps {
  currentPage: number;
  totalPage: number;
  totalItem: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPage,
  totalItem,
  limit,
  onPageChange,
}: PaginationProps) {
  if (totalPage <= 1) return null;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItem);

  // ── Generate page numbers ────────────────
  const getPages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPage <= 7) {
      // Show all pages
      for (let i = 1; i <= totalPage; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPage - 2) pages.push('...');

      pages.push(totalPage);
    }

    return pages;
  };

  // ── Shared button style ──────────────────
  const btnBase = (active: boolean, disabled: boolean) => ({
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-sm)',
    border: active ? 'none' : '1px solid var(--color-border)',
    background: active ? 'var(--color-accent)' : 'var(--color-bg-card)',
    color: active
      ? 'var(--color-accent-text)'
      : disabled
        ? 'var(--color-text-placeholder)'
        : 'var(--color-text-secondary)',
    fontWeight: active ? 700 : 400,
    fontSize: 'var(--text-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'var(--transition-fast)',
    flexShrink: 0,
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginTop: '40px',
        padding: '20px 24px',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* ── Left — Item count ──────────────── */}
      <div
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
          whiteSpace: 'nowrap',
        }}
      >
        Showing{' '}
        <span
          style={{
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          {startItem}–{endItem}
        </span>{' '}
        of{' '}
        <span
          style={{
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          {totalItem}
        </span>{' '}
        rooms
      </div>

      {/* ── Center — Page buttons ──────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {/* First page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="First page"
          style={btnBase(false, currentPage === 1)}
        >
          «
        </button>

        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Previous page"
          style={btnBase(false, currentPage === 1)}
        >
          ‹
        </button>

        {/* Page numbers */}
        {getPages().map((page, index) =>
          page === '...' ? (
            <div
              key={`dots-${index}`}
              style={{
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                fontSize: 'var(--text-sm)',
              }}
            >
              ···
            </div>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={btnBase(currentPage === page, false)}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          title="Next page"
          style={btnBase(false, currentPage === totalPage)}
        >
          ›
        </button>

        {/* Last page */}
        <button
          onClick={() => onPageChange(totalPage)}
          disabled={currentPage === totalPage}
          title="Last page"
          style={btnBase(false, currentPage === totalPage)}
        >
          »
        </button>
      </div>

      {/* ── Right — Page info ──────────────── */}
      <div
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
          whiteSpace: 'nowrap',
        }}
      >
        Page{' '}
        <span
          style={{
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          {currentPage}
        </span>{' '}
        of{' '}
        <span
          style={{
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          {totalPage}
        </span>
      </div>
    </div>
  );
}
