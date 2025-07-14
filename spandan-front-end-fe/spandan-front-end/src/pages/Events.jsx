import React, { useState } from 'react'
import './Events.css'
import { LuBadgeIndianRupee } from "react-icons/lu"
import { useNavigate } from 'react-router-dom'

const modules = import.meta.glob('../events/**/**/index.jsx', { eager: true })

function Events() {
  const colorList = ['red', 'blue', 'green', 'orange', 'purple']
  const lateDate = new Date('2025-08-18T00:00')
  const onSpotDate = new Date('2025-08-25T00:00')
  const currentDate = new Date()
  const [category, setCategory] = useState("All")

  const navigate = useNavigate()

  const eventCards = Object.entries(modules).map(([path, module]) => {
    const type = path.split('/')[2]
    const name = path.split('/')[3]
    const hash = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
    const colorClass = colorList[hash % colorList.length]
    const meta = module.meta || {}
    const fee = currentDate <= lateDate ? meta.early : currentDate <= onSpotDate ? meta.late : meta.onspot

    return {
      type,
      name,
      colorClass,
      fee,
      thumbnail: meta.thumbnail,
      description: meta.description,
      details: meta.details || [],
      form_link: meta.form_link || null
    }
  })

  const categories = ['All', ...new Set(eventCards.map(d => d.type))]

  return (
    <section className="spandan-events-section">
      <div className="spandan-banner">
        <h1>EVENTS<h1>EVENTS</h1></h1>
        <p>
          Unleash your talents across cultural performances, sports championships, fine arts, literary competitions, and creative challenges!
        </p>
        <div className="event-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={category === cat ? "filter active" : "filter"}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <button className='register-button' onClick={() => navigate('/event-register')}>Register!</button>

      <div className="event-cards-container">
        {(category === "All" ? eventCards : eventCards.filter(e => e.type === category)).map(({ type, name, colorClass, fee, thumbnail, description, details, form_link }) => (
          <div className={`event-card major ${colorClass}`} key={name}>
            <div id="top">
              <span className="category-badge">{type}</span>
              <p className="registration-fee"><LuBadgeIndianRupee size={20} /> <b>{fee}</b></p>
            </div>

            <div className="event-photo" style={{ backgroundImage: `url(${thumbnail})` }}></div>

            <h2>{name}</h2>
            <p className="subtitle">{description}</p>
            <ul className="event-details">
              {details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>

            {form_link && (
              <a
                href={form_link}
                target="_blank"
                rel="noopener noreferrer"
                className="event-gform-link"
              >
                Register via Google Form
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Events
