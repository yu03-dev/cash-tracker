export const Button = (props: { title: string; onClick: () => void }) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      {props.title}
    </button>
  );
};
