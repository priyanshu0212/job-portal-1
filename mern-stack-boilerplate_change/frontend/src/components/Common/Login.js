import React, {Component} from 'react';
import axios from 'axios';
// import TextField from 'material-ui/TextField';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import Paper from 'material-ui/Paper';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Avatar from '@material-ui/core/Avatar';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';


export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    onChangeEmail(event){
        this.setState({ email: event.target.value })
    }

    onChangePassword(event){
        this.setState({ password: event.target.value })
    }

    addUser(event) {
        event.preventDefault();
        const userAdd = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(userAdd)
        axios.get('http://localhost:4000/router/user', userAdd)
        .then(res => { 
            var tmpflag = 0
            var temp = "none";
            console.log(res);
            for(var i=0;i<res["data"].length;i++)
            {
                if(res["data"][i]["email"] === userAdd["email"] && res["data"][i]["password"] === userAdd["password"])
                {
                    tmpflag = 1;
                    temp = res["data"][i]["type"];
                    break;
                }
            }
            if(tmpflag)
            {
                // sessionStorage.setItem("LoggedInUser", userAdd["name"]);
                // sessionStorage.setItem("Typev", temp);
                console.log("Logged In");
                alert("credentials matched");
                // this.setState({ redirect: this.state.redirect === false });
            }
            else
            {
                alert("Wrong username or password");
                console.log("Wrong password or username")
            }
        })
        .catch(err => { 
            console.log(err) 
        });
    }

    render() {
        return (
            <div className="container" style={{marginTop: "50px"}}>
                <h2>Login Page</h2>
                <form onSubmit={this.addUser} method="user">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label text-left">email</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" onChange={this.onChangeEmail} name="name" value={this.state.email}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label text-left">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" onChange={this.onChangePassword} name="password" value={this.state.password}/>
                        </div>
                    </div>
                    <hr/>
                    <div style={{marginLeft: "0px"}} className="row">
                        <button type="submit" className="btn btn-warning" style={{marginLeft: "0px"}}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
}