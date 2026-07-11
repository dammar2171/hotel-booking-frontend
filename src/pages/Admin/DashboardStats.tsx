import { useEffect, useState } from 'react';
import api from '../../api/axios';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import MiniCard from '../../components/ui/MiniCard';

interface Stats {
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  totalGuests: number;
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  topBookingRoom: string;
}

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  bg: string;
  border: string;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        setStats(res.data.data);
      } catch (err) {
        setError('Failed to load stats. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="empty-state">
        <div style={{ fontSize: '3rem' }}>⚠️</div>
        <h4>{error}</h4>
      </div>
    );

  if (!stats) return null;

  const statCards: StatCard[] = [
    {
      label: 'Total Rooms',
      value: stats.totalRooms,
      icon: '🛏️',
      color: 'var(--color-info-text)',
      bg: 'var(--color-info-bg)',
      border: 'var(--color-info-border)',
    },
    {
      label: 'Available Rooms',
      value: stats.availableRooms,
      icon: '✅',
      color: 'var(--color-success-text)',
      bg: 'var(--color-success-bg)',
      border: 'var(--color-success-border)',
    },
    {
      label: 'Occupied Rooms',
      value: stats.occupiedRooms,
      icon: '🔒',
      color: 'var(--color-warning-text)',
      bg: 'var(--color-warning-bg)',
      border: 'var(--color-warning-border)',
    },
    {
      label: 'Total Guests',
      value: stats.totalGuests,
      icon: '👥',
      color: 'var(--color-info-text)',
      bg: 'var(--color-info-bg)',
      border: 'var(--color-info-border)',
    },
    {
      label: 'Total Bookings',
      value: stats.totalBookings,
      icon: '📋',
      color: 'var(--color-accent)',
      bg: 'var(--color-accent-light)',
      border: 'var(--color-accent-border)',
    },
    {
      label: 'Confirmed',
      value: stats.confirmedBookings,
      icon: '🎯',
      color: 'var(--color-success-text)',
      bg: 'var(--color-success-bg)',
      border: 'var(--color-success-border)',
    },
    {
      label: 'Cancelled',
      value: stats.cancelledBookings,
      icon: '❌',
      color: 'var(--color-danger-text)',
      bg: 'var(--color-danger-bg)',
      border: 'var(--color-danger-border)',
    },
    {
      label: 'Total Revenue',
      value: `NPR ${stats.totalRevenue.toLocaleString()}`,
      icon: '💰',
      color: 'var(--color-accent)',
      bg: 'var(--color-accent-light)',
      border: 'var(--color-accent-border)',
    },
  ];

  return (
    <div>
      {/* ── Page Header ──────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            Dashboard Overview
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-sm)',
              marginTop: '4px',
            }}
          >
            Real-time stats for your hotel
          </p>
        </div>
        <div
          style={{
            background: 'var(--color-accent-light)',
            border: '1px solid var(--color-accent-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 14px',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-accent)',
            fontWeight: 600,
          }}
        >
          📅{' '}
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* ── Stat Cards Grid ───────────────────── */}
      <div className="row g-4 mb-5">
        {statCards.map((summary) => (
          <div key={summary.label} className="col-sm-6 col-xl-3">
            <MiniCard summary={summary} />
          </div>
        ))}
      </div>

      {/* ── Second Row — Occupancy + Top Room ─── */}
      <div className="row g-4 mb-4">
        {/* Occupancy Rate */}
        <div className="col-lg-6">
          <div
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '28px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h5
              style={{
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '20px',
              }}
            >
              🏨 Occupancy Rate
            </h5>

            {/* Big number */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  color:
                    stats.occupancyRate > 70
                      ? 'var(--color-danger)'
                      : stats.occupancyRate > 40
                        ? 'var(--color-warning)'
                        : 'var(--color-success)',
                  lineHeight: 1,
                }}
              >
                {stats.occupancyRate}%
              </span>
              <span
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-sm)',
                  paddingBottom: '6px',
                }}
              >
                occupied
              </span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: '10px',
                background: 'var(--color-bg-tertiary)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${stats.occupancyRate}%`,
                  background:
                    stats.occupancyRate > 70
                      ? 'var(--color-danger)'
                      : stats.occupancyRate > 40
                        ? 'var(--color-warning)'
                        : 'var(--color-success)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.8s ease',
                }}
              />
            </div>

            {/* Available vs Occupied */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-success)',
                  }}
                />
                Available ({stats.availableRooms})
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-danger)',
                  }}
                />
                Occupied ({stats.occupiedRooms})
              </div>
            </div>
          </div>
        </div>

        {/* Top Room + Revenue summary */}
        <div className="col-lg-6">
          <div
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '28px',
              boxShadow: 'var(--shadow-card)',
              height: '100%',
            }}
          >
            <h5
              style={{
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '20px',
              }}
            >
              📊 Quick Summary
            </h5>

            {[
              {
                label: 'Most Booked Room Type',
                value: stats.topBookingRoom || 'N/A',
                icon: '🏆',
              },
              {
                label: 'Total Revenue',
                value: `NPR ${stats.totalRevenue.toLocaleString()}`,
                icon: '💰',
              },
              {
                label: 'Booking Success Rate',
                value:
                  stats.totalBookings === 0
                    ? '0%'
                    : `${Math.round((stats.confirmedBookings / stats.totalBookings) * 100)}%`,
                icon: '📈',
              },
              {
                label: 'Cancellation Rate',
                value:
                  stats.totalBookings === 0
                    ? '0%'
                    : `${Math.round((stats.cancelledBookings / stats.totalBookings) * 100)}%`,
                icon: '📉',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span
                  style={{
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Booking Status Breakdown ──────────── */}
      <div
        style={{
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <h5
          style={{
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '20px',
          }}
        >
          📋 Booking Status Breakdown
        </h5>

        <div className="row g-4">
          {[
            {
              label: 'Confirmed',
              count: stats.confirmedBookings,
              total: stats.totalBookings,
              color: 'var(--color-success)',
              bg: 'var(--color-success-bg)',
              border: 'var(--color-success-border)',
              text: 'var(--color-success-text)',
            },
            {
              label: 'Cancelled',
              count: stats.cancelledBookings,
              total: stats.totalBookings,
              color: 'var(--color-danger)',
              bg: 'var(--color-danger-bg)',
              border: 'var(--color-danger-border)',
              text: 'var(--color-danger-text)',
            },
            {
              label: 'Pending',
              count:
                stats.totalBookings -
                stats.confirmedBookings -
                stats.cancelledBookings,
              total: stats.totalBookings,
              color: 'var(--color-warning)',
              bg: 'var(--color-warning-bg)',
              border: 'var(--color-warning-border)',
              text: 'var(--color-warning-text)',
            },
          ].map((item) => {
            const pct =
              stats.totalBookings === 0
                ? 0
                : Math.round((item.count / item.total) * 100);

            return (
              <div key={item.label} className="col-md-4">
                <div
                  style={{
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: item.text,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: item.color,
                      }}
                    >
                      {item.count}
                    </span>
                  </div>

                  {/* Mini progress */}
                  <div
                    style={{
                      height: '6px',
                      background: 'rgba(0,0,0,0.08)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                      marginBottom: '8px',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: item.color,
                        borderRadius: 'var(--radius-full)',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: item.text,
                    }}
                  >
                    {pct}% of total bookings
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
