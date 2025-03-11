const TextAreaField = ({
  id,
  label,
  name,
  value,
  rows,
  onChangeHandler,
  error,
}) => {
  return (
    <div className="text-md relative flex w-1/2 flex-col items-start gap-1 font-medium">
      <label htmlFor={id} className="">
        {label}
      </label>

      <textarea
        name={name}
        id={id}
        value={value}
        className="w-full resize-none rounded-lg border border-slate-600 px-4 py-2 outline-none"
        rows={rows}
        onChange={onChangeHandler}
      ></textarea>
      <p className="absolute top-full my-1 text-sm text-red-500">{error}</p>
    </div>
  );
};

export default TextAreaField;
