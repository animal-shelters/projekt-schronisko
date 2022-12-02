import { Link } from "react-router-dom";
import { backendBaseUrl } from "../utils/axiosInstance";
import Animal from "../models/animal.dto";

function AnimalCard({ id, species, breed, name, birthDate, intakeDate, description, highlightedImage }: Animal): JSX.Element {
    return (

        <div className="rounded-lg shadow-lg bg-white max-w-sm relative">
            <span className="absolute right-3 mt-2">
                <Link to={`/admin_panel/edit_animal/${id}`} state={{
                    id,
                    species,
                    breed,
                    name,
                    birthDate,
                    intakeDate,
                    description,
                    highlightedImage
                }}>
                    <i onClick={() => console.log("edit test")} className="fa-solid fa-pen-to-square fa-2x"></i>
                </Link>
            </span>
            <Link to={`/animals/${id}`}>
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
            </Link>
        </div>
    );
}

export default AnimalCard;
