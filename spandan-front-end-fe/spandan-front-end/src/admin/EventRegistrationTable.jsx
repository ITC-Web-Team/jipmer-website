import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import LogoutButton from './LogoutButton'
import './adminStyles.css'

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

  // Enhanced event structure including sub-events
  const EVENT_STRUCTURE = {
    fine_arts: [
      'face_painting', 'pot_painting', 'mehendi', 'sketching', 'painting'
    ],
    dance: [
      'solo_dance', 'duet_dance', 
      { 
        name: 'chorea',
        subEvents: ['chorea_theme', 'chorea_nontheme']
      },
      'show_down'
    ],
    music: [
      'tinnitus', 'alaap', 'euphony', 'raag_rangmanch', 'solo_singing', 'solo_instrumental'
    ],
    drama: [
      'play', 'skit', 'mime', 'adzap', 'variety', 'dernier_cri'
    ],
    sports: [
      'cricket', 'football', 'basketball_men', 'basketball_women', 
      'volleyball_men', 'volleyball_women', 'hockey_men', 'hockey_women',
      'futsal', 'chess_bullet', 'chess_rapid', 'chess_blitz', 'carroms',
      'throwball_men', 'throwball_women',
      {
        name: 'tennis',
        subEvents: [
          'tennis_men_singles', 'tennis_women_singles',
          'tennis_men_doubles', 'tennis_women_doubles',
          'tennis_mixed_doubles'
        ]
      },
      {
        name: 'aquatics',
        subEvents: [
          'aquatics_men_50m_freestyle', 'aquatics_men_50m_backstroke',
          'aquatics_men_50m_breaststroke', 'aquatics_men_50m_butterfly',
          'aquatics_men_4x50m_freestyle_relay',
          'aquatics_women_50m_freestyle', 'aquatics_women_50m_backstroke',
          'aquatics_women_50m_breaststroke', 'aquatics_women_50m_butterfly',
          'aquatics_mixed_4x50m_freestyle_relay'
        ]
      },
      {
        name: 'badminton',
        subEvents: [
          'badminton_men_singles', 'badminton_women_singles',
          'badminton_men_doubles', 'badminton_women_doubles',
          'badminton_mixed_doubles'
        ]
      },
      {
        name: 'table_tennis',
        subEvents: [
          'table_tennis_men_singles', 'table_tennis_women_singles',
          'table_tennis_men_doubles', 'table_tennis_women_doubles'
        ]
      },
      {
        name: 'athletics',
        subEvents: [
          'athletics_100m', 'athletics_200m', 'athletics_400m',
          'athletics_800m', 'athletics_1500m', 'athletics_4x100m',
          'athletics_shot_put', 'athletics_discus_throw', 'athletics_long_jump'
        ]
      }
    ],
    literary: [
      'malarkey', 'shipwrecked', 'turncoat', 'scrabble', 'formal_debate',
      'cryptic_crossword', 'ppt_karaoke', 'potpourri'
    ],
    quiz: [
      'india_quiz', 'fandom_quiz', 'sports_quiz', 'rewind_quiz', 'formal_quiz',
      'tj_jaishankar_memorial_quiz', 'jam'
    ]
  }

  // Flatten all events and sub-events into a single array
  const getAllEvents = () => {
    const allEvents = []
    
    Object.values(EVENT_STRUCTURE).forEach(category => {
      category.forEach(event => {
        if (typeof event === 'object' && event.subEvents) {
          // Add main event
          allEvents.push(event.name)
          // Add all sub-events
          event.subEvents.forEach(subEvent => allEvents.push(subEvent))
        } else {
          allEvents.push(event)
        }
      })
    })
    
    return allEvents
  }

  const downloadSingleEventExcel = (eventName) => {
    axiosInstance.get(`/event-register/export/event/${eventName}/`, {
      responseType: 'blob'
    }).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${eventName}_registrations.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    }).catch(err => {
      console.error(`Export failed for ${eventName}:`, err)
      alert(`Export failed for ${eventName}`)
    })
  }

  // Group events by category for better UI organization
  const renderEventExportButtons = () => {
    return Object.entries(EVENT_STRUCTURE).map(([category, events]) => (
      <div key={category} className="event-category-section">
        <h4>{category.replace('_', ' ').toUpperCase()}</h4>
        <div className="event-buttons-container">
          {events.map(event => {
            if (typeof event === 'object' && event.subEvents) {
              return (
                <div key={event.name} className="subevent-group">
                  <button 
                    onClick={() => downloadSingleEventExcel(event.name)}
                    className="event-button main-event"
                  >
                    {event.name.replaceAll('_', ' ')}
                  </button>
                  <div className="subevent-buttons">
                    {event.subEvents.map(subEvent => (
                      <button
                        key={subEvent}
                        onClick={() => downloadSingleEventExcel(subEvent)}
                        className="event-button sub-event"
                      >
                        {subEvent.replaceAll('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )
            }
            return (
              <button
                key={event}
                onClick={() => downloadSingleEventExcel(event)}
                className="event-button"
              >
                {event.replaceAll('_', ' ')}
              </button>
            )
          })}
        </div>
      </div>
    ))
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className='admin-container'>
      <LogoutButton />
      <h2>Event Registrations</h2>
      
      <div className="export-section">
        <h3>Export Registrations</h3>
        <button className='admin-button' onClick={() => {
          axiosInstance.get('/event-register/export/', {
            responseType: 'blob'
          }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'all_event_registrations.xlsx')
            document.body.appendChild(link)
            link.click()
            link.remove()
          }).catch(err => {
            console.error("Excel download failed:", err)
            alert("Excel download failed")
          })
        }}>
          Download All Registrations
        </button>
        
        <div className="event-export-container">
          {renderEventExportButtons()}
        </div>
      </div>

      <h3>Registration Records</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Events</th>
            <th>College</th>
            <th>Screenshot</th>
            <th>Verified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>
                {Array.isArray(row.events) 
                  ? row.events.join(', ') 
                  : row.events}
              </td>
              <td>{row.college}</td>
              <td>
                {row.payment_screenshot ? (
                  <a 
                    href={row.payment_screenshot} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                ) : '-'}
              </td>
              <td>{row.is_verified ? '✅' : '❌'}</td>
              <td>
                {!row.is_verified && (
                  <>
                    <button 
                      className='admin-button verify-btn'
                      onClick={() => verify(row.id)}
                    >
                      Verify
                    </button>
                    <button 
                      className='admin-button reject-btn'
                      onClick={() => reject(row.id)}
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
    </div>
  )
}

export default EventRegistrationTable