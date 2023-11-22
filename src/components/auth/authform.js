export const customHandleChange = (e, props) => {
  const { name } = e.target;
  console.log('from handleChange', name, e.target.value);
  const { handleChange, setTouched } = props;
  // Customize your handling here
  console.log('Custom handleChange');
  setTouched({ ...props.touched, [name]: true });
  handleChange(e); // Invoke Formik's handleChange
};

export const customHandleBlur = (e, props) => {
  const { name } = e.target;
  props.setTouched((data) => ({
    ...data,
    [name]: true,
  }));
};
