import { useToast } from "primevue/usetoast";

export default function useNotification() {
    const toast = useToast();
    const showToast = (severity: string, message: string) => {
        toast.add({
            severity: severity,
            summary: 'Thông báo',
            detail: message,
            life: 2000
        });
    }

    return {
        showMessage: (message: string) => {
            showToast('success', message);
        },
        showError: (message: string) => {
            showToast('error', message);
        }
    }
}
