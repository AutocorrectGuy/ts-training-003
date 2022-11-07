const Task1 = () => {
  const importAllWithLabels = (r) =>
    r
      .keys()
      .reduce(
        (acc, curr, i) => [
          ...acc,
          { src: r(curr), label: `${i + 1} variants` },
        ],
        []
      );
  const IMAGES = importAllWithLabels(
    require.context("../../../assets/tasks/task1", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {IMAGES.map(({ src, label }, i) => (
        <div key={`task-1-ex-${i}`} className="flex flex-col items-center">
          <div>{label}</div>
          <img src={src} />
        </div>
      ))}
    </div>
  );
};

export default Task1;
