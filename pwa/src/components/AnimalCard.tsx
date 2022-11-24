import { HtmlHTMLAttributes, HTMLProps } from "react";
import Animal from "../models/animal.dto";

function AnimalCard({ id, name, intakeDate }: Animal): JSX.Element {
    return (
        <a href="#!">
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <img
                    src="https://dummyimage.com/300x300/fff/aaa"
                    className="rounded-t-lg"
                    alt="..."
                />
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
                    <p className="text-gray-700 text-base mb-4">
                        {"W schronisku od: " + intakeDate}
                    </p>
                </div>
            </div>
        </a>
    );
}

export default AnimalCard;
