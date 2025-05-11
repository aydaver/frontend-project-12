import i18next from "../../../../common/locales/i18n"
import {
    Field, ErrorMessage as Error,
} from 'formik'

const PasswordConfirm = (props) => {
  const { type } = props

  return type === 'signup'
    ? (
      <div className="form-group mb-4">
        <label htmlFor="passwordCheck" className="w-100">
          {i18next.t('passwordConfirmFormTitle')}
          <Field id="passwordCheck" type="password" name="passwordCheck" className="form-control" />
        </label>
        <Error name="passwordCheck">{error => <span className="text-danger">{error}</span>}</Error>
      </div>
      )
    : null
}

export default PasswordConfirm
