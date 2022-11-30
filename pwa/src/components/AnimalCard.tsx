import { Link } from "react-router-dom";
import { backendBaseUrl } from "../utils/axiosInstance";
import Animal from "../models/animal.dto";

function AnimalCard({ id, name, intakeDate, highlightedImage }: Animal): JSX.Element {
    return (
        <Link to={`/animals/${id}`}>
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <img
                    src={highlightedImage ? backendBaseUrl + highlightedImage : "https://dummyimage.com/300x300/fff/aaa"}
                    className="rounded-t-lg mx-auto"
                    alt="..."
                />
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
                    <p className="text-gray-700 text-base mb-4">
                        {"W schronisku od: " + intakeDate}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default AnimalCard;
