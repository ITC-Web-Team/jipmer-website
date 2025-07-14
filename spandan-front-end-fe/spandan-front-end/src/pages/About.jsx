import React from 'react'
import './About.css'

function About() {
  return (
    <>
    <img id="title" src="/assets/about/top.png" />
    <div className = "comic">
        <div className = "row">
          <img src="/assets/about/first.png" />
          <img src="/assets/about/second.png" />
        </div>

        <div className = "row"><img src="/assets/about/third.png" /></div>

        <div className = "row"><img src="/assets/about/fourth.png" />
        <div className = "third-row-2"><img src="/assets/about/fifth.png" />
    <img src="/assets/about/sixth.png" />
    <img src="/assets/about/seventh.png" /></div>
        </div>
    
    <div className = "row">
    <img src="/assets/about/eighth.png" />
    <img src="/assets/about/ninth.png" />
    <img src="/assets/about/tenth.png" /></div>
    </div>
    </>
  )
}

export default About