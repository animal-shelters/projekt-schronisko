import axios from "axios";
import { FormEvent } from "react";

function Registration(): JSX.Element {
	const handleRegistration = (event: FormEvent) => {
		event.preventDefault();
    axios.get("https://localhost/animals?page=1", { headers: { accept: "application/json" } }).then((response) => {
      console.log(response.data);
    });
		console.log(event)
	}

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <form onSubmit={handleRegistration} className="space-y-4 md:space-y-6">
        <label>
          Email:
          <input type="email" name="email"/>
        </label>
        <label>
          Hasło:
          <input type="password" name="password"/>
        </label>
        <label>
          Potwierdź hasło:
          <input type="password" name="password-confirmation"/>
        </label>
				<button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
}

export default Registration;
