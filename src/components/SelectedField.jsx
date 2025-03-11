const SelectedField = ({
  id,
  label,
  error,
  value,
  name,
  onChangeHandler,
  classNameAddedProps,
  optionsValue,
  defaultOption,
}) => {
  return (
    <div
      className={`relative flex flex-1 flex-col items-start gap-1 font-medium ${classNameAddedProps ? classNameAddedProps : ""}`}
    >
      <label htmlFor={id} className="">
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChangeHandler}
        className="w-full rounded-lg border border-slate-600 px-4 py-2 outline-none"
      >
        {defaultOption && (
          <option value="" hidden>
            {defaultOption}
          </option>
        )}

        {optionsValue.map((optionVal, i) => (
          <option key={i} value={optionVal}>
            {optionVal}
          </option>
        ))}
      </select>
      <p className="absolute top-full my-1 text-sm text-red-500">{error}</p>
    </div>
  );
};

export default SelectedField;
