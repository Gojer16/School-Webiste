import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-t-4 border-[#C02E28]">
        <div className="w-12 h-12 bg-gradient-to-r from-[#150261] to-[#1a0275] rounded-lg flex items-center justify-center mb-4">
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-[#150261]">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;