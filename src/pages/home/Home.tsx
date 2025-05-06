import Header from "../../components/header/Header";
import './Home.css';

export default function Home() {
  return (
    <div className="home-bg">
      <Header />
      <div className="home-content">
        <h1>Welcome to MusicBot</h1>
        <h2>The only chatbot for the music world</h2>
      </div>
    </div>
  );
}
