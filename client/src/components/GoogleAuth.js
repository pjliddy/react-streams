import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '155632662626-u0un0efbj7k5fvq18ruobo9fvginve3n.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // call authentication object once client is initialized
        this.auth = window.gapi.auth2.getAuthInstance();

        // update component if user is logged in
        this.onAuthChange(this.auth.isSignedIn.get());

        // set up event listener
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // callback as arrow function to bind 'this'
  // callback gets passed a boolean for google auth listener
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // pass in ID of user to save
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      // init still processing, so show nothing
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={this.onSignOutClick}
        >
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui red google button"
          onClick={this.onSignInClick}
        >
          <i className="google icon"></i>
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  // get value set by authReducer
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut }) (GoogleAuth);
