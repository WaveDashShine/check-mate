import Form, { BaseFormProps } from 'src/renderer/components/Form';
import 'src/renderer/components/CheckForm.css';

function CheckFormFields() {
  return (
    <div>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Note</label>
      <textarea name="note" />
      <label>Enabled</label>
      <button role="switch" aria-checked="true" name="enabled"></button>
      <label>Frequency (seconds)</label>
      <input role="spinbutton" step="1" type="number" name="frequency" />
      <div>
        <label>Browser Config</label>
        <label>Link</label>
        <input type="text" name="link" />
        <label>Check Text</label>
        <button role="switch" aria-checked="false" name="checkText"></button>
        <label>Check HTML</label>
        <button role="switch" aria-checked="false" name="checkHtml"></button>
        <label>Check Screenshot</label>
        <button
          role="switch"
          aria-checked="false"
          name="checkScreenshot"
        ></button>
        <label>Locator</label>
        <input type="text" name="locator" />
      </div>
      <label>Alert History</label>
      <table></table>
      <label>Tags</label>
      <table></table>
    </div>
  );
}

function CheckForm(props: BaseFormProps) {
  return (
    <Form
      title={'Check'}
      isOpen={props.isOpen}
      handleConfirm={props.handleConfirm}
      handleCancel={props.handleCancel}
      fields={CheckFormFields()}
    ></Form>
  );
}

export default CheckForm;
