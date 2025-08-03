import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ClubCard from "../../components/ClubCard";
import NavButton from "../../components/NavButton";
import ClubCarousel from "../../components/ClubCarousel";
import useClubData from "../../hooks/useClubData";

export default function Discover() {

    const { clubs, loading } = useClubData();
    
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
                <h2 className="display-6 py-3">Book Clubs</h2>

                {loading ? (
                    <div className="text-center py-5">
                    <div className="spinner-border text-primary mb-2" role="status" />
                    <p>📚 Fetching awesome book clubs for you...</p>
                    </div>
                ) : clubs && clubs.length > 0 ? (
                    clubs.map((item, index) => (
                    <div key={item.id || index} className="col-md-4">
                        <ClubCard item={item} index={index} />
                    </div>
                    ))
                ) : (
                    <p className="text-muted">No book clubs available right now.</p>
                )}
            </div>
        </div>
        <Footer />
    </>
}