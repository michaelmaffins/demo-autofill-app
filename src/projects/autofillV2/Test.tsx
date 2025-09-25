import { Formik, Form, Field } from 'formik';

export default function AddressForm() {
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    // 1. ✅ Send via AJAX
    await fetch('/api/save-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    // 2. ✅ Copy values into hidden form for browser save prompt
    const hiddenForm: any = document.getElementById('hidden-form');
    Object.keys(values).forEach(key => {
      const input = hiddenForm.querySelector(`[name="${key}"]`);
      if (input) input.value = values[key];
    });

    console.log({ hiddenForm });
    // 3. ✅ Trigger native submission (no page refresh)
    if (!hiddenForm) return;
    hiddenForm.onsubmit();

    setSubmitting(false);
  };

  return (
    <>
      <h2>Shipping Address</h2>

      {/* Formik-managed form (no refresh) */}
      <Formik
        initialValues={{
          givenName: '',
          familyName: '',
          addressLine1: '',
          postalCode: ''
        }}
        validate={values => {
          console.log({ values });
          const errors = {};
          // if (!values.givenName) errors.givenName = 'Required';
          // if (!values.familyName) errors.familyName = 'Required';
          // if (!values.addressLine1) errors.addressLine1 = 'Required';
          // if (!values.postalCode) errors.postalCode = 'Required';
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="on">
            <label>
              First Name
              <Field name="givenName" autoComplete="given-name" required />
            </label>
            <label>
              Last Name
              <Field name="familyName" autoComplete="family-name" required />
            </label>
            <label>
              Address
              <Field
                name="addressLine1"
                autoComplete="address-line1"
                required
              />
            </label>
            <label>
              Postal Code
              <Field name="postalCode" autoComplete="postal-code" required />
            </label>

            <button type="submit" disabled={isSubmitting}>
              Save Address
            </button>
          </Form>
        )}
      </Formik>

      {/* Hidden form just for triggering browser "save address" */}
      <form
        id="hidden-form"
        method="post"
        action="/noop" // can be a no-op route or API endpoint
        // style={{ display: 'none' }}
        autoComplete="on"
        target="hidden_iframe"
      >
        <input name="givenName" autoComplete="given-name" />
        <input name="familyName" autoComplete="family-name" />
        <input name="addressLine1" autoComplete="address-line1" />
        <input name="postalCode" autoComplete="postal-code" />
      </form>

      {/* Hidden iframe prevents refresh */}
      <iframe
        name="hidden_iframe"
        // style={{ display: 'none' }}
      ></iframe>
    </>
  );
}
