import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    uName: '',
    pWord: '',
    errorMsg: '',
    isError: false,
  }

  onChangeUser = event => {
    this.setState({uName: event.target.value})
  }

  onChangePass = event => {
    this.setState({pWord: event.target.value})
  }

  onSuccessApiCall = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureApiCall = errMsg => {
    this.setState({errorMsg: errMsg, isError: true})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {uName, pWord} = this.state
    const userDetails = {
      username: uName,
      password: pWord,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessApiCall(data.jwt_token)
    }
    if (response.ok === false) {
      this.onFailureApiCall(data.error_msg)
    }
  }

  render() {
    const {uName, pWord, errorMsg, isError} = this.state
    const {history} = this.props
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      history.replace('/')
    }

    return (
      <>
        <div className="bg-cont">
          <img
            src="https://res.cloudinary.com/di7wgaobj/image/upload/v1673593659/Rectangle_1467loadingpage_f5n7mm.png"
            className="website-logo-img"
            alt="login website logo"
          />
          <img
            src="https://res.cloudinary.com/di7wgaobj/image/upload/v1673845306/Ellipse_99booksmall_snkjdg.png"
            className="sm-website-logo-img"
            alt="login website logo"
          />
          <img
            src="https://res.cloudinary.com/di7wgaobj/image/upload/v1673848110/Group_7732smalllogo_cgq4nj.png"
            className="sm-form-logo-img"
            alt="website login"
          />
          <form className="sm-login-form-cont" onSubmit={this.onFormSubmit}>
            <label htmlFor="username" className="sm-user-name-p">
              Username*
            </label>
            <br />
            <input
              type="text"
              className="sm-user-box"
              id="username"
              onChange={this.onChangeUser}
              value={uName}
            />
            <br />
            <label htmlFor="passWord" className="sm-pass-p">
              Password*
            </label>
            <br />
            <input
              type="password"
              className="sm-pas-box"
              id="passWord"
              onChange={this.onChangePass}
              value={pWord}
            />

            {isError && <p className="sm-error-para">{errorMsg}</p>}
            <button type="submit" className="sm-login-btn">
              Login
            </button>
          </form>

          <form className="login-form-cont" onSubmit={this.onFormSubmit}>
            <img
              src="https://res.cloudinary.com/di7wgaobj/image/upload/v1673594878/Group_7731logo1_qwmdsa.png"
              className="logo-img"
              alt="website login"
            />
            <label htmlFor="us" className="user-name-p">
              Username*
            </label>
            <input
              type="text"
              className="user-box"
              id="us"
              onChange={this.onChangeUser}
              value={uName}
            />
            <label htmlFor="ps" className="pass-p">
              Password*
            </label>
            <input
              type="password"
              className="pas-box"
              id="ps"
              onChange={this.onChangePass}
              value={pWord}
            />
            {isError && <p className="error-para">{errorMsg}</p>}
            <button type="submit" className="login-form-btn">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}
export default LoginForm
