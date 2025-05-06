import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <header className="header">
                <div className="tittle">
                   <Link to="/">MusicBot</Link> 
                </div>
                <div className="chat">
                    <Link to="/chat">Get Started</Link> 
                </div>
            </header>
        </div>
    );
}