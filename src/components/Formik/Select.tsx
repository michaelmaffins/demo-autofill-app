import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { AiFillCaretDown } from 'react-icons/ai';

import styles from './Select.module.scss';
import { isMobile } from 'react-device-detect';

const SelectFormik = (props: any) => {
  const { groupClassname, ...rest } = props;
  const menuItemOnClick = (value: string) => {
    props.onChange({ target: { name: props.id, value } });
  };
  const popover = (
    <Popover
      id={`popover-${props.id}`}
      className={`w-100 rounded-1 menuItemContainer`}
    >
      {props.options && (
        <Popover.Body
          className={`px-0 ${
            isMobile ? styles.mobileScrolablePopup : styles.scrolablePopup
          }`}
        >
          {props.options.map((opt: any, idx: number) => {
            return (
              <div
                key={`menuItem-${props.id}-${idx}`}
                className={`py-2 px-3 ${styles.menuItem}`}
                onClick={() => menuItemOnClick(opt.value)}
              >
                {opt.text}
              </div>
            );
          })}
        </Popover.Body>
      )}
    </Popover>
  );

  return (
    <OverlayTrigger
      delay={100}
      trigger="focus"
      placement="bottom-start"
      overlay={popover}
      flip
    >
      <Form.Group className={`${styles.formGroup}`}>
        <div>
          <input
            readOnly
            autoComplete="off"
            className={`${styles.formField} ${
              props.error ? 'border-bottom border-danger' : ''
            }`}
            placeholder={props.label || '...'}
            {...rest}
          />

          <Form.Label
            htmlFor={props.id}
            className={`${styles.formLabel} ${props.error && 'text-danger'}`}
          >
            {props.label} {props.error && <span> - {props.error}</span>}
          </Form.Label>
          <Form.Label htmlFor={props.id}>
            <AiFillCaretDown
              className={`text-secondary ${styles.caretDownPosition}`}
            />
          </Form.Label>
        </div>
      </Form.Group>
    </OverlayTrigger>
  );
};

export default SelectFormik;
