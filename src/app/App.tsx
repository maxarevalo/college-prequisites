import {  useState } from "react";
import classNames from "classnames";


interface Subject {
  name: string;
  code: string;
  required: string[];
  semester: number;
  year: number;
}

const subjectList: Subject[] = [
  { name: "Introducción a la Psicología", code: "001", required: [], semester: 1, year: 1 },
  { name: "Filosofía del Hombre", code: "041", required: [], semester: 1, year: 1 },
  { name: "Epistemología General", code: "042", required: [], semester: 1, year: 1 },
  { name: "G.R.A.P. I", code: "007", required: [], semester: 1, year: 1 },
  { name: "Historia Social de la Psicología", code: "043", required: [], semester: 2, year: 1 },
  { name: "Antropología", code: "044", required: [], semester: 2, year: 1 },
  { name: "Biología Humana", code: "013", required: [], semester: 2, year: 1 },
  { name: "Introducción a la Investigación Psicológica", code: "045", required: [], semester: 2, year: 1 },
  { name: "G.R.A.P. I", code: "007", required: [], semester: 2, year: 1 },
  { name: "PEPP", code: "184", required: [], semester: 2, year: 1 },
  { name: "Sociología", code: "047", required: [], semester: 1, year: 2 },
  { name: "Sistemas Psicológicos Contemporáneos I", code: "046", required: ["001", "041", "042", "043"], semester: 1, year: 2 },
  { name: "Introducción a la Teoría Psicoanalítica", code: "048", required: ["001", "043"], semester: 1, year: 2 },
  { name: "Núcleos Problemáticos", code: "049", required: ["042", "045"], semester: 1, year: 2 },
  { name: "Psicología del Desarrollo", code: "050", required: ["001", "013"], semester: 1, year: 2 },
  { name: "G.R.A.P. II", code: "014", required: ["001", "007"], semester: 1, year: 2 },
  { name: "Psicología del Desarrollo", code: "050", required: [], semester: 2, year: 2 },
  { name: "Sistemas Psicológicos Contemporáneos II", code: "051", required: ["046"], semester: 2, year: 2 },
  { name: "Problemas Sociales Latinoamericanos", code: "052", required: ["044", "047"], semester: 2, year: 2 },
  { name: "Neuropsicología", code: "020", required: ["001", "013"], semester: 2, year: 2 },
  { name: "G.R.A.P. II", code: "014", required: ["001", "007"], semester: 2, year: 2 },
  { name: "PEPP", code: "185", required: ["184"], semester: 2, year: 2 },
  { name: "Teorías del Aprendizaje", code: "010", required: ["001", "050"], semester: 1, year: 3 },
  { name: "Estrategias cualitativas y cuantitativas en Investigación Psicológica", code: "053", required: ["001", "042", "045"], semester: 1, year: 3 },
  { name: "Psicología Social", code: "019", required: ["001", "044", "047"], semester: 1, year: 3 },
  { name: "Psicología Cognitiva", code: "054", required: ["001", "020"], semester: 1, year: 3 },
  { name: "G.R.A.P. III", code: "021", required: ["014", "048"], semester: 1, year: 3 },
  { name: "Desarrollos del Psicoanálisis", code: "015", required: ["048"], semester: 2, year: 3 },
  { name: "Instrumentos de Exploración Psicológica I", code: "056", required: ["010", "046", "053", "054"], semester: 2, year: 3 },
  { name: "Psicología de los Grupos", code: "057", required: ["019", "048"], semester: 2, year: 3 },
  { name: "Instrumentos de Exploración Psicológica II", code: "058", required: ["046", "048", "053"], semester: 2, year: 3 },
  { name: "Núcleos Problemáticos 2", code: "059", required: ["049", "053"], semester: 2, year: 3 },
  { name: "G.R.A.P. III", code: "021", required: ["014", "048"], semester: 2, year: 3 },
  { name: "PEPP", code: "186", required: ["185"], semester: 2, year: 3 },
  { name: "Psicopatología", code: "182", required: ["051", "020", "054", "015"], semester: 1, year: 4 },
  { name: "Psicología Institucional y Comunitaria", code: "061", required: ["051", "052", "057"], semester: 1, year: 4 },
  { name: "Epistemología de la Psicología", code: "027", required: ["051", "053"], semester: 1, year: 4 },
  { name: "Psicodiagnóstico", code: "183", required: ["056", "058"], semester: 1, year: 4 },
  { name: "G.R.A.P. IV", code: "028", required: ["021", "052", "057"], semester: 1, year: 4 },
  { name: "PEPP", code: "187", required: ["186"], semester: 1, year: 4 },
  { name: "Psicología Clínica", code: "063", required: ["182", "061", "183", "187"], semester: 2, year: 4 },
  { name: "Psicología Jurídica", code: "064", required: ["182", "061", "183", "187"], semester: 2, year: 4 },
  { name: "Psicología Educacional", code: "065", required: ["182", "061", "183", "187"], semester: 2, year: 4 },
  { name: "Psicología Laboral", code: "066", required: ["182", "061", "183", "187"], semester: 2, year: 4 },
  { name: "G.R.A.P. IV", code: "028", required: ["021", "052", "057"], semester: 2, year: 4 },
  { name: "Psicología Jurídica", code: "064", required: [], semester: 1, year: 5 },
  { name: "Psicología Clínica", code: "063", required: [], semester: 1, year: 5 },
  { name: "Psicología Jurídica", code: "064", required: [], semester: 1, year: 5 },
  { name: "Psicología Educacional", code: "065", required: [], semester: 1, year: 5 },
  { name: "Psicología Laboral", code: "066", required: [], semester: 1, year: 5 },
  { name: "Deontología Psicológica", code: "062", required: ["051"], semester: 1, year: 5 },
  { name: "Seminarios de Orientación 1", code: "067", required: ["063", "064", "065", "066"], semester: 2, year: 5 },
  { name: "Seminarios de Orientación 2", code: "068", required: ["063", "064", "065", "066"], semester: 2, year: 5 },
  { name: "Seminarios de Orientación 3", code: "069", required: ["063", "064", "065", "066"], semester: 2, year: 5 },
  { name: "Residencia", code: "070", required: [], semester: 2, year: 5 }
];

