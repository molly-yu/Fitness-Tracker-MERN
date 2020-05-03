import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

export default class CreateExercises extends Component{

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this); // binding this
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        this.state = { // variables
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() { // lifecycle component, run before loading
        axios.get('http://localhost:5000/users/') // get request from server
        .then(response => {
            if(response.data.length > 0){ // if non-empty list
                this.setState({
                    users: response.data.map(user => user.username), //return username from array of users
                    username: response.data[0].username
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }
        
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise) //post user to server database
        .then(res => console.log(res.data));

        window.location = '/'; //back to homepage
    }

    render(){
        return(
            <div>
                <h3>Create new exercise log</h3> 
                { /* dropdown menu */}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label> 
                        <select 
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user){ //return array of users with options
                                    return <option 
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                                })
                            }
                            </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label> 
                        {/* input text box */}
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>

                    <div className="form-group">
                        <label>Duration (in min): </label> 
                        {/* input text box */}
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>

                    <div className="form-group">
                        <label>Date: </label> 
                        {/* date picker */}
                        <div>
                            <DatePicker
                                // dateFormat={moment(this.state.date).format("yyyy/MM/dd")}
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div> 
                </form>
            </div>
        )
    }
}