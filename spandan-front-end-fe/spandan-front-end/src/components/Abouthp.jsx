import React from 'react'
import {Link} from 'react-router'

function Abouthp() {
  return (
    <>
    <div className = "centered-div">
      <Link to='/about' className="abouthp"><h1>About Spandan</h1></Link>
    <div className = "row-hp"><img src="/assets/about/fourth.png" />
        <div className = "third-row-2"><img src="/assets/about/fifth.png" />
    <img src="/assets/about/sixth.png" />
    <img src="/assets/about/seventh.png" /></div>
    </div>
    </div>
    </>
  
  )
}

export default Abouthp