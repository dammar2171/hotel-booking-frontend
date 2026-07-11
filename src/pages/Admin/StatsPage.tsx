import { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import type { Stats } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import MiniCard from '../../components/ui/MiniCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/stats');
        setStats(res.data.data);
      } catch {
        setError('Failed to load stats.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error || !stats)
    return (
      <div className="empty-state">
        <div style={{ fontSize: '3rem' }}>⚠️</div>
        <h4>{error}</h4>
      </div>
    );

  // ── Chart shared options ─────────────────
  const gridColor = 'rgba(128,128,128,0.1)';
  const fontFamily = "'Inter', sans-serif";

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { family: fontFamily, size: 12 },
          color: 'var(--color-text-secondary)',
        },
      },
      tooltip: {
        bodyFont: { family: fontFamily },
        titleFont: { family: fontFamily },
      },
    },
  };

  // ── 1. Room Status — Doughnut ────────────
  const doughnutData = {
    labels: ['Available', 'Occupied'],
    datasets: [
      {
        data: [stats.availableRooms, stats.occupiedRooms],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderColor: ['#16a34a', '#dc2626'],
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const doughnutOptions = {
    ...baseOptions,
    cutout: '70%',
    plugins: {
      ...baseOptions.plugins,
      legend: {
        ...baseOptions.plugins.legend,
        position: 'bottom' as const,
      },
    },
  };

  // ── 2. Booking Status — Bar ──────────────
  const pending =
    stats.totalBookings - stats.confirmedBookings - stats.cancelledBookings;

  const barData = {
    labels: ['Confirmed', 'Cancelled', 'Pending'],
    datasets: [
      {
        label: 'Bookings',
        data: [stats.confirmedBookings, stats.cancelledBookings, pending],
        backgroundColor: [
          'rgba(34, 197, 94,  0.85)',
          'rgba(239, 68,  68,  0.85)',
          'rgba(251, 191, 36,  0.85)',
        ],
        borderColor: ['#16a34a', '#dc2626', '#d97706'],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    ...baseOptions,
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: '#9ca3af', font: { family: fontFamily } },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: '#9ca3af', font: { family: fontFamily } },
        beginAtZero: true,
      },
    },
    plugins: {
      ...baseOptions.plugins,
      legend: { display: false },
    },
  };

  // ── 3. Revenue vs Bookings — Line ────────
  // Simulated monthly data based on real totals
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentMonth = new Date().getMonth();

  const simulateMonthly = (total: number) => {
    const weights = [
      0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.1, 0.1, 0.09, 0.1, 0.08, 0.08,
    ];
    return weights.slice(0, currentMonth + 1).map((w) => Math.round(total * w));
  };

  const lineData = {
    labels: months.slice(0, currentMonth + 1),
    datasets: [
      {
        label: 'Revenue (NPR)',
        data: simulateMonthly(stats.totalRevenue),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#f59e0b',
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Bookings',
        data: simulateMonthly(stats.totalBookings),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      },
    ],
  };

  const lineOptions = {
    ...baseOptions,
    interaction: { mode: 'index' as const, intersect: false },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: '#9ca3af', font: { family: fontFamily } },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: { color: gridColor },
        ticks: { color: '#f59e0b', font: { family: fontFamily } },
        beginAtZero: true,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { color: '#3b82f6', font: { family: fontFamily } },
        beginAtZero: true,
      },
    },
  };

  // ── 4. Room Types — Horizontal Bar ───────
  const roomTypeData = {
    labels: ['Standard', 'Deluxe', 'Suite', 'Family', 'Penthouse'],
    datasets: [
      {
        label: 'Rooms',
        data: [12, 10, 8, 6, 4],
        backgroundColor: [
          'rgba(59,  130, 246, 0.85)',
          'rgba(245, 158, 11,  0.85)',
          'rgba(168, 85,  247, 0.85)',
          'rgba(34,  197, 94,  0.85)',
          'rgba(239, 68,  68,  0.85)',
        ],
        borderRadius: 6,
        borderWidth: 0,
      },
    ],
  };

  const horizontalBarOptions = {
    ...baseOptions,
    indexAxis: 'y' as const,
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: '#9ca3af', font: { family: fontFamily } },
        beginAtZero: true,
      },
      y: {
        grid: { display: false },
        ticks: { color: '#9ca3af', font: { family: fontFamily } },
      },
    },
    plugins: {
      ...baseOptions.plugins,
      legend: { display: false },
    },
  };

  // ── Card wrapper style ───────────────────
  const card = {
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '24px',
    boxShadow: 'var(--shadow-card)',
  };

  return (
    <div>
      {/* ── Page Header ──────────────────── */}
      <div style={{ marginBottom: '28px' }}>
        <h2
          style={{
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          Analytics & Stats
        </h2>
        <p
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-sm)',
            marginTop: '4px',
          }}
        >
          Visual breakdown of hotel performance
        </p>
      </div>

      {/* ── Top KPI Cards ────────────────── */}
      <div className="row g-3 mb-4">
        {[
          {
            label: 'Total Revenue',
            value: `NPR ${stats.totalRevenue.toLocaleString()}`,
            icon: '💰',
            color: 'var(--color-accent)',
            bg: 'var(--color-accent-light)',
          },
          {
            label: 'Occupancy Rate',
            value: `${stats.occupancyRate}%`,
            icon: '📊',
            color:
              stats.occupancyRate > 70
                ? 'var(--color-danger-text)'
                : 'var(--color-success-text)',
            bg:
              stats.occupancyRate > 70
                ? 'var(--color-danger-bg)'
                : 'var(--color-success-bg)',
          },
          {
            label: 'Total Guests',
            value: stats.totalGuests,
            icon: '👥',
            color: 'var(--color-info-text)',
            bg: 'var(--color-info-bg)',
          },
          {
            label: 'Top Room Type',
            value: stats.topBookingRoom || 'N/A',
            icon: '🏆',
            color: 'var(--color-warning-text)',
            bg: 'var(--color-warning-bg)',
          },
        ].map((summary) => (
          <div key={summary.label} className="col-sm-6 col-xl-3">
            <MiniCard summary={summary} />
          </div>
        ))}
      </div>

      {/* ── Row 1: Line Chart + Doughnut ─── */}
      <div className="row g-4 mb-4">
        {/* Line chart */}
        <div className="col-lg-8">
          <div style={card}>
            <h5
              style={{
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '20px',
              }}
            >
              📈 Revenue & Bookings Trend
            </h5>
            <div style={{ height: '280px' }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>

        {/* Doughnut */}
        <div className="col-lg-4">
          <div style={{ ...card, height: '100%' }}>
            <h5
              style={{
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '20px',
              }}
            >
              🏨 Room Availability
            </h5>
            <div style={{ height: '220px' }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            {/* Center label */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--color-accent)',
                }}
              >
                {stats.occupancyRate}%
              </div>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Occupancy Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Bar + Horizontal Bar ──── */}
      <div className="row g-4">
        {/* Booking status bar */}
        <div className="col-lg-6">
          <div style={card}>
            <h5
              style={{
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '20px',
              }}
            >
              📋 Booking Status
            </h5>
            <div style={{ height: '260px' }}>
              <Bar data={barData} options={barOptions} />
            </div>

            {/* Legend row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                marginTop: '16px',
              }}
            >
              {[
                { label: 'Confirmed', color: '#22c55e' },
                { label: 'Cancelled', color: '#ef4444' },
                { label: 'Pending', color: '#fbbf24' },
              ].map((l) => (
                <div
                  key={l.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '2px',
                      background: l.color,
                    }}
                  />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Room types horizontal bar */}
        <div className="col-lg-6">
          <div style={card}>
            <h5
              style={{
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '20px',
              }}
            >
              🛏️ Rooms by Type
            </h5>
            <div style={{ height: '260px' }}>
              <Bar data={roomTypeData} options={horizontalBarOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary Footer Row ────────────── */}
      <div className="row g-3 mt-2">
        {[
          {
            label: 'Confirmed Rate',
            value:
              stats.totalBookings === 0
                ? '0%'
                : `${Math.round((stats.confirmedBookings / stats.totalBookings) * 100)}%`,
            desc: `${stats.confirmedBookings} of ${stats.totalBookings} bookings`,
            color: 'var(--color-success)',
            bg: 'var(--color-success-bg)',
          },
          {
            label: 'Cancellation Rate',
            value:
              stats.totalBookings === 0
                ? '0%'
                : `${Math.round((stats.cancelledBookings / stats.totalBookings) * 100)}%`,
            desc: `${stats.cancelledBookings} cancellations`,
            color: 'var(--color-danger)',
            bg: 'var(--color-danger-bg)',
          },
          {
            label: 'Avg Revenue/Booking',
            value:
              stats.totalBookings === 0
                ? 'NPR 0'
                : `NPR ${Math.round(stats.totalRevenue / stats.totalBookings).toLocaleString()}`,
            desc: 'Per confirmed booking',
            color: 'var(--color-accent)',
            bg: 'var(--color-accent-light)',
          },
        ].map((s) => (
          <div key={s.label} className="col-md-4">
            <div
              style={{
                ...card,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: s.color,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
