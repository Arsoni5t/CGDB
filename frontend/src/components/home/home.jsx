import React from "react";
import "./home.scss";
import QuestionShow from "../question_show/question_show_container";
import HarvardQuestionShow from '../question_show/harvard_question_show_container';
import InterruptText from "../interrupt_text/interrupt_text_container";
import SplitPieces from '../split-pieces/split-pieces';

export default class Home extends React.Component {
  componentDidMount() {
    let vid;
    if (document.getElementById("background-video"))
      vid = document.getElementById("background-video");
    function setPlaySpeed() {
      vid.playbackRate = .7;
    }
    if (vid) setPlaySpeed();
  }

  render() {
    if (this.props.currentUser.sanity < -12) {
      this.props.resetSanity(this.props.currentUser.email);
      return (
        <div className="gameover">
          <audio
            autoPlay
            loop
            src="https://webfilms-films.s3.amazonaws.com/sounds/laugh.wav"
          ></audio>
          <p>
            {" "}
            The CGDb are unable to help you today. Please remain still until a
            nurse can administer your medications. You know what happens if you
            try to move… See you tomorrow.{" "}
          </p>
          <p>- Drs. Chris, Gio, Dennis and Brad</p>
        </div>
      );
    }
      else if (this.props.currentUser.progress > 8) {
        setTimeout(() => { this.props.updateSanity(this.props.currentUser.email, -20)
          .then(resp => (this.props.receiveCurrentUser(resp.data))) }, 11000);
          return (
            <div className="gunshot">
              <video autoPlay src="https://webfilms-films.s3.amazonaws.com/end+screen.mp4" type="video/mp4"></video>
            </div>
          )
    
    } else if (this.props.currentUser.progress > 5) {
      return (
        <div className="home-container" id="home-container">
          <InterruptText className="fade-out" />
          <HarvardQuestionShow />
        </div>
      );
      
    } else if (this.props.currentUser.progress === 4) {
      return (
        <div className="home-container" id="home-container">
          <SplitPieces 
          email={this.props.currentUser.email} 
          updateSanity={this.props.updateSanity}
          receiveCurrentUser={this.props.receiveCurrentUser}
          />
        </div>
      );
      
      
      
    } 
    else {
      return (
        <div className="home-container" id="home-container">
          <InterruptText />
          <QuestionShow />
        </div>
      );
    }
  }
}
