import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    description: "Carretera Nacional Villa de Cura, cruce con calle Sabana Larga, Cagua, Estado Aragua, Venezuela.",
    iconSize: "w-8 h-8", // Tamaño personalizado para MapPin
  },
  {
    icon: Phone,
    title: "Teléfono",
    description: "+58 424-1234567",
    iconSize: "w-6 h-6", // Tamaño estándar para los demás íconos
  },
  {
    icon: Mail,
    title: "Correo Electrónico",
    description: "gojer@orlandoascanio.com",
    iconSize: "w-6 h-6",
  },
  {
    icon: Clock,
    title: "Horario",
    description: "Lunes a Viernes: 7:00AM - 3:00PM",
    iconSize: "w-6 h-6",
  },
];

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#150261] mb-6">Información de Contacto</h2>
      <div className="space-y-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div key={index} className="flex items-center space-x-4">
              <Icon className={`${info.iconSize} text-[#C02E28]`} /> {/* Aplica el tamaño personalizado */}
              <div>
                <h3 className="font-semibold">{info.title}</h3>
                <p className="text-gray-600">{info.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;