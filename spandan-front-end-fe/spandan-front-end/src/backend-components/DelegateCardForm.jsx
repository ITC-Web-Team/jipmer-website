import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { toast } from 'react-toastify'
import ErrorBoundary from './ErrorBoundary'
import './form-style.css'

const DelegateCardForm = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', college_name: '',
    tier: '', transaction_id: '', payment_screenshot: null
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'payment_screenshot') {
      setForm(prev => ({ ...prev, payment_screenshot: files[0] }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData()
    for (const key in form) {
      formData.append(key, form[key])
    }

    try {
      await axiosInstance.post('/delegate-card/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success("✅ Submitted! You'll receive an email after verification.")
      setForm({
        name: '', email: '', phone: '', college_name: '',
        tier: '', transaction_id: '', payment_screenshot: null
      })
    } catch (err) {
      toast.error(err.response?.data?.error || "❌ Submission failed. Please check your inputs.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ErrorBoundary>
      <div className='form-container'>
        <h2>🎫 Delegate Card Registration</h2>
        <img src='/payment_qr.jpg'></img>
        <form className='form-group' onSubmit={handleSubmit} encType="multipart/form-data">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
          <input name="college_name" value={form.college_name} onChange={handleChange} placeholder="College Name" required />

          <select name="tier" value={form.tier} onChange={handleChange} required>
            <option value="">Select Tier</option>
            <option value="tier1">Issue #1 – ₹375</option>
            <option value="tier2">Deluxe Edition – ₹650</option>
            <option value="tier3">Collectors Print – ₹850</option>
          </select>

          <input name="transaction_id" value={form.transaction_id} onChange={handleChange} placeholder="Transaction ID" required />
          <input type="file" name="payment_screenshot" accept="image/*" onChange={handleChange} required />

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </ErrorBoundary>
  )
}

export default DelegateCardForm