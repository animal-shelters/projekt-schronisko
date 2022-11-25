import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Animal from "../models/animal.dto";
import axiosInstance from "../utils/axiosInstance";

function AnimalDetailsPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [animal, setAnimal] = useState<Animal | null>(null);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get(`animals/${id}`)
            .then((response) => {
                setAnimal(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [])


    return (
        <>
            {isLoading
                ? <Spinner />
                :
                <div className="container mx-auto">
                    {animal
                        ? <>
                            <h1 className="text-3xl font-bold text-center mt-16">{animal.name}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mt-16 items-center">
                                <div>
                                    {animal.description}
                                    <table className="mt-10 w-full border">
                                        <tbody className="border">
                                            <tr className="border">
                                                <th>Data urodzenia</th>
                                                <td>{animal.birthDate.toString()}</td>
                                            </tr>
                                            <tr className="border">
                                                <th>Data przyjęcia do schroniska</th>
                                                <td>{animal.intakeDate.toString()}</td>
                                            </tr>
                                            <tr className="border">
                                                <th>Gatunek</th>
                                                <td>{animal.breed}</td>
                                            </tr>
                                            <tr className="border">
                                                <th>Rasa</th>
                                                <td>{animal.species}</td>
                                            </tr>
                                            <tr className="border">
                                                <th>Numer</th>
                                                <td>{animal.id}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <img
                                    src="https://dummyimage.com/300x300/fff/aaa"
                                    alt="..."
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-16 items-center">
                                <img
                                    src="https://dummyimage.com/300x300/fff/aaa"
                                    alt="..."
                                />
                                <img
                                    src="https://dummyimage.com/300x300/fff/aaa"
                                    alt="..."
                                />
                                <img
                                    src="https://dummyimage.com/300x300/fff/aaa"
                                    alt="..."
                                />
                            </div>
                        </>
                        : <h1 className="text-3xl font-bold text-center mt-16">Nie znaleziono zwierzęcia</h1>}

                </div>
            }
        </>
    );
}

export default AnimalDetailsPage;
