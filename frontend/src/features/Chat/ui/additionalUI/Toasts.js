import { toast } from 'react-toastify'
import i18next from '../../../../common/locales/i18n'
import 'react-toastify/dist/ReactToastify.css'

const connectionErrorToast = () => {
  toast.error(i18next.t('connectionError'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

const channelAddedToast = () => {
  toast.success(i18next.t('channelAdded'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

const channelEditedToast = () => {
  toast.success(i18next.t('channelEdited'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

const channelDeletedToast = () => {
  toast.success(i18next.t('channelDeleted'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

export { connectionErrorToast, channelAddedToast, channelEditedToast, channelDeletedToast }
