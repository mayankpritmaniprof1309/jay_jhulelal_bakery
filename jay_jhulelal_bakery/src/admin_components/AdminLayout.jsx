import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { C } from './themes';
import {Icon} from './AdminIcons'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/admin'            },
  { id: 'orders',    label: 'Orders',    icon: 'orders',    path: '/admin/orders'     },
  { id: 'products',  label: 'Products',  icon: 'products',  path: '/admin/products'   },
  { id: 'customers', label: 'Customers', icon: 'customers', path: '/admin/customers'  },
  { id: 'settings',  label: 'Settings',  icon: 'settings',  path: '/admin/settings'   },
];

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const sidebarWidth = collapsed ? 64 : 228;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f0e8' }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 99,
          }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: sidebarWidth,
        minHeight: '100vh',
        background: C.bgSidebar,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0, top: 0,
        zIndex: 100,
        overflowX: 'hidden',
        boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
        // Handle transform entirely in style, not className
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'width .3s ease, transform .3s ease',
      }}>

        {/* Logo */}
        <div style={{
          padding: collapsed ? '20px 0' : '20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', gap: 12,
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: C.accent, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, color: C.primaryDark,
          }}>🥐</div>
          {!collapsed && (
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Jay Jhulelal</p>
              <p style={{ margin: 0, fontSize: 10, color: C.textSidebarMuted, letterSpacing: '0.08em' }}>BAKERY ADMIN</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path} style={{ textDecoration: 'none' }}
                onClick={() => setMobileOpen(false)}>
                <button
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: collapsed ? '12px 0' : '11px 20px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    background: active ? C.bgSidebarActive : 'transparent',
                    border: 'none',
                    borderLeft: active ? `3px solid ${C.accent}` : '3px solid transparent',
                    cursor: 'pointer',
                    color: active ? '#fff' : C.textSidebarMuted,
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = C.bgSidebarHover;
                      e.currentTarget.style.color = C.textSidebar;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = C.textSidebarMuted;
                    }
                  }}
                >
                  <Icon name={item.icon} size={20} color={active ? "#fff" : C.textSidebarMuted} />
                  {!collapsed && (
                    <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                  )}
                </button>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle (desktop only) */}
        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}
          className="hidden md:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.06)',
              border: 'none', borderRadius: 8, padding: 8,
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 8,
              color: C.textSidebarMuted, transition: 'background .15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            <i className={`ti ${collapsed ? 'ti-arrow-bar-right' : 'ti-arrow-bar-left'}`}
               style={{ fontSize: 18, color: C.textSidebarMuted }} />
            {!collapsed && <span style={{ fontSize: 12 }}>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Desktop sidebar spacer */}
      <div className="hidden md:block" style={{ width: sidebarWidth, flexShrink: 0, transition: 'width .3s ease' }} />

      {/* ── MAIN ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        minHeight: '100vh',
        minWidth: 0,
      }}>

        {/* Top Navbar */}
        <header style={{
          background: '#fff', height: 56,
          borderBottom: '0.5px solid #e8e0d0',
          display: 'flex', alignItems: 'center',
          padding: '0 16px', gap: 12,
          position: 'sticky', top: 0, zIndex: 99,
        }}>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 22, color: '#3a3028', padding: '4px 8px',
              flexShrink: 0,
            }}
          >☰</button>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#f5f0e8', borderRadius: 8,
            padding: '0 12px', height: 36,
            flex: 1, minWidth: 0, maxWidth: 300,
          }}>
            <i className="ti ti-search" style={{ fontSize: 16, color: '#a09080', flexShrink: 0 }} />
            <input
              placeholder="Search..."
              style={{ border: 'none', background: 'none', outline: 'none', fontSize: 13, color: '#3a3028', width: '100%', minWidth: 0 }}
            />
          </div>

          {/* Right side */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 10px 6px 6px",
              background: C.bg, borderRadius: 12,
              border: `1.5px solid ${C.borderLight}`, cursor: "pointer",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: C.primary, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#fff",
                flexShrink: 0,
              }}>JJ</div>
              <div className="hidden sm:block">
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>Admin</p>
                <p style={{ margin: 0, fontSize: 10, color: C.textMuted }}>Super Admin</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                fontSize: 12, color: C.primary, background: 'none',
                border: `0.5px solid rgba(200,169,110,0.5)`,
                borderRadius: 8, padding: '6px 12px',
                cursor: 'pointer', fontFamily: 'serif', transition: 'background .15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,169,110,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}