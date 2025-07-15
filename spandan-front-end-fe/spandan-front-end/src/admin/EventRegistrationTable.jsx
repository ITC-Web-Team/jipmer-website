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

  const CATEGORY_EVENT_MAP = {
  fine_arts: ['face_painting', 'pot_painting', 'mehendi', 'sketching', 'painting'],
  dance: ['solo_dance', 'duet_dance', 'chorea_theme', 'chorea_nontheme', 'show_down'],
  music: ['tinnitus', 'alaap', 'euphony', 'raag_rangmanch', 'solo_singing', 'solo_instrumental'],
  drama: ['play', 'skit', 'mime', 'adzap', 'variety', 'dernier_cri'],
  sports: ['cricket', 'football', 'basketball_men', 'basketball_women', 'volleyball_men',
           'volleyball_women', 'hockey_men', 'hockey_women', 'futsal', 'chess_bullet',
           'chess_rapid', 'chess_blitz', 'carroms', 'throwball_men', 'throwball_women',
           'tennis', 'aquatics', 'badminton', 'table_tennis', 'athletics'],
  literary: ['malarkey', 'shipwrecked', 'turncoat', 'scrabble', 'formal_debate',
             'cryptic_crossword', 'ppt_karaoke', 'potpourri'],
  quiz: ['india_quiz', 'fandom_quiz', 'sports_quiz', 'rewind_quiz', 'formal_quiz',
         'tj_jaishankar_memorial_quiz', 'jam']
  }
  const allEvents = Object.values(CATEGORY_EVENT_MAP).flat();

  const downloadSingleEventExcel = (eventName) => {
    axiosInstance.get(`/event-register/export/event/${eventName}/`, {
      responseType: 'blob'
    }).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${eventName}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).catch(() => {
      alert(`Export failed for ${eventName}`);
    });
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className='admin-container'>
      <LogoutButton />
      <h3>Event Registrations</h3>
      <button className='admin-button' onClick={downloadExcel}>Download Excel</button>
      {
        allEvents.map(event => (
          <button key={event} onClick={() => downloadSingleEventExcel(event)}
          style={{ margin: '4px', padding: '8px' }}>
            {event.replaceAll('_', ' ')}
          </button>
        ))
      }
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
              <td>{!row.is_verified && <button className='admin-button' onClick={() => verify(row.id)}>Verify</button>}</td>
              <td>{!row.is_verified && <button className='admin-button' onClick={() => reject(row.id)}>Reject</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventRegistrationTable
