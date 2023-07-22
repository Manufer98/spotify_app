import FlippableCard from "./FlippableCard";
import "./Home.css";

const Home = () =>{

	return(
		<div className="home_cc">
			<div className="home_image-container">
			<img className="rosalia" src="https://cdn.getcrowder.com/images/1678708868669-null-main.jpeg" alt="" />
			
			</div>
			<div className="home_gridi">
				<FlippableCard/>
				{/* <div className="home_one">
				holi
				</div>
				<div className="home_dos">holi</div> */}
			</div>
			
			
		</div>
	)
}

export default Home;