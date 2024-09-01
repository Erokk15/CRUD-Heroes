import Swal from 'sweetalert2';
import WithReactContent from 'sweetalert2-react-content';

export function show_alert(msg, icon, foco) {
    onfocus(foco);
    const MySwal = WithReactContent(Swal);
    MySwal.fire({
        icon: icon,
        title: msg,
    });
}

function onfocus(foco) {
    if (foco !== '') {
        document.gerElementById(foco).focus();
    }
}