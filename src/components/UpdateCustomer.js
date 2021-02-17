import React from 'react';
import { Container,Row,Col,Form} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddCallRecord from "./AddCallRecord";
import './UpdateCustomer.css'
// import {connect} from 'react-redux';
// import DefaultUserPic from "../uploads/team-male.jpg";
// const axios = require('axios');

class UpdateCustomer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:this.props.username,
            phonenumber:this.props.phonenumber,
            email:this.props.email,
            profileImage:this.props.profileImage,
            msg:this.props.msg,
            uploadedFile:null
        }
    }

    // fetchUserDetails=(user_id)=>{
    //     //console.log(user_id);
    //     axios.get("http://localhost:5000/userapi/getUserDetails/"+user_id,{
    //         headers: {
    //             "content-type": "application/json"
    //           }
    //     }).then(res=>{
    //         console.log(res);
    //         this.setState({email:res.data.results[0].email});
    //         this.setState({profileImage:res.data.results[0].profileImage})
    //     })
    //     .catch(err=>console.log(err))
    // }

    // changeProfileImage=(event)=>{
       
    //     this.setState({uploadedFile:event.target.files[0]});
    // }

    // UpdateProfileHandler=(e)=>{
    //     e.preventDefault();
    //     //create object of form data
    //     const formData=new FormData();
    //     formData.append("profileImage",this.state.uploadedFile);
    //     formData.append("user_id",this.state.user_id);

    //     //update-profile
    //     axios.post("http://localhost:5000/userapi/update-profile/",formData,{
    //         headers: {
    //             "content-type": "application/json"
    //           }
    //     }).then(res=>{
    //         console.log(res);
    //        this.setState({msg:res.data.message});
    //        this.setState({profileImage:res.data.results.profileImage});
    //     })
    //     .catch(err=>console.log(err))
    // }


    // componentDidMount(){
    //  this.fetchUserDetails(this.state.user_id);
    // }

    render(){

    // if(this.state.profileImage){
    //     var imagestr=this.state.profileImage;
    //     imagestr = imagestr.replace("public/", "");
    //     var profilePic="http://localhost:5000/"+imagestr;
    // }else{
    //      profilePic=DefaultUserPic;
    // }

    return (
    <Container>
        <Row>
            <Col xs={6}>
                <h1>Customer</h1>
                <Form>     
                    <p>{this.state.msg}</p>
                    <Form.Group controlId="formCategory1">
                        <div className="label">
                        <Form.Label>Name</Form.Label>
                        </div>
                        <Form.Control type="text" defaultValue={this.state.username}/> 
                    </Form.Group>
                    <Form.Group controlId="formCategory1">
                        <div className="label">
                        <Form.Label>Phone Number</Form.Label>
                        </div>
                        <Form.Control type="text" defaultValue={this.state.phonenumber}/> 
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <div className="label">
                        <Form.Label>Email</Form.Label>
                        </div>
                        <Form.Control type="email" defaultValue={this.state.email} />          
                    </Form.Group>
                    <Button variant="outlined" color="primary" onClick={this.UpdateProfileHandler}>Update</Button>
                    <AddCallRecord />
                </Form>
            </Col>
        </Row>
    </Container>
    )
}
}

const mapStatetoProps=(state)=>{
    return{
        user_id:state.user.userDetails.userid,
        username:state.user.userDetails.username,
       email:state.user.email,
       profileImage: state.user.profileImage,
       msg:state.user.msg
    }
   }
   
   
   export default UpdateCustomer
//    export default connect(mapStatetoProps)(UserProfile);