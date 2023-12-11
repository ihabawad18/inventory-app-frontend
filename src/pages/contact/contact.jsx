import React, { useState } from "react";
import Card from "../../components/Card";
import './contact.css';
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import {GoLocation} from 'react-icons/go';
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";
import { toast } from "react-toastify";
const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
        
        const response = await axios.post(`${BACKEND_URL}/api/contactus`,data);
        setSubject("");
        setMessage("");
        toast.success(response.data.message);
    } catch (error) {
        toast.error(error.message);
    }
  };

  return (
    <div>
      <h3>Contact Us</h3>
      <div className="contact flex flex-wrap gap-16">
        <form onSubmit={sendEmail} className=" w-5/12 max-w-full">
          <Card cardClass="card3">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
            <label>Message</label>
            <textarea
              type="text"
              name="message"
              required
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              cols={"30"}
              rows={"12"}
            ></textarea>
            <button className="custom-profile-button bg-blue-500 text-white rounded p-3 cursor-pointer hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out mt-3">Send Message</button>


          </Card>
        </form>

        <div className="contact-info w-5/12 max-w-full">
            <Card cardClass={"card2"}>
                <h3>Our Contact Information</h3>
                <p className="sub-header">Fill the form or contact us via other channels listed below</p>

                <div>
                    <span className="flex items-center">
                        <FaPhoneAlt/>
                        <p className="text-xl ml-1 ">phone</p>
                    </span>
                    <span className="flex items-center">
                        <FaEnvelope/>
                        <p className="text-xl ml-1 ">email</p>
                    </span>
                    <span className="flex items-center">
                        <GoLocation/>
                        <p className="text-xl ml-1 ">Lebanon, Saida</p>
                    </span>
                    <span className="flex items-center">
                        <FaTwitter/>
                        <p className="text-xl ml-1 ">@twitter</p>
                    </span>
                </div>


            </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
