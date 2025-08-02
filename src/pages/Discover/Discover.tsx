import { defaultBookClubs } from "../../utils/bookClub";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ClubCard from "../../components/ClubCard";
import NavButton from "../../components/NavButton";
import ClubCarousel from "../../components/ClubCarousel";


export default function Discover() {
    return <>
        <Header />
        <div className="container my-5">
            <NavButton
                className="my-3"
                href="/create-club"
                label="Create New Group"    
            />

            <div className="section my-2">
                <h1 className="display-6 py-3">
                    Popular Clubs
                </h1>

                <ClubCarousel />
            </div>

            <div className="row g-3 my-5">
                <h2 className="display-6 py-3">
                    Book Clubs
                </h2>
                {defaultBookClubs.map((item, index) => (
                    <div key={index} className="col-md-4">
                        <ClubCard item={item} index={index} />
                    </div>
                ))}
            </div>
            
        </div>
        <Footer />
    </>
}