function Spinner() {
    return (
        <div className="absolute w-full h-full">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                <span className="visually-hidden">Ładowanie...</span>
            </div>
        </div>
    );
}

export default Spinner;
