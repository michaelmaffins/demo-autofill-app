import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import InputFormik from './components/Formik/Input';
import SelectFormik from './components/Formik/Select';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  businessValidationSchema,
  privateValidationSchema
} from './validation/form.validate';
import PaymentOptions from './components/PaymentOptions';
import AutofillV2 from './projects/autofillV2';
import TestForm from './projects/autofillV2/Test';

const buyersTypeOpt = [
  { text: 'Private', value: 'private' },
  { text: 'Business', value: 'business' }
];

export const initPrivFormValues = {
  email: '',
  postcode: '',
  firstname: '',
  lastname: '',
  address: '',
  city: '',
  tel: ''
};

function App() {
  // return <AutofillV2 />;
  const buyerStr = localStorage.getItem('buyer');
  const buyerParsed = !!buyerStr ? JSON.parse(buyerStr) : null;

  const privFormRef = useRef<HTMLFormElement | null>(null);
  const corpFormRef = useRef<HTMLFormElement | null>(null);
  const [buyerType, setBuyerType] = useState<string>(
    localStorage.getItem('buyerType') || 'private'
  );

  const [editMode, setEditMode] = useState<boolean>(true);
  const [selectedPayment, setSelectedPayment] = useState<string>('swish');

  const handleBuyerType = (type: string) => {
    setBuyerType(type);
  };

  useEffect(() => {
    localStorage.setItem('buyerType', buyerType);
  }, [buyerType]);

  const handleDeleteBuyer = () => {
    localStorage.removeItem('buyer');
    privFormRef.current && privFormRef.current.reset();
    // corpFormRef.current && corpFormRef.current.reset();
    // window.location.reload();
  };

  return <TestForm />;
  return <AutofillV2 />;

  return (
    <Form noValidate>
      Name: <input type="text" name="name" placeholder="Name" />
      <br />
      Address: <input type="text" name="address" placeholder="Address" />
      <br />
      City: <input type="text" name="city" placeholder="City" />
      <br />
      State:{' '}
      <select name="state">
        <option value="CA">CA</option>
        <option value="MA">MA</option>
        <option value="NY">NY</option>
        <option value="MD">MD</option>
        <option value="OR">OR</option>
        <option value="OH">OH</option>
        <option value="IL">IL</option>
        <option value="DC">DC</option>
      </select>{' '}
      <br />
      Zip: <input name="zip" id="form_zip" placeholder="Zip" /> <br />
      Country: <input
        name="country"
        id="form_country"
        placeholder="Country"
      />{' '}
      <br />
      Company: <input
        name="company"
        id="form_company"
        placeholder="company"
      />{' '}
      <br />
      Email: <input name="email" id="form_email" placeholder="Email" /> <br />
      <input type="reset" value="Reset" />
      <input type="submit" value="Submit" id="profile_submit" />
    </Form>
  );
  console.log(buyerType);
  return (
    <div className="d-flex flex-column align-items-center">
      <Card style={{ minWidth: '350px' }}>
        <Card.Body>
          {editMode && buyerStr && (
            <div className="d-flex justify-content-end">
              <Button variant="danger" type="reset" onClick={handleDeleteBuyer}>
                Delete
              </Button>
            </div>
          )}

          {editMode && (
            <>
              <Form.Group>
                <SelectFormik
                  label="Type"
                  options={buyersTypeOpt}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleBuyerType(e.target.value);
                    if (!buyerParsed) return;
                    handleDeleteBuyer();
                  }}
                  value={buyersTypeOpt.find(b => b.value === buyerType)?.text}
                />
              </Form.Group>

              <div
                style={{ display: buyerType === 'private' ? 'block' : 'none' }}
              >
                {' '}
                <Private setEditMode={setEditMode} formRef={privFormRef} />
              </div>
              {/* <div
                style={{ display: buyerType !== 'private' ? 'block' : 'none' }}
              >
                <Corporate
                  style={{ display: buyerType !== 'private' && 'block' }}
                  setEditMode={setEditMode}
                  formRef={corpFormRef}
                />
              </div> */}
            </>
          )}
          {!editMode && !!buyerParsed && (
            <>
              {Object.keys(buyerParsed).map(key => {
                return (
                  <div className="text-start" key={key}>
                    <span>{buyerParsed[key]}</span>
                  </div>
                );
              })}
              <Button
                variant="danger"
                type="submit"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Change Address
              </Button>
            </>
          )}
        </Card.Body>
      </Card>

      {!editMode && !!buyerParsed && (
        <Card style={{ minWidth: '350px' }} className="mt-4">
          <Card.Body>
            <PaymentOptions
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

const Private = (props: any) => {
  const privFormik = useFormik({
    initialValues: initPrivFormValues,
    // validateOnMount: true,
    validationSchema: yup.object().shape(privateValidationSchema),
    onSubmit: async (values, formikProps) => {
      localStorage.setItem('buyer', JSON.stringify(values));
      props.setEditMode(false);
      // formikProps.resetForm();
    }
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    privFormik.setFieldValue(e.target.name, e.target.value);
  };

  useEffect(() => {
    const buyerStr = localStorage.getItem('buyer');
    const buyerParsed = !!buyerStr ? JSON.parse(buyerStr) : null;

    console.log(buyerParsed);
    if (!!buyerParsed) {
      privFormik.setValues(buyerParsed);
    }
  }, []);

  console.log(privFormik);
  const [rOnly, setROnly] = useState(true);
  console.log({ rOnly });
  return (
    <Form
      noValidate
      onSubmit={privFormik.handleSubmit}
      ref={el => {
        props.formRef.current = el;
      }}
      onReset={privFormik.handleReset}
      autoComplete="on"
    >
      {/* <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          type="reset"
          onClick={() => {
            privFormik.resetForm();
          }}
        >
          Test Delete
        </Button>
      </div> */}

      {/* <input type="reset" value="Reset" /> */}
      <Form.Group>
        <InputFormik
          label="Email"
          name="email"
          id="email"
          autoComplete="email"
          type="email"
          touched={privFormik.touched.email}
          error={privFormik.errors.email}
          onChange={handleOnChange}
          onBlur={privFormik.handleBlur}
          defaultValue={privFormik.values.email}
          readOnly={rOnly}
          onFocus={() => {
            setROnly(false);
          }}
        />
      </Form.Group>
      <Row>
        <Col xs={6}>
          <Form.Group>
            <InputFormik
              label="Firstname"
              name="firstname"
              id="firstname"
              autoComplete="given-name"
              touched={privFormik.touched.firstname}
              error={privFormik.errors.firstname}
              onChange={handleOnChange}
              onBlur={privFormik.handleBlur}
              defaultValue={privFormik.values.firstname}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <InputFormik
              label="Lastname"
              name="lastname"
              id="lastname"
              autoComplete="family-name"
              touched={privFormik.touched.lastname}
              error={privFormik.errors.lastname}
              onChange={handleOnChange}
              onBlur={privFormik.handleBlur}
              defaultValue={privFormik.values.lastname}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
        <InputFormik
          label="Address"
          name="address"
          id="address"
          autoComplete="street-address"
          touched={privFormik.touched.address}
          error={privFormik.errors.address}
          onChange={handleOnChange}
          onBlur={privFormik.handleBlur}
          defaultValue={privFormik.values.address}
        />
      </Form.Group>
      <Row>
        <Col xs={6}>
          <Form.Group>
            <InputFormik
              label="Postalcode"
              name="postcode"
              id="postcode"
              autoComplete="postal-code"
              touched={privFormik.touched.postcode}
              error={privFormik.errors.postcode}
              onChange={handleOnChange}
              onBlur={privFormik.handleBlur}
              defaultValue={privFormik.values.postcode}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <InputFormik
              label="City"
              name="city"
              id="city"
              autoComplete="address-level2"
              touched={privFormik.touched.city}
              error={privFormik.errors.city}
              onChange={handleOnChange}
              onBlur={privFormik.handleBlur}
              defaultValue={privFormik.values.city}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
        <InputFormik
          label="Mobile"
          name="tel"
          id="tel"
          autoComplete="tel"
          touched={privFormik.touched.tel}
          error={privFormik.errors.tel}
          onChange={handleOnChange}
          onBlur={privFormik.handleBlur}
          defaultValue={privFormik.values.tel}
        />
      </Form.Group>
      <div className="d-grid gap-2 mt-3">
        <Button
          type="submit"
          disabled={!!Object.values(privFormik.errors).length}
        >
          Next Step
        </Button>
      </div>
    </Form>
  );
};

export const initBusinessFormValues = {
  orgNum: '',
  companyName: '',
  address: '',
  postcode: '',
  city: '',
  email: '',
  tel: '',
  reference: ''
};

const Corporate = (props: any) => {
  const corpFormik = useFormik({
    initialValues: initBusinessFormValues,
    validateOnMount: true,
    validationSchema: yup.object().shape(businessValidationSchema),
    onSubmit: async (values, formikProps) => {
      localStorage.setItem('buyer', JSON.stringify(values));
      props.setEditMode(false);
      formikProps.resetForm();
    }
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    corpFormik.setFieldValue(e.target.name, e.target.value);
  };
  useEffect(() => {
    const buyerStr = localStorage.getItem('buyer');
    const buyerParsed = !!buyerStr ? JSON.parse(buyerStr) : null;

    if (!!buyerParsed) {
      corpFormik.setValues(buyerParsed);
    }
  }, []);

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        corpFormik.handleSubmit(e);
      }}
      ref={el => {
        props.formRef.current = el;
      }}
      onReset={corpFormik.handleReset}
    >
      <Form.Group>
        <InputFormik
          label="Organization Number"
          name="orgNum"
          id="orgNum"
          // autoComplete="none"
          touched={corpFormik.touched.orgNum}
          error={corpFormik.errors.orgNum}
          onChange={handleOnChange}
          onBlur={corpFormik.handleBlur}
          value={corpFormik.values.orgNum}
        />
      </Form.Group>

      <Form.Group>
        <InputFormik
          label="Company Name"
          name="companyName"
          id="companyName"
          autoComplete="billing organization"
          touched={corpFormik.touched.companyName}
          error={corpFormik.errors.companyName}
          onChange={handleOnChange}
          onBlur={corpFormik.handleBlur}
          value={corpFormik.values.companyName}
        />
      </Form.Group>

      <Form.Group>
        <InputFormik
          label="Address"
          name="address"
          id="address"
          autoComplete="billing address-line1"
          touched={corpFormik.touched.address}
          error={corpFormik.errors.address}
          onChange={handleOnChange}
          onBlur={corpFormik.handleBlur}
          value={corpFormik.values.address}
        />
      </Form.Group>

      <Row>
        <Col xs={6}>
          <Form.Group>
            <InputFormik
              label="Postalcode"
              name="postcode"
              id="postcode"
              autoComplete="billing postal-code"
              touched={corpFormik.touched.postcode}
              error={corpFormik.errors.postcode}
              onChange={handleOnChange}
              onBlur={corpFormik.handleBlur}
              value={corpFormik.values.postcode}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <InputFormik
              label="City"
              name="city"
              id="city"
              autoComplete="billing address-level2"
              touched={corpFormik.touched.city}
              error={corpFormik.errors.city}
              onChange={handleOnChange}
              onBlur={corpFormik.handleBlur}
              value={corpFormik.values.city}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group>
        <InputFormik
          label="Email"
          name="email"
          id="email"
          autoComplete="billing email"
          touched={corpFormik.touched.email}
          error={corpFormik.errors.email}
          onChange={handleOnChange}
          onBlur={corpFormik.handleBlur}
          value={corpFormik.values.email}
        />
      </Form.Group>
      <Form.Group>
        <InputFormik
          label="Mobile"
          name="tel"
          id="tel"
          autoComplete="billing tel"
          touched={corpFormik.touched.tel}
          error={corpFormik.errors.tel}
          onChange={handleOnChange}
          onBlur={corpFormik.handleBlur}
          value={corpFormik.values.tel}
        />
      </Form.Group>
      <Form.Group>
        <InputFormik
          label="Reference"
          name="reference"
          id="reference"
          autoComplete="off"
        />
      </Form.Group>
      <div className="d-grid gap-2 mt-3">
        <Button
          type="submit"
          disabled={!!Object.values(corpFormik.errors).length}
        >
          Next Step
        </Button>
      </div>
    </Form>
  );
};
export default App;
