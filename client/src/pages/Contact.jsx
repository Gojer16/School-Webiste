import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#150261]/5 via-white to-[#C02E28]/5 py-16 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Contact Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#C02E28] group">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#150261] to-[#1a0275] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Phone className="text-white" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-[#150261]">Teléfono</h3>
                            <p className="text-gray-600">+58 424-3440659</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#C02E28] group">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#150261] to-[#1a0275] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Mail className="text-white" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-[#150261]">Email</h3>
                            <p className="text-gray-600">gojer@orlandoascanio.com</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#C02E28] group">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#150261] to-[#1a0275] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <MapPin className="text-white" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-[#150261]">Dirección</h3>
                            <p className="text-gray-600">Carretera Nacional Villa de Cura, cruce con calle Sabana Larga, Cagua, Estado Aragua, Venezuela.</p>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden relative group">
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-[#150261]/20 to-[#C02E28]/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-[#C02E28]/20 to-[#150261]/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;