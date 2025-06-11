const CourseDetails = ({ isOpen, course }) => {
  if (!isOpen) return null;

  return (
    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 animate-slideDown">
      {course.duration && (
        <div className="mb-4">
          <h4 className="font-semibold text-[#150261] mb-2">Duración</h4>
          <p className="text-gray-600">{course.duration}</p>
        </div>
      )}

      {course.curriculum && course.curriculum.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-[#150261] mb-2">Plan de Estudios</h4>
          <ul className="list-disc list-inside text-gray-600">
            {course.curriculum.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {course.subjects && course.subjects.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-[#150261] mb-2">Materias</h4>
          <ul className="list-disc list-inside text-gray-600">
            {course.subjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        </div>
      )}

      {course.requirements && course.requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-[#150261] mb-2">Requisitos</h4>
          <ul className="list-disc list-inside text-gray-600">
            {course.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {course.objectives && course.objectives.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-[#150261] mb-2">Objetivos</h4>
          <ul className="list-disc list-inside text-gray-600">
            {course.objectives.map((obj, index) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;