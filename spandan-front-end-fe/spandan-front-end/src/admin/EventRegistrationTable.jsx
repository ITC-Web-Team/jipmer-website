import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import LogoutButton from './LogoutButton'

const EventRegistrationTable = () => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/event-register/')
      setData(res.data)
    } catch (err) {
      console.error("Fetch error", err)
    }
  }

  const verify = async (id) => {
    try {
      await axiosInstance.patch(`/event-register/verify/${id}/`)
      alert("Verified & Email Sent")
      fetchData()
    } catch {
      alert("Verification failed")
    }
  }

  const reject = async (id) => {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        alert("You are not logged in")
        return
      }

      await axiosInstance.patch(
        `/event-register/reject/${id}/`,
        {},  // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Rejected & Email Sent")
      fetchData()
    } catch (err) {
      console.error("Rejection error:", err.response?.data || err.message)
      alert("Rejection failed")
    }
  }

  const downloadExcel = () => {
    axiosInstance.get('/event-register/export/', {
      responseType: 'blob'
    }).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'verified_event_registrations.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    }).catch(err => {
      alert("Excel download failed")
    })
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div>
      <LogoutButton />
      <h3>Event Registrations</h3>
      <button onClick={downloadExcel}>Download Excel</button>
      <table border="1">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Events</th><th>College</th><th>Screenshot</th><th>Verified</th><th>Action</th><th>Action</th></tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.events.join(', ')}</td>
              <td>{row.college_name}</td>
              <td>
                {row.payment_screenshot
                  ? <a href={`http://127.0.0.1:8000${row.payment_screenshot}`} target='_blank'>View</a>
                  : '-'}
              </td>
              <td>{row.is_verified ? '✅' : '❌'}</td>
              <td>{!row.is_verified && <button onClick={() => verify(row.id)}>Verify</button>}</td>
              <td>{!row.is_verified && <button onClick={() => reject(row.id)}>Reject</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventRegistrationTable
