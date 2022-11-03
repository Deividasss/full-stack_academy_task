import "./homepage.scss";
import 'react-slideshow-image/dist/styles.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';


export default (props) => {

  const navigate = useNavigate()

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      <div className="homePageMain">
        <div className="homePageHeading">
          <h1 className="heading" >Sveiki "Present Connection" !! </h1>
          <h3 className="paragraph">Džiaugiuosi jog suteikėte galimybę dalyvauti "Full-stack Academy'22. Perskaičius užduotį ilgai negalvojus į galvą atėjo idėja, kurią galėčiau įgyvendinti. Kadangi domiuosi kripto valiuta sugalvojau jog galiu sukurti NFT market'ą, kuriame galite savo fantazijos pagalba sukurti ir patalpinti NFT.<br></br>
            {props.loggedIn === true && props.userRole === 0 && (<span className="loginToEnter">Sveikinu prisijungus!! Dabar galite įkelti savo NFT</span>)}
            {props.loggedIn === false && (<span className="loginToEnter">Norėdami pamatyti kaip man sekėsi prisijunkite</span>)}
          </h3>
          <div className="btnContainer">
            {props.loggedIn === true && props.userRole === 0 && (
              <button onClick={() => navigate('/createCrowdFounding')} className="learnMoreBtn">Learn More!</button>
            )}
            {props.loggedIn === false && (
              <button onClick={() => navigate('/login')} className="learnMoreBtn">Login!</button>
            )}
          </div>
        </div>
      </div>
      <div className="currentTime">
        <p className="timeDate">
          <FaRegClock className="currentTimeIcons" />
          {dateState.toLocaleString('lt-LT', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
          <FaRegCalendarAlt className="currentTimeIcons" />
          {' '}
          {dateState.toLocaleDateString('lt-LT', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>
      <div className="homepageInfo">
        <img className="homepageImg" src="https://lh3.googleusercontent.com/cfn1D3xGaA7I3yWw0okwoxk_n27rlYQV1g3-Os3RXng1SE3Bq4cnYFGqb9my8tNlB_DVHO4vDb2pcjCFnlepnwgT7k8QXH3jPki0=w600"></img>
      </div>
    </>
  );
};
