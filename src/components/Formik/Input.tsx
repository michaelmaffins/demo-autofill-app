import { Form, FormControl } from 'react-bootstrap';
import styles from './Input.module.scss';

const InputFormik = (props: any) => {
  const { groupClassname, icon, errorIcon, onChange, touched, label, ...rest } =
    props;
  return (
    <Form.Group className={`${styles.formGroup}`}>
      {!!!rest.disabled && (
        <FormControl
          className={`rounded-0 shadow-none ${styles.formField} ${
            props.touched && props.error ? 'border-bottom border-danger' : ''
          }  ${props.disabled ? 'text-muted' : ''}`}
          placeholder={label || '...'}
          onChange={props.disabled ? () => {} : onChange}
          touched={touched?.toString()}
          {...rest}
        />
      )}
      <Form.Label
        htmlFor={props.id}
        className={`${styles.formLabel} ${
          props.touched && props.error && 'text-danger'
        }`}
      >
        {props.label}{' '}
        {props.touched && props.error && <span> - {props.error}</span>}
      </Form.Label>
      {rest.disabled && (
        <div className="text-start pt-1 text-muted">{rest.value}</div>
      )}
      {!!props.icon && (
        <div className={`${styles.iconPosition}`}>
          {props.touched && !!props.error ? errorIcon : icon}
        </div>
      )}
    </Form.Group>
  );
};

export default InputFormik;
