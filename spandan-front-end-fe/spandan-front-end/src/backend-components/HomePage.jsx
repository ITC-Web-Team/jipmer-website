import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <div className="spandan-home-container">
        <h1 className="spandan-home-title">
          Spandan Registration
        </h1>

        <div className="spandan-home-grid">
          {/* Delegate Card */}
          <Link to="/delegate-card" className="spandan-card spandan-card-yellow">
            <h2 className="spandan-card-title">🎫 Delegate Card</h2>
            <p className="spandan-card-desc">Register for your delegate card</p>
          </Link>

          {/* Event Passes */}
          <Link to="/pass-purchase" className="spandan-card spandan-card-blue">
            <h2 className="spandan-card-title">🏷️ Event Passes</h2>
            <p className="spandan-card-desc">Buy special event passes</p>
          </Link>
        </div>
      </div>
      <div className ="delegate-card-container">
        <div className = "delegate-card">
          <div className = "the-card-1">
            
          </div>
          
          <p className = "details">
            Register as a delegate to gain access to: Participate and spectate all sports events(+reg fee) + Access to Mainstage on day 1 (inaugural night+DJ)
          </p>
        </div>

        <div className = "delegate-card">
          <div className = "the-card-2">
            
          </div>
          
          <p className = "details">
Register as a delegate to gain access to:
Participate and spectate all minor cultural events(+reg fee) + Access to Mainstage on day 1 (inaugural night+DJ) <br/> *Does not apply to Culturals - Major          </p>
        </div>

        <div className = "delegate-card">
          <div className = "the-card-3">
            
          </div>
          
          <p className = "details">
Register as a delegate to gain access to:
Participate and spectate all Literary/Quiz events+ Access to Mainstage on day
1 (inaugural night+DJ) <br/>
Participate and spectate all Literary and Quiz events + Access to Mainstage on day 1(inaugural night+DJ)          </p>
        </div>


        
        </div>
                <p className = "footnote">Refer to the <a className="flink" href="https://www.instagram.com/jipmer_spandan?igsh=OXZnOHJ1MG9nMmdk">Instagram page</a> or <a className = "flink" href="https://drive.google.com/file/d/1GNGUPjzQtuQnrQ1yJFYGDsJtlpMWZApG/view?usp=drivesdk">Brochure</a> for further details.</p>


      <style>{`
        .spandan-home-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 4rem 2rem;
          font-family: 'Jost', sans-serif;
        }

        .spandan-home-title {
          color: #FF194C;
          font-family: 'BadaBoom BB', sans-serif;
          font-size: 4rem;
          -webkit-text-stroke: 0.5px black;
          text-align: center;
          text-shadow: 2px 2px 2px black;
          margin-bottom: 2rem;
        }

        .spandan-home-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .spandan-card {
          padding: 2rem;
          background-color: #1f1f1f;
          border-radius: 0.5rem;
          text-decoration: none;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          line-height: 1.4;
          cursor: pointer;
          position: relative;
          border: 2px solid transparent;
        }

        .spandan-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
        }

        .spandan-card-yellow {
          border-color: #FBCA03;
        }

        .spandan-card-blue {
          border-color: #149CFF;
        }
          .flink {
          color: #149cff;}

        .spandan-card-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          margin-top: 0;
          font-family: 'gill sans std', sans-serif;
          color: #fff;
          text-shadow: 1px 1px 0 #000;
        }

        .spandan-card-desc {
          font-size: 1.1rem;
          color: #e0e0e0;
          margin: 0;
          font-family: 'might makes right bb', sans-serif;
        }
        .delegate-card-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 4rem;
        justify-items: center;
        margin: 2rem;
        }

        .delegate-card {
        border-radius: 16px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 380px;
    position: relative;
        background-color: #ff9090ff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    margin: 2rem;
}
    .the-card-1, .the-card-2, .the-card-3 {
    border-radius: 12px;
    width: 380px;
    height: 420px;
    transition: 0.6s ease-in-out;
    align-self: center;

      }

      .footnote {
      font-family: 'gill sans std', sans-serif;
      font-size: 1.2rem;
      color: white;
      text-align: center;
      margin-top: 2rem;}
    .the-card-1 {
    background: url('./assets/delegate/photophoto - 1.png') no-repeat center center;
      }
    .the-card-2 {
    background: url('./assets/delegate/photophoto - 3.png') no-repeat center center;
      }
    .the-card-3 {
    background: url('./assets/delegate/photophoto - 5.png') no-repeat center center;
      }
    .the-card-1:hover{
        background: url('./assets/delegate/photophoto - 2.png') no-repeat center center;}
    .the-card-2:hover{ 
    background: url('./assets/delegate/photophoto - 4.png') no-repeat center center;}
    .the-card-3:hover{
    background: url('./assets/delegate/photophoto - 6.png') no-repeat center center;} 

    .details {
    font-size: 1.2rem;
    color: #333;
    margin-top: 1rem;
    text-align: center;
    font-family: 'might makes right bb', sans-serif;
    font-weight: 400;
    line-height: 1.2;
    }
        @media (max-width: 500px) {
          .spandan-home-title {
            font-size: 2.5rem;
          }

          .spandan-card-title {
            font-size: 1.5rem;
          }

          .spandan-card-desc {
            font-size: 1rem;
          }
          
        }
      `}</style>
    </>
  )
}

export default HomePage