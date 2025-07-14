import React from 'react'
import { Routes, Route, Link, useLocation, Outlet } from 'react-router'
import LogoutButton from '../admin/LogoutButton'

const AdminDashboard = () => {
  const location = useLocation()
  const tabs = [
    { path: 'delegate-cards', label: 'Delegate Cards' },
    { path: 'event-registrations', label: 'Event Registrations' },
    { path: 'passes', label: 'Passes' }
  ]

  return (
    <div style={{ padding: '1rem' }}>
      <LogoutButton />
      <h1>Admin Dashboard</h1>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '0.5rem'
      }}>
        {tabs.map(tab => (
          <Link
            key={tab.path}
            to={tab.path}
            style={{
              padding: '0.5rem 1rem',
              textDecoration: 'none',
              color: location.pathname.includes(tab.path) ? '#2563eb' : '#6b7280',
              borderBottom: location.pathname.includes(tab.path) ? '2px solid #2563eb' : 'none'
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <Outlet />
    </div>
  )
}

export default AdminDashboard