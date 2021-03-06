import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";

import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";
import ProfileShowContainer from "../profile_show/profile_show_container";
import LinksShowContainer from "../links/links";
import "./modal.scss";

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case "login":
      component = <LoginFormContainer />;
      break;
    case "signup":
      component = <SignupFormContainer />;
      break;
    case "profile":
      component = <ProfileShowContainer />;
      break;
    case "links":
      component = <LinksShowContainer />
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background " onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
