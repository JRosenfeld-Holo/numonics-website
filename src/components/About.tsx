export default function About() {
  return (
    <section id="about" className="relative bg-surface overflow-hidden">
      <div className="flex flex-col md:flex-row items-stretch">

        {/* Text content — LEFT */}
        <div className="relative w-full md:w-1/2 py-16 px-6 md:py-24 md:px-12 flex flex-col justify-center brutalist-grid bg-surface order-last md:order-first">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-tr from-surface to-transparent" />
          <div className="relative z-10">
            <p className="text-sm font-bold tracking-[0.4em] uppercase text-primary mb-6 font-label">Background</p>
            <div className="relative">
              <div className="absolute -left-4 md:-left-6 top-0 w-1 h-full bg-primary" />
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-10 pl-2">
                Multi-Platinum Producer bound by no genre or limitations
              </h2>
              <div className="flex flex-col gap-8 pl-2">
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  Raised in South Florida and currently residing in Texas, Numonics is a dynamic Producer creating in multiple genres. Primarily known for hip hop, he has produced for the likes of Marlon Craft, Mo3, OG Bobby Billions, ¡Mayday!, Ras Kass, Planet Asia, Edo G, Reks, Termanology, Black Rob, and many more. Beyond Production, he has composed for the likes of A24, HBO, NBC, TNT, and Vice as well as supplying music for major events such as The Olympics, March Madness, Emmy&apos;s, and the Super Bowl. He has crafted music for commercials by Comcast, McDonald&apos;s and Toyota.
                </p>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  Outside of music, Numonics has done design work for NYU and K-Salaam, as well as editing and effects for videos featuring Conway the Machine, Jae Skeese, K-Salaam, Young Noble and Wrekonize. His career expands beyond the arts as a tenured Marketing professional who has worked with brands such as 10 Cane Rum, Crooks &amp; Castles, IBM, Microsoft, Twilio, and Workday.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video + photo composite — RIGHT */}
        <div className="relative w-full md:w-1/2 order-first md:order-last overflow-hidden shrink-0">
          <div className="relative w-full" style={{ paddingBottom: "115%" }}>

            {/* Background video */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/city-pingpong.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            {/* Edge blend mask */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to right,  var(--color-surface) 0%, transparent 30%, transparent 70%, var(--color-surface) 100%),
                  linear-gradient(to bottom, var(--color-surface) 0%, transparent 20%, transparent 80%, var(--color-surface) 100%)
                `,
              }}
            />

          </div>
        </div>

      </div>
    </section>
  );
}
