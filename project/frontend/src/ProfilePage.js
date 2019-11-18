import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBIcon } from 'mdbreact';
import './General.css';
import { Radar } from 'react-chartjs-2';
import Cookies from 'js-cookie'
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import * as moment from 'moment'

export default class FormPage extends React.Component {

  constructor(props) {
    super(props);
    axios.get('http://18.184.207.248/api/search?text=' + Cookies.get('search_context') + '&type=' + Cookies.get('search_type'), { withCredentials: true })
      .then(res => {
        console.log(res.data)
      })
    axios.get(('http://18.184.207.248/api/user/' + Cookies.get('username')), { withCredentials: true })
      .then(res => {
        //console.log(res.data);
        this.setState({ information: res.data });
      })
    axios.get('http://18.184.207.248/api/user/' + Cookies.get('username') + '/comments', { withCredentials: true })
      .then(res => {
        //console.log(res.data);
        this.setState({ comments: res.data });
      })
    axios.get('http://18.184.207.248/api/user/' + Cookies.get('username') + '/language/level', { withCredentials: true })
      .then(res => {
        //console.log(res.data);
        this.setState({ languages: res.data });
      })

    this.state = {
      comments: [],
      languages: [],
      information: [],
      exercises: false,
      writing: false,
      dataRadar: {
        labels: ["Listening", "Reading", "Writing", "Vocabulary", "Grammar"],
        datasets: [
          {
            label: "english",
            backgroundColor: "rgba(245, 74, 85, 0.5)",
            data: [3.25, 7, 6, 5, 5]
          },
          {
            label: "german",
            backgroundColor: "rgba(90, 173, 246, 0.5)",
            data: [2.7, 4, 4.3, 7, 4]
          }
        ]
      }
    }
  }

  commentField() {
    var comm = [];
    for (let i = 0; i < this.state.comments.length; i++) {
      comm[i] = (
        <div className="Comment">
          <p className="commentsec_title">{this.state.comments[i].comment_by}</p>
          <p>{this.state.comments[i].text}</p>
          <p className="commentsec_usrname rightaligned small">{moment(this.state.comments[i].createdAt).format('MMM Do YY, h:mm:ss a')}</p>
        </div>
      );
    }
    return comm;
  }

  languagesWithLevels() {
    var lan = [];
    for (let i = 0; i < this.state.languages.length; i++) {
      lan[i] = (
        <MDBCol md="4" className="topMargined commentsec_usrname">
          <div >
            <p > {this.state.languages[i].lang_abbr} -> {this.state.languages[i].grade}  </p>
          </div>
        </MDBCol>
      );
    }
    return lan;
  }


  componentDidMount() {
    var _navbar = document.getElementById("nav");
    if(_navbar.childNodes.length>2){
      return;
    }
    _navbar.removeChild(_navbar.childNodes[0]);
    var _nav = document.getElementById("last_item");
    _nav.insertAdjacentHTML('beforebegin',
    '<li id="chld"><a href="/profile">Profile</a></li>');
    _nav.insertAdjacentHTML('afterend',
    '<li id="chld"><a href="/exam">Exam</a></li>'+
    '<li id="chld"><a href="/writing">Send Writing</a></li>'+
    '<li id="chld"><a href="/messages">Messages</a></li>' +
    '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>'+
    '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>'+
    '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
  }

  render() {
    return (
      <MDBContainer fluid>
        <MDBRow>
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
          <MDBCol md="4">
            <div className="fixedsizebio">
              <div className="marginedleft20">
                <MDBRow>
                  <MDBCol md="6">
                    <MDBRow>
                      <MDBCol>
                        <div > <p className="commentsec_usrname topMargined" >{this.state.information.username}</p> </div>
                        <StarRatingComponent
                          editing={false}
                          starCount={5}
                          value={this.state.information.rating}
                          size="50px"
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="6">
                    <img className="profilePic topMargined marginedleft50" src={this.state.information.avatar} alt="." />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBRow>
                      {this.languagesWithLevels()}
                    </MDBRow>
                    <MDBRow>
                      <div className="Bio"><p className="commentsec_usrname">My Biography</p>
                        {this.state.information.bio}
                      </div>
                      <div > <p className=" topMargined marginedleft" >
                        <MDBIcon icon="envelope" className="mr-3" />
                        {this.state.information.email}</p> </div>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </div>
            </div>
          </MDBCol>
          <MDBCol md="4">
            <div className="Scrollbar">
              {this.commentField()}
            </div>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-5 ">
              <MDBCardHeader>Language levels</MDBCardHeader>
              <MDBCardBody>
                <Radar data={this.state.dataRadar} options={{ responsive: true }} /></MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
