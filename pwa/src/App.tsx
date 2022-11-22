import "./App.css";

function App() {
  return (
    <div className="App">
      <div
        id="carouselExampleCaptions"
        className="carousel slide carousel-fade carousel-dark relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner relative w-full overflow-hidden">
          <div className="carousel-item active relative float-left w-full">
            <img
              src="https://placekitten.com/1920/800"
              className="block w-full"
              alt="..."
            />
            <div className="carousel-caption hidden md:block absolute text-center"></div>
          </div>
          <div className="carousel-item relative float-left w-full">
            <img
              src="https://loremflickr.com/1920/800"
              className="block w-full"
              alt="..."
            />
            <div className="carousel-caption hidden md:block absolute text-center"></div>
          </div>
          <div className="carousel-item relative float-left w-full">
            <img
              src="https://loremflickr.com/1920/800"
              className="block w-full"
              alt="..."
            />
            <div className="carousel-caption hidden md:block absolute text-center"></div>
          </div>
        </div>
      </div>
      <div className="w-3/5 mx-auto mt-16 border-b border-gray-100 pb-8">
        <h2>Nowi w schronisku</h2>
        <div className="flex mt-5 justify-center gap-8">
          <img
            src="https://dummyimage.com/300x300/fff/aaa"
            className="inline-block border border-gray-400"
            alt="..."
          />
          <img
            src="https://dummyimage.com/300x300/fff/aaa"
            className="inline-block border border-gray-400"
            alt="..."
          />
          <img
            src="https://dummyimage.com/300x300/fff/aaa"
            className="inline-block border border-gray-400"
            alt="..."
          />
        </div>
        <button className="mt-5 inline-block px-6 py-2.5 border border-blue-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:text-white focus:outline-none focus:ring-0 active:bg-blue-800 active:text-white active:shadow-lg transition duration-150 ease-in-out">
          Wszystkie zwierzęta
        </button>
      </div>
      <div className="w-3/5 mx-auto mt-8 pb-8 border-b border-gray-100">
        <h2>O schronisku</h2>
        <div className="w-3/5 mx-auto">
          <ul className="list-disc text-left mt-5">
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              pulvinar, sapien varius euismod ornare, nibh justo pharetra
              lectus, vitae imperdiet nibh magna ac urna. Maecenas cursus
              pulvinar nibh eu congue. Vestibulum ornare auctor nisl. Donec a
              pellentesque tortor. Morbi congue rutrum tellus in commodo. Sed
              malesuada lacinia arcu vel accumsan. Nam eget lorem ultricies,
              pulvinar est ultrices, condimentum odio. Morbi lobortis dolor eget
              lacus tempus, id porta felis semper.
            </li>
            <br />
            <li>
              Ut mattis nulla mi, a luctus augue porttitor eu. Donec luctus
              risus non mattis aliquam. Vivamus accumsan tempor enim vel varius.
              Quisque viverra, dui id efficitur viverra, odio magna tempus ex,
              ac ultrices neque massa eu purus. Cras ut egestas ante, quis
              faucibus neque. Nulla facilisi. Nulla vel commodo lacus, eu
              suscipit odio. Aenean efficitur mauris lorem, ac imperdiet ante
              mollis vel. Donec quis tortor vel justo porttitor semper vitae a
              lectus. Sed gravida congue congue.
            </li>
          </ul>
        </div>
      </div>
      <div className="w-3/5 mx-auto mt-8 pb-8 border-b border-gray-100">
        <h2>Kontakt</h2>
        <div className="flex w-3/5 mx-auto gap-8 mt-5">
          <div className="my-auto flex-1">
            <span>Schronisko dla bezdomnych zwierząt w Monako</span><br /><br />
            <span>ul. Zwierzęca 420</span><br />
            <span>11-111 Monako</span><br /><br />
            <span>NIP 3212321232</span><br />
            <span>KRS 00000123123</span><br />
            <span>temp@mail.com</span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.14246872506!2d-17.029222584439378!3d32.78848149070716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605b496dd35b2d%3A0x71dfd8c78eaf124f!2sS%C3%A3o%20Vicente%2C%20Portugalia!5e0!3m2!1spl!2spl!4v1667839435614!5m2!1spl!2spl"
            width="2000"
            height="400"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
            className="flex-1"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default App;
