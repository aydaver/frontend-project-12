import Channels from './Channels'
import ExitButton from './additionalUI/ExitButton'
import { ToastContainer } from 'react-toastify'
import CommonHeader from '../../../common/ui/CommonHeader'

const Chat = () => (
  <div className="h-100">
    <CommonHeader><ExitButton /></CommonHeader>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
      <Channels />
    </div>
  </div>
)

export default Chat
