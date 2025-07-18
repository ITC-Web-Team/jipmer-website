import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import ErrorBoundary from './ErrorBoundary';

const EVENT_CATEGORIES = [
  {
    name: "Fine Arts",
    events: [
      { id: 'face_painting', name: "Face Painting", price: 100, exempt: false },
      { id: 'pot_painting', name: "Pot Painting", price: 100, exempt: false },
      { id: 'mehendi', name: "Mehendi", price: 100, exempt: false },
      { id: 'sketching', name: "Sketching", price: 100, exempt: false },
      { id: 'painting', name: "Painting", price: 100, exempt: false }
    ]
  },
  {
    name: "Dance",
    events: [
      { id: 'solo_dance', name: "Solo Dance", price: 150, exempt: false },
      { id: 'duet_dance', name: "Duet Dance", price: 150, exempt: false },
      { id: 'chorea_theme', name: "Chorea-Theme Group Dance", price: 250, exempt: false },
      { id: 'chorea_nontheme', name: "Chorea-Non Theme Group Dance", price: 250, exempt: false },
      { id: 'show_down', name: "Show Down", price: 150, exempt: false },
    ]
  },
  {
    name: "Music",
    events: [
      { id: 'tinnitus', name: "Tinnitus", price: 250, exempt: false },
      { id: 'alaap', name: "Alaap", price: 250, exempt: false },
      { id: 'euphony', name: "Euphony", price: 150, exempt: false },
      { id: 'raag_rangmanch', name: "Raag Rangmanch", price: 150, exempt: false },
      { id: 'solo_singing', name: "Solo Singing", price: 150, exempt: false },
      { id: 'solo_instrumental', name: "Solo Instrumental", price: 150, exempt: false }
    ]
  },
  {
    name: "Drama",
    events: [
      { id: 'play', name: "Play", price: 125, exempt: false },
      { id: 'skit', name: "Skit", price: 125, exempt: false },
      { id: 'mime', name: "Mime", price: 125, exempt: false },
      { id: 'adzap', name: "Adzap", price: 125, exempt: false },
      { id: 'variety', name: "Variety", price: 125, exempt: false },
      { id: 'dernier_cri', name: "Dernier Cri", price: 250, exempt: false }
    ]
  },
  {
    name: "Sports",
    events: [
      { id: 'cricket', name: "Cricket", price: 300, exempt: false },
      { id: 'football', name: "Football", price: 300, exempt: false },
      { id: 'basketball_men', name: "Basketball (Men)", price: 300, exempt: false },
      { id: 'basketball_women', name: "Basketball (Women)", price: 300, exempt: false },
      { id: 'volleyball_men', name: "Volleyball (Men)", price: 300, exempt: false },
      { id: 'volleyball_women', name: "Volleyball (Women)", price: 300, exempt: false },
      { id: 'hockey_men', name: "Hockey (Men)", price: 300, exempt: false },
      { id: 'hockey_women', name: "Hockey (Women)", price: 300, exempt: false },
      { id: 'futsal', name: "Futsal", price: 300, exempt: false },
      { id: 'chess_bullet', name: "Chess Bullet", price: 200, exempt: false },
      { id: 'chess_rapid', name: "Chess Rapid", price: 200, exempt: false },
      { id: 'chess_blitz', name: "Chess Blitz", price: 200, exempt: false },
      { id: 'carroms', name: "Carroms", price: 150, exempt: false },
      { id: 'throwball_men', name: "Throwball (Men)", price: 300, exempt: false },
      { id: 'throwball_women', name: "Throwball (Women)", price: 300, exempt: false },
      { id: 'tennis', name: "Tennis", price: 300, exempt: false },
      { id: 'aquatics', name: "Aquatics", price: 200, exempt: false },
      { id: 'badminton', name: "Badminton", price: 300, exempt: false },
      { id: 'table_tennis', name: "Table Tennis", price: 300, exempt: false },
      { id: 'athletics', name: "Athletics", price: 200, exempt: false }
    ]
  },
  {
    name: "Literary",
    events: [
      { id: 'malarkey', name: "Malarkey", price: 150, exempt: false },
      { id: 'shipwrecked', name: "Shipwrecked", price: 150, exempt: false },
      { id: 'turncoat', name: "Turncoat", price: 150, exempt: false },
      { id: 'scrabble', name: "Scrabble", price: 150, exempt: false },
      { id: 'formal_debate', name: "Formal Debate", price: 150, exempt: false },
      { id: 'cryptic_crossword', name: "Cryptic Crossword", price: 150, exempt: false },
      { id: 'ppt_karaoke', name: "PPT Karaoke", price: 150, exempt: false },
      { id: 'potpourri', name: "Potpourri", price: 150, exempt: false },
      { id: 'india_quiz', name: "India Quiz", price: 150, exempt: false },
      { id: 'fandom_quiz', name: "Fandom Quiz", price: 150, exempt: false },
      { id: 'sports_quiz', name: "Sports Quiz", price: 150, exempt: false },
      { id: 'rewind_quiz', name: "Rewind Quiz", price: 150, exempt: false },
      { id: 'formal_quiz', name: "Formal Quiz", price: 250, exempt: false },
      { id: 'tj_jaishankar_memorial_quiz', name: "TJ Jaishankar Quiz", price: 250, exempt: false },
      { id: 'jam', name: "Just A Minute", price: 250, exempt: false }
    ]
  }
];

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    events: [],
    delegate_info: [{ delegate_id: '', email: '', phone: '' }],
    transaction_id: '',
    payment_screenshot: null
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [needsDelegate, setNeedsDelegate] = useState(false);
  const [delegateVerified, setDelegateVerified] = useState(false);
  const [checkingDelegate, setCheckingDelegate] = useState(false);

  // Check delegate card status
  const checkDelegateStatus = async (email) => {
    if (!email) return false;
    
    setCheckingDelegate(true);
    try {
      const res = await axiosInstance.get(`/delegate-card/check/${email}/`);
      setDelegateVerified(res.data.is_verified);
      return res.data.is_verified;
    } catch (err) {
      setDelegateVerified(false);
      return false;
    } finally {
      setCheckingDelegate(false);
    }
  };

  // Check requirements whenever events or email changes
  useEffect(() => {
    const checkRequirements = async () => {
      const hasNonExemptEvents = formData.events.some(eventId => {
        const event = EVENT_CATEGORIES
          .flatMap(cat => cat.events)
          .find(e => e.id === eventId);
        return event && !event.exempt;
      });
      
      setNeedsDelegate(hasNonExemptEvents);
      
      if (hasNonExemptEvents && formData.email) {
        await checkDelegateStatus(formData.email);
      }
    };
    
    checkRequirements();
  }, [formData.events, formData.email]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (eventId) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter(id => id !== eventId)
        : [...prev.events, eventId]
    }));
  };

  const handleTeammateChange = (index, field, value) => {
    const updated = [...formData.delegate_info];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, delegate_info: updated });
  };

  const addTeammate = () => {
    setFormData({ ...formData, delegate_info: [...formData.delegate_info, {delegate_id: '', email: '', phone: '' }]
    });
  };

  const removeTeammate = (index) => {
    const updated = [...formData.delegate_info];
    updated.splice(index, 1);
    setFormData({ ...formData, delegate_info: updated });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, payment_screenshot: file });
    setPreview(URL.createObjectURL(file));
  };

  // Calculate total amount
  useEffect(() => {
    let total = 0;
    EVENT_CATEGORIES.forEach(category => {
      category.events.forEach(event => {
        if (formData.events.includes(event.id)) {
          total += event.price;
        }
      });
    });
    setTotalAmount(total);
  }, [formData.events]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      
      // Required fields
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('college', formData.college);
      
      // Properly stringify arrays
      data.append('events', JSON.stringify(formData.events));
      
      const validTeammates = formData.delegate_info.filter(t => t.delegate_id.trim() !== '' && t.email.trim() !== '');

      if(validTeammates.length > 0) {
        data.append('delegate_info', JSON.stringify(validTeammates));
      }

      // Payment fields
      if (totalAmount > 0) {
        if (!formData.transaction_id) {
          throw new Error('Transaction ID required for paid events');
        }
        data.append('transaction_id', formData.transaction_id);
        
        if (!formData.payment_screenshot) {
          throw new Error('Payment screenshot required for paid events');
        }
        data.append('payment_screenshot', formData.payment_screenshot);
      }

      const response = await axiosInstance.post('/event-register/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Registration successful!');
      console.log('Response:', response.data);

    } catch (err) {
      console.error('Full error:', err.response?.data);
      const errorMsg = err.response?.data?.error || 
                      err.response?.data?.details || 
                      err.message || 
                      'Registration failed';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="form-container">
        <h2>Event Registration</h2>
        <h3>Cannot find your favourite event here? Just take a step back and find your event in the list and Register via Google Form!</h3>
        <img src='/payment_qr.jpg'></img>
        <div className="verification-status">
          {needsDelegate && (
            checkingDelegate ? (
              <div className="alert alert-info">Checking delegate card status...</div>
            ) : delegateVerified ? (
              <div className="alert alert-success">✓ Delegate card verified</div>
            ) : (
              <div className="alert alert-warning">
                ⚠️ Selected events require a verified delegate card
              </div>
            )
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="form-group">
            <label>Full Name*</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number*</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>College*</label>
            <input
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Event Selection */}
          <div className="event-section">
            <h3>Select Events*</h3>
            {EVENT_CATEGORIES.map(category => (
              <div key={category.name} className="event-category">
                <h4>{category.name}</h4>
                <div className="event-checkboxes">
                  {category.events.map(event => (
                    <label 
                      key={event.id} 
                      className={`event-label ${event.exempt ? 'exempt' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.events.includes(event.id)}
                        onChange={() => handleCheckboxChange(event.id)}
                      />
                      {event.name} {event.price > 0 && `(₹${event.price})`}
                      {event.exempt && <span className="exempt-badge">Exempt</span>}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="teammate-section">
            <h3>Team Members</h3>
            {formData.delegate_info.map((teammate, index) => (
              <div key={index} className="teammate-input-group">
                <input
                  value={teammate.delegate_id}
                  onChange={(e) => handleTeammateChange(index, 'delegate_id', e.target.value)}
                  placeholder="Delegate ID"
                  required={index === 0}
                />
                <input
                  type="email"
                  value={teammate.email}
                  onChange={(e) => handleTeammateChange(index, 'email', e.target.value)}
                  placeholder="Email"
                  required={index === 0}
                />
                <input
                  value={teammate.phone}
                  onChange={(e) => handleTeammateChange(index, 'phone', e.target.value)}
                  placeholder="Phone"
                />
                {index > 0 && (
                  <button 
                    type="button" 
                    onClick={() => removeTeammate(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              onClick={addTeammate}
              className="add-btn"
            >
              Add Team Member
            </button>
          </div>

          {/* Payment */}
          <div className="payment-section">
            <h3>Payment Details</h3>
            <div className="payment-summary">
              <span>Total Amount:</span>
              <span className="amount">₹{totalAmount}</span>
            </div>

            <div className="form-group">
              <label>Transaction ID{totalAmount > 0 && '*'}</label>
              <input
                name="transaction_id"
                value={formData.transaction_id}
                onChange={handleInputChange}
                required={totalAmount > 0}
                disabled={totalAmount === 0}
              />
            </div>

            <div className="form-group">
              <label>Payment Screenshot{totalAmount > 0 && '*'}</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required={totalAmount > 0}
                disabled={totalAmount === 0}
              />
              {preview && (
                <div className="preview-container">
                  <img src={preview} alt="Payment preview" className="preview-image" />
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || checkingDelegate || (needsDelegate && !delegateVerified)}
            className={`submit-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default EventRegistrationForm;