import React, { Component } from "react";
import { withRouter,Link } from "react-router-dom";
import Aux from '../../Auxilary/Auxilary'
import Modal from "@material-ui/core/Modal";
import "./Auth.css"

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            formData: {
                username: "",
                pswd: ""
            },
            showModal: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal = () => {
        this.setState(prevState => ({
          showModal: !prevState.showModal
        }));
      }
    handleChange = event => {
        const { formData } = this.state;
        this.setState({
            formData: {
                ...formData,
                [event.target.name]: event.target.value,
            }
        });
    }

    loginClicked = (event) => {
        event.preventDefault();
        if (this.state.formData.username === "test" && this.state.formData.pswd === "test@1234!") {
            this.props.history.push('/home')
        }
        else {
            this.setState(prevState =>({
                showModal : !prevState.showModal,
                formData: {
                    username: "",
                    pswd: ""
                }
            })
            );
            // this.props.history.push('/loginerror')
        }

    }
    render() {
        return (
            <Aux>
                <div class="login-div">
                <form class="form-login"onSubmit={this.loginClicked}>
                    <input type="text" name="username" value={this.state.formData.username} onChange={this.handleChange} placeholder="Username" autoComplete="off" ></input>
                    <input type="password" name="pswd" value={this.state.formData.pswd} onChange={this.handleChange} placeholder="Password" autoComplete="off"></input>
                    <button class="Login-button" type="submit">Login</button>
                </form>
                
                </div>
                <Modal
                    aria-labelledby="server-modal-title"
                    aria-describedby="server-modal-description"
                    open={this.state.showModal}
                    onClose={this.toggleModal}
                >
                    <div className="modal-div">
                        <h1 id="modal-title">Error</h1>
                        <hr></hr>
                        <p id="modal-description-1">Invalid username and password</p>
                        <Link to="/" id="modal-description-2" 
                    onClick={this.toggleModal}>Try again &#33;</Link>
                    </div>
                </Modal>
            </Aux>
        );
    }

}
export default withRouter(Auth);