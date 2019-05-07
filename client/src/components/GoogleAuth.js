import React from 'react';

class GoogleAuth extends React.Component {
  // initialize component state
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '155632662626-u0un0efbj7k5fvq18ruobo9fvginve3n.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // call authentication object once client is initialized
        this.auth = window.gapi.auth2.getAuthInstance();

        // update component state if user is logged in
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        
        // set up event listener
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // callback as arrow function to bind 'this'
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  onSignIn = () => {
    this.auth.signIn();
  }

  onSignOut = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOut}>
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button"  onClick={this.onSignIn}>
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

export default GoogleAuth;
