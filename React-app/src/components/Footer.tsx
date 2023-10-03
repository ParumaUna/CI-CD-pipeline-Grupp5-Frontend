//import React from 'react'
import './styles/footer.css'

interface FooterProps {
    div: string;
}

const Footer = ({ div }: FooterProps) => {
    return <footer className='Footer'>

        <div className="star">{div}
            <div className='usefull-links'>
                <ul>
                    <h5>USEFULL LINKS</h5>
                    <h6 className='link-list'>
                        <li>About</li>
                        <li>Services</li>
                        <li>Contact</li>
                    </h6>
                </ul>
            </div>
            <div className='search-bar'>
                <ul>
                    <h5>NEWSLETTER</h5>
                    <input id="input-bar" type="text" placeholder='Enter email' />
                    <button className='submit-btn'>Subscribe now</button>
                </ul>
            </div>
            <div className='Contact'>
                <ul>
                    <h5>CONTACT</h5>
                    <h6 className='Contact'>
                        <li>Isafjordsgatan 30A, 164 40 Kista</li>
                        <li>075624178</li>
                    </h6>
                </ul>
            </div>

        </div>
    </footer>;
}

export default Footer;