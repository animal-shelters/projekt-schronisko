import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import TD from "../components/tables/TD";
import TH from "../components/tables/TH";
import TR from "../components/tables/TR";
import Adoption, { AdoptionDto, mapAdoption } from "../models/adoption.dto";
import axiosInstance from "../utils/axiosInstance";
import useToken from "../utils/useToken";

function Adoptions(): JSX.Element {
    const [adoptions, setAdoptions] = useState<Array<Adoption>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useToken();

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get("adoptions", { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                console.log(response.data["hydra:member"]);
                setAdoptions(Array.from(response.data["hydra:member"].map((adoption: AdoptionDto) => {
                    return mapAdoption(adoption);
                })));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return (
            <Spinner />
        )
    }
    if (!adoptions.length) {
        return (
            <div>
                Brak adopcji do wyświetlenia
            </div>
        )
    }
    return (
        <div>
            <table className="min-w-full">
                <thead className="bg-white border-b">
                    <tr>
                        <TH scope="col">Nr</TH>
                        <TH scope="col">Data adopcji</TH>
                        <TH scope="col">Imię zwierzęcia</TH>
                        <TH scope="col">Klient</TH>
                        <TH scope="col">Edycja</TH>
                    </tr>
                </thead>
                <tbody>
                    {adoptions.map((adoption, index) => {
                        return (
                            <TR key={index}>
                                <TD>{index.toString()}</TD>
                                <TD>{adoption.date.toString()}</TD>
                                <TD>
                                    <Link to={`/animals/${adoption.animal.id}`}>
                                        {adoption.animal.name}
                                    </Link>
                                </TD>
                                <TD>
                                    <Link to={`/users/${adoption.user.id}`}>
                                        {adoption.user.email}
                                    </Link>
                                </TD>
                                <TD>
                                    <Link to={`/admin_panel/edit_adoption/${adoption.adoptionId}`} state={{ adoption: adoption }}>
                                        <i className="fa-solid fa-pen-to-square fa-xl"></i>
                                    </Link>
                                </TD>
                            </TR>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Adoptions;
