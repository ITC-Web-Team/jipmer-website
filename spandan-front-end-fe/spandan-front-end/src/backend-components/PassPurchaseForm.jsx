import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import ErrorBoundary from './ErrorBoundary';
import './form-style.css'

const PASS_OPTIONS = [
  { value: 'sports', label: 'Sports Pass - ₹250', price: 250 },
  { value: 'cult', label: 'Cultural Pass - ₹250', price: 250 },
  { value: 'lit_quiz', label: 'Literary Quiz Pass - ₹500', price: 500 },
  { value: 'lit_lit', label: 'Literary Pass - ₹500', price: 500 },
  { value: 'lit_premium', label: 'Premium Literary Pass - ₹750', price: 750 }
];

const PassPurchaseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college_name: '',
    pass_type: '',
    transaction_id: '',
    payment_screenshot: null
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, payment_screenshot: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      const res = await axiosInstance.post('/pass-purchase/', data);
      toast.success('Pass purchase submitted successfully!');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        college_name: '',
        pass_type: '',
        transaction_id: '',
        payment_screenshot: null
      });
      setPreview('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const selectedPass = PASS_OPTIONS.find(pass => pass.value === formData.pass_type);

  return (
    <ErrorBoundary>
      <div className="form-container">
        <h2>Pass Purchase</h2>
        <img src='/payment_qr.jpg'></img>
        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>College Name</label>
            <input
              name="college_name"
              value={formData.college_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Pass Selection */}
          <div className="form-group">
            <label>Pass Type</label>
            <select
              name="pass_type"
              value={formData.pass_type}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Pass --</option>
              {PASS_OPTIONS.map(pass => (
                <option key={pass.value} value={pass.value}>
                  {pass.label}
                </option>
              ))}
            </select>
          </div>

          {/* Payment */}
          {formData.pass_type && (
            <div className="payment-section">
              <div className="payment-summary">
                <span>Amount to Pay:</span>
                <span className="amount">₹{selectedPass?.price || 0}</span>
              </div>

              <div className="form-group">
                <label>Transaction ID *</label>
                <input
                  name="transaction_id"
                  value={formData.transaction_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Payment Screenshot *</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
                {preview && (
                  <div className="preview-container">
                    <img src={preview} alt="Payment preview" className="preview-image" />
                  </div>
                )}
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || !formData.pass_type}
            className="submit-btn"
          >
            {loading ? 'Submitting...' : 'Purchase Pass'}
          </button>
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default PassPurchaseForm;