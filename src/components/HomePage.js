import React from "react"
import './HomePage.css'
import img from '../pictures/homepage2.JPG'
import instegram from '../pictures/instegram.png'


class HomaPage extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
          <div className="background">
            <img src={img} alt="logo" height={530} width={1500}/>
          <div className="social-container">
            <h8>yptbrealestate@gmail.com</h8>
            <br></br>
            <a href=" https://www.instagram.com/yptb_real_estate" className="instagram social">
              <img src={instegram} alt="instegram" height={30} width={30}/>
            </a>
          </div>
          </div>
          
           
          
        )
    }
}
export default HomaPage