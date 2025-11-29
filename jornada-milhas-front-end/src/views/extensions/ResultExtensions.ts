import Swal from 'sweetalert2';
import ResultBase from '../../core/result/ResultBase';
export default class ResultExtensions{



    public static fireSwalError(resultBase: ResultBase): void{

        Swal.fire({
            icon: "error",
            title: resultBase.error.title,
            text: resultBase.error.message,
            confirmButtonText: 'Ok',
            animation: true
        })
    }
}