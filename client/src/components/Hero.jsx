const Hero = () => {
  return (
    <header className="bg-gradient-to-r from-secondary via-[#1a0275] to-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary"></div>
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-3xl p-8 rounded-lg animate-fadeIn">
          <h1 className="text-5xl font-bold mb-4 text-white hover:scale-105 transition-all duration-300 animate-slideInLeft">
            Escuela Técnica Mariano Fernández Fortiquez
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed border-l-4 border-primary pl-4 animate-slideInRight">
            Formando los líderes del mañana con excelencia académica y valores
          </p>
        </div>
      </div>
    </header>
  );
};

export default Hero; 