import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

const AutofillV2 = () => {
  const privFormik = useFormik({
    initialValues: {
      email: '',
      postcode: '',
      firstname: '',
      lastname: '',
      address: '',
      city: '',
      postal: ''
    },
    // validateOnMount: true,
    // validationSchema: yup.object().shape(privateValidationSchema),
    onSubmit: async (values, props) => {
      console.log(values);
      console.log(props);
      console.log('submitted');
      // props.submitForm();
      const form1: any = document.getElementById('hidden-form');
      if (!form1) return;
      form1.onsubmit();
      // navigate(0);
    }
  });
  console.log(privFormik);
  useEffect(() => {
    console.log('mounted');
  }, []);

  return (
    <>
      <Form
        // noValidate
        // onSubmit={privFormik.handleSubmit}
        // onReset={privFormik.handleReset}
        className="d-flex flex-column justify-content-start"
        target="hidden-form"
        autoComplete="on"
      >
        <label htmlFor="fname">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="email"
          required
          onChange={privFormik.handleChange}
        />
        <br />
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          autoComplete="given-name"
          required
          onChange={privFormik.handleChange}
        />
        <br />
        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          name="lastname"
          autoComplete="family-name"
          required
          onChange={privFormik.handleChange}
        />
        <br />
        <label htmlFor="address1">Street Address</label>
        <input
          type="text"
          id="address"
          name="address"
          autoComplete="address-line1"
          required
          onChange={privFormik.handleChange}
        />
        <br />
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          autoComplete="address-level2"
          required
          onChange={privFormik.handleChange}
        />
        <br />
        <label htmlFor="postal">ZIP / Postal Code</label>
        <input
          type="text"
          id="postal"
          name="postcode"
          autoComplete="postal-code"
          required
          onChange={privFormik.handleChange}
        />
        <br />

        <button type="submit">Submit</button>
      </Form>
      {/* Hidden form just for triggering browser save prompt */}
      <iframe name="hidden_iframe" style={{ display: 'block' }}>
        asd
      </iframe>
      {/* <form
        id="hidden-form"
        method="post"
        action="/noop" // can be a no-op route
        style={{ display: 'none' }}
        autoComplete="on"
      >
        <label htmlFor="fname">Email</label>
        <input type="text" id="email" name="email" autoComplete="email" />
        <br />
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          autoComplete="given-name"
        />
        <br />
        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          name="lastname"
          autoComplete="family-name"
        />
        <br />
        <label htmlFor="address1">Street Address</label>
        <input
          type="text"
          id="address"
          name="address"
          autoComplete="address-line1"
        />
        <br />
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          autoComplete="address-level2"
        />
        <br />
        <label htmlFor="postal">ZIP / Postal Code</label>
        <input
          type="text"
          id="postal"
          name="postcode"
          autoComplete="postal-code"
        />
        <br />
      </form> */}
    </>
  );
};

export default AutofillV2;