enum Status {
  SELECTED = "selected",
  REQUIRED = "required",
  NONE = "none",
}



interface BoxProps {
  title: string;
  status?: Status;
  onClick: () => void;
}

const Box = ({ title, status = Status.NONE, onClick }: BoxProps) => {
  return (
    <div
      onClick={() => onClick()}
      className={classNames(
        "w-full border hover:border-2 rounded text-center m-1 p-2 text-black",
        {
          "bg-red-300": status === Status.REQUIRED,
          "bg-green-300": status === Status.SELECTED,
          "bg-white": status === Status.NONE,
        }
      )}
    >
      {title}
    </div>
  );
};

interface SemesterBoxProps {
  semester: number
  year: number
}

const getStatus = (code: string, requiredList: string[], selected: string) => {
  const status = code === selected
    ? Status.SELECTED
    : requiredList.includes(code)
      ? Status.REQUIRED
      : Status.NONE;
  return status
}

export default function App() {
  const [requiredList, setRequiredList] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");

  const findSubjectByCode = (
    code: string,
    subjects: Subject[]
  ): Subject | undefined => {
    return subjects.find((subject) => subject.code === code);
  };

  const getAllRequiredSubjects = (
    code: string,
    subjects: Subject[]
  ): string[] => {
    const subject = findSubjectByCode(code, subjects);
    if (!subject) return [];

    const requiredSubjects: string[] = [];

    const traverseRequirements = (codes: string[]) => {
      for (const code of codes) {
        if (!requiredSubjects.includes(code)) {
          requiredSubjects.push(code);
          const subSubject = findSubjectByCode(code, subjects);
          if (subSubject) {
            traverseRequirements(subSubject.required);
          }
        }
      }
    };

    traverseRequirements(subject.required);

    return requiredSubjects;
  };
  const handleOnClickItem = (code: string) => {
    setSelected(code);
    const requiredSubjects = getAllRequiredSubjects(code, subjectList);
    setRequiredList(requiredSubjects);
  };




  const SemesterBox = ({ semester, year }: SemesterBoxProps) => {
    const filteredList = subjectList.filter(subject => subject.semester === semester && subject.year === year)

    return <div className='w-full px-3'>
      {filteredList.map((subject) => {

        return (
          <div className='w-full' key={subject.code}>
            <Box
              title={subject.name}
              status={getStatus(subject.code, requiredList, selected)}
              onClick={() => handleOnClickItem(subject.code)}
            />
          </div>
        );
      })}
    </div>;
  };


  return (
    <>
      <div className='w-full'>
        <p className='text-center my-2'>Primer Año</p>
        <div className="flex flex-row w-full">
          <SemesterBox year={1} semester={1} />
          <SemesterBox year={1} semester={2} />
        </div>
      </div>
      <div className='w-full'>
        <p className='text-center my-2 '>Segundo Año</p>
        <div className="flex flex-row">
          <SemesterBox year={2} semester={1} />
          <SemesterBox year={2} semester={2} />
        </div>
      </div>
      <div className='w-full'>
        <p className='text-center my-2'>Tercer Año</p>
        <div className="flex flex-row w-full">
          <SemesterBox year={3} semester={1} />
          <SemesterBox year={3} semester={2} />
        </div>
      </div>

      <div className='w-full'>
        <p className='text-center my-2'>Cuarto Año</p>
        <div className="flex flex-row w-full">
          <SemesterBox year={4} semester={1} />
          <SemesterBox year={4} semester={2} />
        </div>
      </div>
      <div className='w-full'>
        <p className='text-center my-2'>Quinto Año</p>
        <div className="flex flex-row w-full">
          <SemesterBox year={5} semester={1} />
          <SemesterBox year={5} semester={2} />
        </div>
      </div>







    </>
  );
}
