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
      { id: 'futsal_men', name: "Futsal (Men)", price: 300, exempt: false },
      { id: 'futsal_women', name: "Futsal (Women)", price: 300, exempt: false },
      { id: 'chess_bullet', name: "Chess Bullet", price: 200, exempt: false },
      { id: 'chess_rapid', name: "Chess Rapid", price: 200, exempt: false },
      { id: 'chess_blitz', name: "Chess Blitz", price: 200, exempt: false },
      { id: 'chess_team', name: "Chess Team", price: 200, exempt: false },
      { id: 'carroms', name: "Carroms", price: 150, exempt: false },
      { id: 'throwball_men', name: "Throwball (Men)", price: 300, exempt: false },
      { id: 'throwball_women', name: "Throwball (Women)", price: 300, exempt: false },
      { id: 'tennis', name: "Tennis", price: 300, exempt: false, subcategories: [
        { id: 'tennis_men_singles', name: "Men's Singles", price: 300 },
        { id: 'tennis_women_singles', name: "Women's Singles", price: 300 },
        { id: 'tennis_men_doubles', name: "Men's Doubles", price: 300 },
        { id: 'tennis_women_doubles', name: "Women's Doubles", price: 300 },
        { id: 'tennis_mixed_doubles', name: "Mixed Doubles", price: 300 }
      ] },
      { id: 'aquatics', name: "Aquatics", price: 200, exempt: false, subcategories: [
        { id: 'aquatics_men_50m_freestyle', name: "Men's 50m Freestyle", price: 200 },
        { id: 'aquatics_men_50m_backstroke', name: "Men's 50m Backstroke", price: 200 },
        { id: 'aquatics_men_50m_breaststroke', name: "Men's 50m Breaststroke", price: 200 },
        { id: 'aquatics_men_50m_butterfly', name: "Men's 50m Butterfly", price: 200 },
        { id: 'aquatics_men_4x50m_freestyle_relay', name: "Men's 4x50m Freestyle Relay", price: 200 },
        { id: 'aquatics_women_50m_freestyle', name: "Women's 50m Freestyle", price: 200 },
        { id: 'aquatics_women_50m_backstroke', name: "Women's 50m Backstroke", price: 200 },
        { id: 'aquatics_women_50m_breaststroke', name: "Women's 50m Breaststroke", price: 200 },
        { id: 'aquatics_women_50m_butterfly', name: "Women's 50m Butterfly", price: 200 },
        { id: 'aquatics_mixed_4x50m_freestyle_relay', name: "Mixed 4x50m Freestyle Relay", price: 200 }
      ] },
      { id: 'badminton', name: "Badminton", price: 300, exempt: false, subcategories: [
        { id: 'badminton_men_singles', name: "Men's Singles", price: 300 },
        { id: 'badminton_women_singles', name: "Women's Singles", price: 300 },
        { id: 'badminton_men_doubles', name: "Men's Doubles", price: 300 },
        { id: 'badminton_women_doubles', name: "Women's Doubles", price: 300 },
        { id: 'badminton_mixed_doubles', name: "Mixed's Doubles", price: 300 },
      ] },
      { id: 'table_tennis', name: "Table Tennis", price: 300, exempt: false, subcategories: [
        { id: 'table_tennis_men_singles', name: "Men's Singles", price: 300 },
        { id: 'table_tennis_women_singles', name: "Women's Singles", price: 300 },
        { id: 'table_tennis_men_doubles', name: "Men's Doubles", price: 300 },
        { id: 'table_tennis_women_doubles', name: "Women's Doubles", price: 300 }
      ] },
      { id: 'athletics', name: "Athletics", price: 200, exempt: false, subcategories: [
        { id: 'athletics_100m', name: "100m Sprint", price: 200 },
        { id: 'athletics_200m', name: "200m Sprint", price: 200 },
        { id: 'athletics_400m', name: "400m Sprint", price: 200 },
        { id: 'athletics_800m', name: "800m Run", price: 200 },
        { id: 'athletics_1500m', name: "1500m Run", price: 200 },
        { id: 'athletics_4x100m', name: "4x100m Relay", price: 200 },
        { id: 'athletics_shot_put', name: "Shot Put", price: 200 },
        { id: 'athletics_discus_throw', name: "Discus Throw", price: 200 },
        { id: 'athletics_long_jump', name: "Long Jump", price: 200 }
      ] }
    ]
  },
  {
    name: "Literary",
    events: [
      { id: 'malarkey', name: "Malarkey", price: 150, exempt: false },
      { id: 'shipwrecked', name: "Shipwrecked", price: 150, exempt: false },
      { id: 'turncoat', name: "Turncoat", price: 150, exempt: false },
      { id: 'scrabble', name: "Scrabble", price: 150, exempt: false },
      { id: 'formal_debate', name: "Formal Debate", price: 250, exempt: false },
      { id: 'cryptic_crossword', name: "Cryptic Crossword", price: 150, exempt: false },
      { id: 'ppt_karaoke', name: "PPT Karaoke", price: 150, exempt: false },
      { id: 'potpourri', name: "Potpourri", price: 150, exempt: false },
      { id: 'india_quiz', name: "India Quiz", price: 150, exempt: false },
      { id: 'fandom_quiz', name: "Fandom Quiz", price: 150, exempt: false },
      { id: 'sports_quiz', name: "Sports Quiz", price: 150, exempt: false },
      { id: 'rewind_quiz', name: "Rewind Quiz", price: 150, exempt: false },
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
  const [expandedEvents, setExpandedEvents] = useState({});
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
    setFormData({ ...formData, delegate_info: [...formData.delegate_info, {delegate_id: '', name: '', email: '', phone: '' }]
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
    
    formData.events.forEach(eventId => {
      // Find the event in either main events or subcategories
      const event = EVENT_CATEGORIES
        .flatMap(cat => cat.events)
        .flatMap(e => e.subcategories ? [e, ...e.subcategories] : [e])
        .find(e => e.id === eventId);
      
      if (event) {
        total += event.price || 0;
      }
    });

    const teammateCount = Math.max(1, 1 + formData.delegate_info.filter(t => 
      t.delegate_id.trim() !== '' && t.email.trim() !== ''
    ).length);
    
    setTotalAmount(total * teammateCount);
  }, [formData.events, formData.delegate_info]);

  const toggleSubcategories = (eventID) => {
    setExpandedEvents(prev => ({
      ...prev, [eventID] : !prev[eventID]
    }));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(subcategoryId)
        ? prev.events.filter(id => id !== subcategoryId)
        : [...prev.events, subcategoryId]
    }));
  };

  const renderEventCheckbox = (event) => {
    const hasSubcategories = event.subcategories?.length > 0;
    const isExpanded = expandedEvents[event.id];

    if (hasSubcategories) {
      return (
        <div key={event.id} className='event-container'>
          <div className='event-header'>
            <span className='event-name'>
              {event.name}
            </span>
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSubcategories(event.id);
              }}
              className='subcategory-toggle'
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          </div>

          {isExpanded && (
            <div className='subcategories'>
              {event.subcategories.map(sub => (
                <label key={sub.id} className='subcategory-label'>
                  <input
                    type='checkbox'
                    checked={formData.events.includes(sub.id)}
                    onChange={() => handleSubcategoryChange(sub.id)}
                  />
                  {sub.name} (₹{sub.price})
                </label>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Regular event without subcategories
    return (
      <div key={event.id} className='event-container'>
        <label className={`event-label ${event.exempt ? 'exempt' : ''}`}>
          <input
            type='checkbox'
            checked={formData.events.includes(event.id)}
            onChange={() => handleCheckboxChange(event.id)}
          />
          {event.name} {event.price > 0 && `(₹${event.price})`}
          {event.exempt && <span className="exempt-badge">Exempt</span>}
        </label>
      </div>
    );
  };

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
      
      const validTeammates = formData.delegate_info.filter(t => t.delegate_id.trim() !== '' && t.name.trim() !== '' && t.email.trim() !== '');

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
                  {category.events.map(event => renderEventCheckbox(event))}
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
                <input value={teammate.name} onChange={(e) => handleTeammateChange(index, 'name', e.target.value)} placeholder='Name' required={index===0}
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