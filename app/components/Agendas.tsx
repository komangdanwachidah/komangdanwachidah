const CALENDAR_URL = `https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MnEzNDRvNG9objVjaWo0NGhmbHYzc2pzajIgZjA3YTFmNTFmYWRiYjNmNWQ4ZjdiYzQyMmFmZTk4YmQ0M2I5NDNjMmI1NTJmZTUwODFhMWFmNmNmZDMyMTEwM0Bn&tmsrc=f07a1f51fadbb3f5d8f7bc422afe98bd43b943c2b552fe5081a1af6cfd321103%40group.calendar.google.com`;

const Agendas = () => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-4 text-gray-500 font-head md:text-lg font-medium">
        Pernikahan kami akan dilaksanakan pada:
      </div>
      <h3 className="text-3xl md:text-4xl font-black mb-6 text-cente text-gray-700 font-sans">
        SABTU, 6 JULI 2024
      </h3>
      <div className="px-12 flex max-w-md mx-auto mb-10">
        <a
          href={CALENDAR_URL}
          target={"_blank"}
          className="px-8 py-4 transition-all text-lg font-semibold w-full rounded-lg bg-contrast hover:bg-contrast-2 outline-contrast-3 text-white outline-4 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          rel="noreferrer"
        >
          Simpan di Kalender
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-2xl px-4 py-8 md:py-16 md:px-0 md:text-3xl font-black">
        <div className="col-span-1 text-gray-400 text-left md:text-center font-sans">
          AKAD NIKAH
        </div>
        <div className="col-span-1 text-gray-700 text-right md:text-center font-sans">
          09.00 WIB
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-2xl px-4 py-8 md:py-16 md:px-0 md:text-3xl  font-black">
        <div className="col-span-1 text-gray-400 text-left md:text-center font-sans">
          RESEPSI
        </div>
        <div className="col-span-1 text-gray-700 text-right md:text-center font-sans">
          13.00 - 21.00 WIB
        </div>
      </div>
    </div>
  );
};

export default Agendas;
