import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { toast } from 'react-toastify'
import LogoutButton from '../admin/LogoutButton'

const DelegateCardTable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [processingId, setProcessingId] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/delegate-card/')
      setData(res.data)
    } catch (err) {
      toast.error('Failed to fetch data: ' + (err.response?.data?.detail || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (id) => {
    setProcessingId(id)
    try {
      await axiosInstance.patch(`/delegate-card/verify/${id}/`)
      toast.success('Successfully verified delegate card')
      fetchData()
    } catch (err) {
      toast.error('Verification failed: ' + (err.response?.data?.detail || err.message))
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this registration?')) return
    setProcessingId(id)
    try {
      await axiosInstance.patch(`/delegate-card/reject/${id}/`)
      toast.success('Successfully rejected delegate card')
      fetchData()
    } catch (err) {
      toast.error('Rejection failed: ' + (err.response?.data?.detail || err.message))
    } finally {
      setProcessingId(null)
    }
  }

  const handleExport = async () => {
    try {
      const res = await axiosInstance.get('/delegate-card/export/', {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'delegate_cards.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Export successful')
    } catch (err) {
      toast.error('Export failed: ' + (err.response?.data?.detail || err.message))
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div>
      <LogoutButton />
      <h2>Delegate Cards</h2>
      <button onClick={handleExport} disabled={loading}>
        {loading ? 'Processing...' : 'Export to Excel'}
      </button>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>College</th>
              <th>Tier</th>
              <th>Screenshot</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.college_name}</td>
                <td>{row.tier}</td>
                <td>{row.is_verified ? 'Verified' : 'Pending'}</td>
                <td>
                  {row.payment_screenshot
                    ? <a href={`http://127.0.0.1:8000${row.payment_screenshot}`} target='_blank'>View</a>
                    : '-'}
                </td>
                <td>
                  {!row.is_verified && (
                    <>
                      <button 
                        onClick={() => handleVerify(row.id)}
                        disabled={processingId === row.id}
                      >
                        {processingId === row.id ? 'Verifying...' : 'Verify'}
                      </button>
                      <button 
                        onClick={() => handleReject(row.id)}
                        disabled={processingId === row.id}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DelegateCardTable