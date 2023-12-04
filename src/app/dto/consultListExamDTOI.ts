import { Consult } from "../model/consult";
import { Exam } from "../model/exam";

export interface ConsultListExamDTOI{
    //Plantilla de Objeto
    consult: Consult;
    lstExam: Exam[];
}