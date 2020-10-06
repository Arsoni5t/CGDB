import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";
import { setAlert } from "../../reducers/alerts_reducers";
import { closeModal } from "../../actions/modal_actions";
const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    alertLogin: () =>
      dispatch(
        setAlert(true, "success", `Welcome, You have successfully logged in!`)
      ),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
