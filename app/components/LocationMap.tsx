import SectionWrapper from "./Utils/SectionWrapper";

const MAP_EMBEDED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.732553219635!2d112.7272933!3d-7.2712447000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbe334895edf%3A0xb9f6e9b0cc4b72f2!2sJl.%20Kupang%20Krajan%20Tengah%20No.15%2C%20RT.006%2FRW.03%2C%20Kupang%20Krajan%2C%20Kec.%20Sawahan%2C%20Surabaya%2C%20Jawa%20Timur%2060253!5e0!3m2!1sen!2sid!4v1718203299929!5m2!1sen!2sid";
const MAP_REDIRECT_URL =
  "https://www.google.com/maps/place/Jl.+Kupang+Krajan+Tengah+No.15,+RT.006%2FRW.03,+Kupang+Krajan,+Kec.+Sawahan,+Surabaya,+Jawa+Timur+60253/@-7.2712447,112.7272933,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fbe334895edf:0xb9f6e9b0cc4b72f2!8m2!3d-7.2712447!4d112.7272933!16s%2Fg%2F11l371fgs3?entry=ttu";

const MAP_TITLE = "Balai Gotong Royong";
const MAP_ADDRESS =
  "JL Kupang Krajan Tengah 15c, kel KUPANG KRAJAN, kec SAWAHAN, Surabaya, Jatim 60253";

const LocationMap = () => {
  return (
    <div className="py-10 bg-[#EFEFEF]">
      <SectionWrapper>
        <div className="flex flex-col-reverse md:flex-row">
          <div className="w-full px-4 md:w-1/2">
            <div className="p-2 bg-white rounded-lg shadow-lg">
              <iframe
                src={MAP_EMBEDED_URL}
                className="w-full h-[580px] md:h-[450px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={MAP_TITLE}
                scrolling="no"
                aria-label={MAP_TITLE}
              />
            </div>
          </div>

          <div className="md:w-1/2 w-full px-4 mb-6 md:mb-0">
            <div className="sticky top-8 text-center md:text-left">
              <h3 className="text-3xl font-head font-bold mb-3 text-gray-700">
                Lokasi Akad:
              </h3>
              <h4 className="text-xl md:text-2xl mb-4 font-sans font-semibold text-gray-700">
                MASJID BAITUL MURSYIDIN KUPANG KRAJAN TENGAH No 03 SURABAYA
              </h4>
              <h3 className="text-3xl font-head font-bold mb-3 text-gray-700">
                Lokasi Resepsi:
              </h3>
              <h4 className="text-xl md:text-2xl mb-4 font-sans font-semibold text-gray-700">
                {MAP_TITLE}
              </h4>
              <p className="mb-16 md:mb-10 font-sans">{MAP_ADDRESS}</p>
              <div className="flex md:justify-start justify-center">
                <a
                  href={MAP_REDIRECT_URL}
                  target="_blank"
                  className="px-5 py-2 transition-all text-lg font-semibold rounded-md bg-contrast hover:bg-contrast-2 outline-contrast-3 text-white outline-4 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  rel="noreferrer"
                >
                  Buka Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default LocationMap;
