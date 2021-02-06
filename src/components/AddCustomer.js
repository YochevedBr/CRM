import React from "react"


class AddCustomer extends React.Component{
    componentDidMount(){
        
    }

    constructor(props){
        super(props);
        this.openForm = this.openForm.bind(this);
    
    }
    openForm = () => {
        document.getElementById("myForm").style.display = "block";}
    closeForm = () => {
        document.getElementById("myForm").style.display = "none";}

    render(){
        return(
            <div>
                <h3>Add Customer</h3>
                <br></br>
                {/* <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input class="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter name"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Phone number</label>
                        <input type="tel" class="form-control" id="exampleInputPassword1" placeholder="Enter phone number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form> */}
            <button class="open-button" onclick={this.openForm}>Open Form</button>
            
            <div class="form-popup" id="myForm">
                <form action="/action_page.php" class="form-container">
                    <h1>Add Customer</h1>

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required></input>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required></input>

                    <button type="submit" class="btn">Login</button>
                    <button type="button" class="btn cancel" onclick={this.closeForm}>Close</button>
                </form>
            </div>

            </div>
        )
    }
}
   

export default AddCustomer