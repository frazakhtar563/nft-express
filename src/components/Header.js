import React from "react";
import "../assets/css/header.css";
import "../assets/css/mobileicon.css";

import { Image } from "react-bootstrap";
import logo from "../assets/images/logo.png";
// import notificons from "../assets/images/notificons.png";
// import Setting from "../assets/images/Setting.png";
import Search from "../assets/images/Search.png";
import menu from "../assets/images/menu.png";
import twitter from "../assets/images/white-twitter.png";
import discord from "../assets/images/discordview.png";
import telegram from "../assets/images/white-telegram.png";


import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UpdateMobileMenu } from "../redux/Slices/MobileSlice";

const Header = () => {
  const dispatch = useDispatch();
  const MobileMenuOpenState = useSelector((state) => state.mobile.OpenMenu);
  const navigate = useNavigate();

  const GoToHome = () => {
    navigate("/");
  };

  const openMobileMenu = (e) => {
    e.preventDefault();
    dispatch(UpdateMobileMenu(!MobileMenuOpenState));
  };
  const discordurl = (req, res, next) => {

    window.open("https://discord.com/","_self")
    next();
  };
  const twitterurl = (req, res, next) => {

    window.open("https://twitter.com/?lang=en","_self")
    next();
  };
  const telegramurl = (req, res, next) => {

    window.open("https://telegram.org/","_self")
    next();
  };
 


  return (
    <>
      <div className="HeaderMain MobileHeadre">
        <div className="wrapper">
          <div className="h_right">
            <div className="h_logo">
              <Image
                src={logo}
                alt="Image description"
                fluid={true}
                onClick={GoToHome}
              />
    {/* mobile icons  */}
   
{/* moile icons end  */}

            </div>

            <div className="mobile-icons">
            <Image onClick={telegramurl} className="mobile-icons-bg"  src={telegram} alt="Image description" fluid={true} />
            <Image onClick={telegramurl} className="mobile-icons-bg"  src={discord} alt="Image description" fluid={true} />
            <Image onClick={telegramurl} className="mobile-icons-bg"  src={twitter} alt="Image description" fluid={true} />
            <Image onClick={telegramurl} className="mobile-icons-bg"  src={telegram} alt="Image description" fluid={true} />
            </div>
            {/* <div className="h_icon d-none d-md-block">
              <Image     className="icons-b"  src={notificons} alt="Image description" fluid={true} />
              <Image    className="icons-b" src={Setting} alt="Image description" fluid={true} />
            </div> */}
         
            
          </div>
      

          <div className="h_icon d-none d-md-block">
              <Image onClick={telegramurl} className="icons-bg"  src={telegram} alt="Image description" fluid={true} />
              <Image onClick={discordurl} className="icons-bg"  src={discord} alt="Image description" fluid={true} />
              <Image onClick={twitterurl} className="icons-bg"   src={twitter} alt="Image description" fluid={true} />
              <Image onClick={telegramurl} className="icons-bg"  src={telegram} alt="Image description" fluid={true} />
             
              {/* <Image onClick={opensetting} className="icons-bg"   src={setting} alt="Image description" fluid={true} /> */}
              {/* <Image onClick={opennotification} className="icons-bg"   src={bellicon} alt="Image description" fluid={true} /> */}

            </div>
          <div className="h_left">
            
            <div className="d-none d-md-block">
              
              <Image src={Search} alt="Image description" fluid={true} />
              <input type="text" placeholder="Search for people" />
            </div>
            <div className="d-block d-md-none">
              <Image
                src={menu}
                alt="Image description"
                fluid={true}
                onClick={openMobileMenu}
              />
              
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Header;
