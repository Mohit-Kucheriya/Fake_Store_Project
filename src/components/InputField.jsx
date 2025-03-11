const InputField = ({
  id,
  label,
  error,
  value,
  name,
  type,
  onChangeHandler,
  classNameAddedProps,
}) => {
  return (
    <div
      className={`text-md relative flex w-1/2 flex-col items-start gap-1 font-medium ${classNameAddedProps ? classNameAddedProps : ""}`}
    >
      <label htmlFor={id} className="">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        className="w-full rounded-lg border border-slate-600 px-4 py-2 outline-none"
        onChange={onChangeHandler}
      />
      <p className="absolute top-full my-1 text-sm text-red-500">{error}</p>
    </div>
  );
};

export default InputField;
