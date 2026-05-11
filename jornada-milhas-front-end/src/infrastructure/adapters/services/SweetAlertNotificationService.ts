import Swal from "sweetalert2";
import type { ConfirmOptions, INotificationService, NotificationOptions } from "../../../application/interfaces/services/INotificationService";

export default class SweetAlertNotificationService implements INotificationService {
    
    async show(options: NotificationOptions): Promise<void> {
        await Swal.fire({
            title: options.title,
            text: options.message,
            icon: options.type,
            timer: options.duration,
            confirmButtonText: 'OK',
            confirmButtonColor: '#7c3aed'
        });
    }

    async showInfo(message: string, title?: string): Promise<void> {
        await Swal.fire({
            title,
            text: message,
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: '#7c3aed'
        });
    }


    async showSuccess(message: string, title: string = 'Sucesso!'): Promise<void> {
        await Swal.fire({
            title,
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#7c3aed'
        });
    }

    async showError(message: string, title: string = 'Erro!'): Promise<void> {
        await Swal.fire({
            title,
            text: message,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#7c3aed'
        });
    }

    async showWarning(message: string, title: string = 'Atenção!'): Promise<void> {
        await Swal.fire({
            title,
            text: message,
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#7c3aed'
        });
    }

    async confirm(options: ConfirmOptions): Promise<boolean> {
        const result = await Swal.fire({
            title: options.title || 'Confirmar?',
            text: options.message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: options.confirmText || 'Sim',
            cancelButtonText: options.cancelText || 'Não',
            confirmButtonColor: '#7c3aed',
            cancelButtonColor: '#6b7280'
        });

        return result.isConfirmed;
    }

}