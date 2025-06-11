import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PROGRAMS } from '../constants/programs';
import CourseDetails from '../components/CourseDetails';

const Programs = () => {
  const [expandedProgram, setExpandedProgram] = useState(null);

  const handleProgramClick = (index) => {
    setExpandedProgram(expandedProgram === index ? null : index);
  };

  return (
    <div className="py-16 bg-gradient-to-br from-secondary/10 via-white to-primary/10 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-secondary mb-12 text-center hover:scale-105 transition-transform duration-300 animate-fadeIn">
          Nuestros Programas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROGRAMS.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProgramClick(index)}
              >
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-xl border-t-4 border-t-primary transition-all duration-300 hover:scale-105 group hover:bg-gradient-to-b hover:from-white hover:to-[#f0f8ff]">
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-gradient-to-br from-secondary/10 to-secondary/20 mb-4 group-hover:from-secondary/20 group-hover:to-secondary/30 transition-all duration-300">
                      <Icon className="w-12 h-12 text-primary transform group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center bg-gradient-to-r from-secondary to-[#1a0275] bg-clip-text text-transparent group-hover:from-[#1a0275] group-hover:to-secondary transition-all duration-300">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">
                    {program.description}
                  </p>
                  <div className="flex justify-center mt-4">
                    {expandedProgram === index ? (
                      <ChevronUp className="w-6 h-6 text-primary cursor-pointer" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-primary cursor-pointer" />
                    )}
                  </div>
                </div>
                <CourseDetails isOpen={expandedProgram === index} course={program} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Programs;
