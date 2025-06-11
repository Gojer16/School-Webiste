import { motion, AnimatePresence } from 'framer-motion';

const dropIn = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: 'easeIn'
    }
  }
};

const CourseDetails = ({ isOpen, course }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mt-4 overflow-hidden"
        >
          <div className="bg-gradient-to-b from-white via-[#f9f9f9] to-[#f1f1f1] rounded-xl border border-gray-200 shadow-inner p-6 space-y-6">
            {course.duration && (
              <div>
                <h4 className="font-semibold text-secondary text-lg mb-1">📆 Duración</h4>
                <p className="text-gray-700">{course.duration}</p>
              </div>
            )}

            {course.curriculum?.length > 0 && (
              <div>
                <h4 className="font-semibold text-secondary text-lg mb-1">📘 Plan de Estudios</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {course.curriculum.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {course.subjects?.length > 0 && (
              <div>
                <h4 className="font-semibold text-secondary text-lg mb-1">📚 Materias</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {course.subjects.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </div>
            )}

            {course.requirements?.length > 0 && (
              <div>
                <h4 className="font-semibold text-secondary text-lg mb-1">✅ Requisitos</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {course.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {course.objectives?.length > 0 && (
              <div>
                <h4 className="font-semibold text-secondary text-lg mb-1">🎯 Objetivos</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {course.objectives.map((obj, index) => (
                    <li key={index}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CourseDetails;
